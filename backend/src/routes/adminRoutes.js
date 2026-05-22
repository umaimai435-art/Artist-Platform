const express = require("express");
const router = express.Router();

// Controller functions import kiye
const { 
  loginAdmin, 
  getDashboardStats, 
  getRecentUsers 
} = require("../controllers/adminController");

// Note: Agar aapke pas admin Auth Middleware bana hua hai to endpoints ke beech lagayein, nahi to ye open routes hain
router.post("/login", loginAdmin);
router.get("/stats", getDashboardStats);
router.get("/recent-users", getRecentUsers);

module.exports = router;