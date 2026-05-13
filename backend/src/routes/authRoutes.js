const express = require("express");
const router = express.Router();

const {
  register,
  login,
  verifyOtp,
} = require("../controller/authController");

// =====================
// AUTH ROUTES (Buyer + Artist)
// =====================

// Register (sends OTP for buyer/artist)
router.post("/register", register);

// Verify OTP (email verification)
router.post("/verify-otp", verifyOtp);

// Login (only after verification)
router.post("/login", login);

module.exports = router;