const Artwork = require("../models/Artwork");

// =====================
// CREATE ARTWORK (ARTIST ONLY)
// =====================
exports.createArtwork = async (req, res) => {
  try {
    const { title, description, price, category } = req.body;

    // Validation
    if (!title || !description || !price || !category) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload an image for the artwork",
      });
    }

    const artwork = await Artwork.create({
      title,
      description,
      price,
      category,
      image: `/uploads/${req.file.filename}`, // local upload
      artist: req.user._id, // logged-in artist
    });

    res.status(201).json({
      success: true,
      message: "Artwork uploaded successfully",
      data: artwork,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Artwork upload failed",
      error: error.message,
    });
  }
};

// =====================
// GET ALL ARTWORKS (PUBLIC)
// Search + Filter + Sort
// =====================
exports.getAllArtworks = async (req, res) => {
  try {
    const { search, category, sort } = req.query;

    let query = {};

    // 🔍 Search by title
    if (search) {
      query.title = { $regex: search, $options: "i" };
    }

    // 🎨 Filter by category
    if (category) {
      query.category = category;
    }

    let artworksQuery = Artwork.find(query).populate(
      "artist",
      "name email"
    );

    // ↕ Sorting
    if (sort === "price-low") {
      artworksQuery = artworksQuery.sort({ price: 1 });
    } else if (sort === "price-high") {
      artworksQuery = artworksQuery.sort({ price: -1 });
    } else {
      artworksQuery = artworksQuery.sort({ createdAt: -1 });
    }

    const artworks = await artworksQuery;

    res.status(200).json({
      success: true,
      count: artworks.length,
      data: artworks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch artworks",
      error: error.message,
    });
  }
};

// =====================
// GET MY ARTWORKS (ARTIST DASHBOARD)
// =====================
exports.getMyArtworks = async (req, res) => {
  try {
    const artworks = await Artwork.find({
      artist: req.user._id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: artworks.length,
      data: artworks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch your artworks",
      error: error.message,
    });
  }
};

// =====================
// GET SINGLE ARTWORK (PUBLIC)
// =====================
exports.getArtworkById = async (req, res) => {
  try {
    const artwork = await Artwork.findById(req.params.id).populate(
      "artist",
      "name email"
    );

    if (!artwork) {
      return res.status(404).json({
        success: false,
        message: "Artwork not found",
      });
    }

    res.status(200).json({
      success: true,
      data: artwork,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch artwork",
      error: error.message,
    });
  }
};

// =====================
// UPDATE ARTWORK (ARTIST / ADMIN)
// =====================
exports.updateArtwork = async (req, res) => {
  try {
    let artwork = await Artwork.findById(req.params.id);

    if (!artwork) {
      return res.status(404).json({
        success: false,
        message: "Artwork not found",
      });
    }

    // Authorization
    if (
      artwork.artist.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to update this artwork",
      });
    }

    // If new image uploaded
    if (req.file) {
      req.body.image = `/uploads/${req.file.filename}`;
    }

    artwork = await Artwork.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Artwork updated successfully",
      data: artwork,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Artwork update failed",
      error: error.message,
    });
  }
};

// =====================
// DELETE ARTWORK (ARTIST / ADMIN)
// =====================
exports.deleteArtwork = async (req, res) => {
  try {
    const artwork = await Artwork.findById(req.params.id);

    if (!artwork) {
      return res.status(404).json({
        success: false,
        message: "Artwork not found",
      });
    }

    // Authorization
    if (
      artwork.artist.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this artwork",
      });
    }

    await artwork.deleteOne();

    res.status(200).json({
      success: true,
      message: "Artwork deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Artwork deletion failed",
      error: error.message,
    });
  }
};