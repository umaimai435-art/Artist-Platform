const Artwork = require("../models/artwork");

// 1. CREATE NEW ARTWORK (Artist uploads - Status is 'pending' by default)
exports.createArtwork = async (req, res) => {
  try {
    const { title, description, price, category } = req.body;

    if (!req.file) {
      return res.status(400).json({ success: false, message: "Artwork image file is required" });
    }

    const imageUrl = `/uploads/${req.file.filename}`; 

    const newArtwork = new Artwork({
      title,
      description,
      price: Number(price),
      category,
      image: imageUrl,
      artist: req.user.id, 
      status: "pending" // 👈 Yahan pending rakha hai taaki seedha live na ho
    });

    await newArtwork.save();

    res.status(201).json({
      success: true,
      message: "Artwork submitted successfully! Waiting for Admin approval. ⏳",
      artwork: newArtwork
    });
  } catch (err) {
    console.error("CREATE ARTWORK ERROR:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// 2. GET ALL ACTIVE ARTWORKS (Public Marketplace - Only shows 'active')
exports.getAllArtworks = async (req, res) => {
  try {
    const artworks = await Artwork.find({ status: "active" }).populate("artist", "name email");
    res.status(200).json({ success: true, count: artworks.length, artworks });
  } catch (err) {
    console.error("GET ALL ARTWORKS ERROR:", err);
    res.status(500).json({ success: false, message: "Failed to fetch artworks" });
  }
};

// 3. GET ALL PENDING ARTWORKS (For Admin Approvals Dashboard)
exports.getPendingArtworks = async (req, res) => {
  try {
    const pendingArtworks = await Artwork.find({ status: "pending" }).populate("artist", "name email");
    res.status(200).json({ success: true, count: pendingArtworks.length, artworks: pendingArtworks });
  } catch (err) {
    console.error("GET PENDING ARTWORKS ERROR:", err);
    res.status(500).json({ success: false, message: "Failed to fetch pending approvals" });
  }
};

// 4. ADMIN APPROVE ARTWORK
exports.approveArtwork = async (req, res) => {
  try {
    const artwork = await Artwork.findByIdAndUpdate(
      req.params.id,
      { status: "active" },
      { new: true }
    );

    if (!artwork) {
      return res.status(404).json({ success: false, message: "Artwork not found" });
    }

    res.status(200).json({ success: true, message: "Artwork approved and live! 🎉", artwork });
  } catch (err) {
    console.error("APPROVE ARTWORK ERROR:", err);
    res.status(500).json({ success: false, message: "Failed to approve artwork" });
  }
};

// 5. ADMIN REJECT ARTWORK
exports.rejectArtwork = async (req, res) => {
  try {
    const artwork = await Artwork.findByIdAndUpdate(
      req.params.id,
      { status: "rejected" },
      { new: true }
    );

    if (!artwork) {
      return res.status(404).json({ success: false, message: "Artwork not found" });
    }

    res.status(200).json({ success: true, message: "Artwork rejected by admin ❌", artwork });
  } catch (err) {
    console.error("REJECT ARTWORK ERROR:", err);
    res.status(500).json({ success: false, message: "Failed to reject artwork" });
  }
};

// 6. GET SINGLE ARTWORK BY ID
exports.getArtworkById = async (req, res) => {
  try {
    const artwork = await Artwork.findById(req.params.id).populate("artist", "name email");
    if (!artwork) return res.status(404).json({ success: false, message: "Artwork not found" });
    res.status(200).json({ success: true, artwork });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error fetching details" });
  }
};

// 7. GET LOGGED-IN ARTIST'S ARTWORKS
exports.getMyArtworks = async (req, res) => {
  try {
    const myArtworks = await Artwork.find({ artist: req.user.id });
    res.status(200).json({ success: true, artworks: myArtworks });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error fetching your artworks" });
  }
};

// 8. UPDATE ARTWORK
exports.updateArtwork = async (req, res) => {
  try {
    let artwork = await Artwork.findById(req.params.id);
    if (!artwork) return res.status(404).json({ success: false, message: "Artwork not found" });

    if (artwork.artist.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    if (req.file) req.body.image = `/uploads/${req.file.filename}`;

    artwork = await Artwork.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ success: true, artwork });
  } catch (err) {
    res.status(500).json({ success: false, message: "Update failed" });
  }
};

// 9. DELETE ARTWORK
exports.deleteArtwork = async (req, res) => {
  try {
    const artwork = await Artwork.findById(req.params.id);
    if (!artwork) return res.status(404).json({ success: false, message: "Artwork not found" });

    if (artwork.artist.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    await Artwork.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Delete failed" });
  }
};