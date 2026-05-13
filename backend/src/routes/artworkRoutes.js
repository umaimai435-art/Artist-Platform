const express = require("express");
const router = express.Router();

// Controllers
const {
  createArtwork,
  getAllArtworks,
  getArtworkById,
  updateArtwork,
  deleteArtwork,
  getMyArtworks,
} = require("../controller/artworkController");

// Middlewares
const { protect, restrictTo } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

/* ==========================================
   PUBLIC ROUTES (No Login Required)
========================================== */

// Get all artworks (Home / Explore)
router.get("/", getAllArtworks);

// Get logged-in seller artworks
// ⚠️ MUST be before "/:id"
router.get(
  "/my/artworks",
  protect,
  restrictTo("seller"),
  getMyArtworks
);

// Get single artwork by ID
router.get("/:id", getArtworkById);

/* ==========================================
   PROTECTED ROUTES (Seller Only)
========================================== */

// Create artwork
router.post(
  "/",
  protect,
  restrictTo("seller"),
  upload.single("image"),
  createArtwork
);

// Update artwork (seller – owner only)
router.patch(
  "/:id",
  protect,
  restrictTo("seller"),
  upload.single("image"),
  updateArtwork
);

// Delete artwork (seller – owner only)
router.delete(
  "/:id",
  protect,
  restrictTo("seller"),
  deleteArtwork
);

module.exports = router;