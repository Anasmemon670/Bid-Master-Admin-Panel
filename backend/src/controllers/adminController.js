import { UserModel } from "../models/userModel.js";
import { ProductModel } from "../models/productModel.js";
import pool from "../config/db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const AdminController = {
  // ✅ Admin Login
  async login(req, res) {
    const { email, password } = req.body;
    const user = await UserModel.findByEmail(email);

    if (!user || user.role !== "admin")
      return res.status(400).json({ message: "Invalid credentials" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ message: "Invalid credentials" });

    

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.json({
      token,
      admin: { id: user.id, name: user.name, email: user.email }
    });
  },

  // ✅ Get All Users (excluding admins)
  async getUsers(req, res) {
    const result = await pool.query(
      "SELECT id, name, email,  created_at FROM users WHERE role != 'admin' ORDER BY created_at DESC"
    );
    res.json(result.rows);
  },

  // ✅ Delete a User
  async deleteUser(req, res) {
    const { id } = req.params;
    await pool.query("DELETE FROM users WHERE id = $1 AND role != 'admin'", [id]);
    res.json({ message: "User deleted successfully" });
  },

  // ✅ Approve a User (if user needs admin approval)
  async approveUser(req, res) {
    const { id } = req.params;
    const result = await pool.query(
      "UPDATE users SET status = 'approved' WHERE id = $1 RETURNING id, name, email, status",
      [id]
    );
    if (result.rowCount === 0)
      return res.status(404).json({ message: "User not found" });
    res.json({ message: "User approved successfully", user: result.rows[0] });
  },

  // ✅ Block a User
  async blockUser(req, res) {
    const { id } = req.params;
    const result = await pool.query(
      "UPDATE users SET status = 'blocked' WHERE id = $1 RETURNING id, name, email, status",
      [id]
    );
    if (result.rowCount === 0)
      return res.status(404).json({ message: "User not found" });
    res.json({ message: "User blocked successfully", user: result.rows[0] });
  },

  // ✅ Dashboard Stats
  async getDashboard(req, res) {
    const stats = {
      users: (await pool.query("SELECT COUNT(*) FROM users")).rows[0].count,
      products: (await pool.query("SELECT COUNT(*) FROM products")).rows[0].count,
      pending: (await pool.query("SELECT COUNT(*) FROM products WHERE status='pending'")).rows[0].count,
      approved: (await pool.query("SELECT COUNT(*) FROM products WHERE status='approved'")).rows[0].count,
    };
    res.json(stats);
  },

  // ✅ Product Approvals
  async approveProduct(req, res) {
    const updated = await ProductModel.approveProduct(req.params.id);
    res.json(updated);
  },

  async rejectProduct(req, res) {
    const updated = await ProductModel.rejectProduct(req.params.id);
    res.json(updated);
  },
};
