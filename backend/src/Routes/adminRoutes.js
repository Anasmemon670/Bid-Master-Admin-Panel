import express from "express";
import { AdminController } from "../controllers/adminController.js";
import { verifyAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Login route (no middleware)
router.post("/login", AdminController.login);

// 🔒 Protect all routes
router.use(verifyAdmin);

// --- USERS ---
router.get("/users", AdminController.getUsers);
router.delete("/users/:id", AdminController.deleteUser);
router.patch("/users/approve/:id", AdminController.approveUser);
router.patch("/users/block/:id", AdminController.blockUser);

// --- DASHBOARD ---
router.get("/dashboard", AdminController.getDashboard);

// --- PRODUCTS ---
router.patch("/products/approve/:id", AdminController.approveProduct);
router.patch("/products/reject/:id", AdminController.rejectProduct);

export default router;
