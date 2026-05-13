const express = require("express");
const router = express.Router();

// Controllers
const artistController = require("../controller/artistController");

// Middlewares
const { protect, restrictTo } = require("../middleware/authMiddleware");

/* ======================================
   PUBLIC ROUTES
====================================== */

// Get all artists (public)
router.get("/", artistController.getArtists);

/* ======================================
   SELLER (ARTIST) ROUTES
====================================== */

// Create artist profile (seller only)
router.post(
  "/",
  protect,
  restrictTo("seller"),
  artistController.createProfile
);

// Seller dashboard stats
router.get(
  "/dashboard-stats",
  protect,
  restrictTo("seller"),
  artistController.getDashboardStats
);

module.exports = router;