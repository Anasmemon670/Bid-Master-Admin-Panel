import express from "express";
import { AuthController } from "../controllers/authController.js";
import { verifyUser } from "../middleware/authMiddleware.js";

const router = express.Router();

// OTP routes (existing)
router.post("/send-otp", AuthController.sendOTP);
router.post("/verify-otp", AuthController.verifyOTP);

// Mobile app authentication routes
router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.post("/logout", verifyUser, AuthController.logout);

// Firebase authentication routes
router.post("/firebase-login", AuthController.firebaseLogin);
router.post("/firebase-register", AuthController.firebaseRegister);
router.post("/phone-otp-login", AuthController.phoneOTPLogin);

// Profile routes (protected)
router.get("/profile", verifyUser, AuthController.getProfile);
router.patch("/profile", verifyUser, AuthController.updateProfile);

export default router;

