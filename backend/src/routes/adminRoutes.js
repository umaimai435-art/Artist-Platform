const express = require("express");
const router = express.Router();

// Controller functions import kiye
const { 
  loginAdmin, 
  getDashboardStats, 
  getRecentUsers,
  getVerificationRequests,
  updateVerificationStatus
} = require("../controllers/adminController");

// 1. Authentication Route
router.post("/login", loginAdmin);

// 2. Metrics & Stats Dashboard Routes
router.get("/stats", getDashboardStats);
router.get("/recent-users", getRecentUsers);

// 3. Artist Verification Requests Pipeline Endpoints
router.get("/verifications", getVerificationRequests);
router.put("/verifications/:id", updateVerificationStatus);

module.exports = router;