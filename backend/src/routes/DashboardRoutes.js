const express = require("express");
const router = express.Router();

const { protect, restrictTo } = require("../middleware/authMiddleware");
const {
  getArtistDashboard,
  getBuyerDashboard,
  getAdminDashboard,
} = require("../controller/dashboardController");

router.get("/artist", protect, restrictTo("artist"), getArtistDashboard);
router.get("/buyer", protect, restrictTo("buyer"), getBuyerDashboard);
router.get("/admin", protect, restrictTo("admin"), getAdminDashboard);

module.exports = router;