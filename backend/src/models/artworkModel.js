const express = require("express");
const router = express.Router();

const {
  createArtwork,
  getAllArtworks,
} = require("../controllers/artworkController");

const { protect } = require("../middleware/authMiddleware");

// SELLER UPLOAD ARTWORK
router.post("/", protect, createArtwork);

// BUYER VIEW ALL ARTWORKS
router.get("/", getAllArtworks);

module.exports = router;