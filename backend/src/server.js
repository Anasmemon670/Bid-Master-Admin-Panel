import express from "express";
import dotenv from "dotenv";
import adminRoutes from "./Routes/adminRoutes.js";
import authRoutes from "./Routes/authRoutes.js";
import productRoutes from "./Routes/productRoutes.js";
import bidRoutes from "./Routes/bidRoutes.js";
import auctionRoutes from "./Routes/auctionRoutes.js";
import orderRoutes from "./Routes/orderRoutes.js";
import notificationRoutes from "./Routes/notificationRoutes.js";
import cors from "cors";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

// Admin routes (existing)
app.use("/api/admin", adminRoutes);

// Auth routes (existing + new mobile app routes)
app.use("/api/auth", authRoutes);

// Mobile app routes
app.use("/api/products", productRoutes);
app.use("/api/bids", bidRoutes);
app.use("/api/auction", auctionRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/notifications", notificationRoutes);

app.get("/", (req, res) => res.send("BidMaster Admin API running"));
app.listen(process.env.PORT, () => console.log(`🚀 Server running on port ${process.env.PORT}`));
