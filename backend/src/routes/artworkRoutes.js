 const express = require("express");
const router = express.Router();

// =====================
// CONTROLLERS
// =====================
const artworkController = require("../controllers/artworkController");

// 🔍 DEBUGGING CHECK
const requiredFunctions = [
  "createArtwork",
  "getAllArtworks",
  "getArtworkById",
  "updateArtwork",
  "deleteArtwork",
  "getMyArtworks",
  "getPendingArtworks", // New
  "approveArtwork",      // New
  "rejectArtwork"       // New
];

requiredFunctions.forEach((fn) => {
  if (!artworkController[fn]) {
    console.error(`❌ ERROR: The function "${fn}" is missing or not exported correctly in artworkController.js`);
  }
});

const {
  createArtwork,
  getAllArtworks,
  getArtworkById,
  updateArtwork,
  deleteArtwork,
  getMyArtworks,
  getPendingArtworks,
  approveArtwork,
  rejectArtwork
} = artworkController;

// =====================
// MIDDLEWARES
// =====================
const { protect, restrictTo } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

/* ==========================================
    PUBLIC ROUTES (NO LOGIN REQUIRED)
========================================== */
// 🔹 Get all active artworks (Only approved items show on Home / Buyer Explore)
router.get("/", getAllArtworks);

/* ==========================================
    ADMIN APPROVAL ROUTES (ONLY ADMIN)
========================================== */
// 🔹 Get all pending artworks for review
router.get("/admin/pending", protect, restrictTo("admin"), getPendingArtworks);

// 🔹 Approve an artwork
router.patch("/:id/approve", protect, restrictTo("admin"), approveArtwork);

// 🔹 Reject an artwork
router.patch("/:id/reject", protect, restrictTo("admin"), rejectArtwork);

/* ==========================================
    PROTECTED ROUTES (SELLER / ARTIST)
========================================== */
// 🔹 Get logged-in seller's own artworks
router.get("/my", protect, restrictTo("seller"), getMyArtworks);

// 🔹 Create new artwork (Default status will be "pending")
router.post("/", protect, restrictTo("seller"), upload.single("image"), createArtwork);

// 🔹 Update artwork
router.patch("/:id", protect, restrictTo("seller"), upload.single("image"), updateArtwork);

// 🔹 Delete artwork
router.delete("/:id", protect, restrictTo("seller"), deleteArtwork);

// 🔹 Get single artwork by ID
router.get("/:id", getArtworkById);

module.exports = router;