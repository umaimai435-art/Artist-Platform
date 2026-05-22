const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { toggleWishlist, getWishlist } = require("../controllers/wishlistController");

// Endpoints syncing for frontend layers
router.get("/", protect, getWishlist);
router.post("/toggle", protect, toggleWishlist);

module.exports = router;
