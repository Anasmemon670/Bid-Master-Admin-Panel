import express from "express";
import dotenv from "dotenv";
import adminRoutes from "./Routes/adminRoutes.js";

dotenv.config();
const app = express();
app.use(express.json());

app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => res.send("BidMaster Admin API running"));
app.listen(process.env.PORT, () => console.log(`🚀 Server running on port ${process.env.PORT}`));
