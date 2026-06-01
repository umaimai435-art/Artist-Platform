const express = require("express");
const router = express.Router();

const { protect, restrictTo } = require("../middleware/authMiddleware");

const {
  getArtistDashboard,
  getBuyerDashboard,
  getAdminDashboard,
} = require("../controllers/dashboardController"); // ✅ FIXED QUOTE

/*
|--------------------------------------------------------------------------
| DASHBOARD ROUTES
|--------------------------------------------------------------------------
| Roles supported: seller / artist / buyer / admin
|--------------------------------------------------------------------------
*/

// 🎨 SELLER / ARTIST DASHBOARD
router.get(
  "/artist",
  protect,
  restrictTo("seller", "artist"),
  getArtistDashboard
);

// 🛒 BUYER DASHBOARD
router.get(
  "/buyer",
  protect,
  restrictTo("buyer"),
  getBuyerDashboard
);

// 🛠️ ADMIN DASHBOARD
router.get(
  "/admin",
  protect,
  restrictTo("admin"),
  getAdminDashboard
);

module.exports = router;