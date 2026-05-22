const Wishlist = require("../models/Wishlist");

// TOGGLE WISHLIST ITEM (ADD / REMOVE IN ONE ENDPOINT)
exports.toggleWishlist = async (req, res) => {
  try {
    const userId = req.user.id;
    const { artworkId } = req.body;

    if (!artworkId) {
      return res.status(400).json({ success: false, message: "Artwork ID is required" });
    }

    const exists = await Wishlist.findOne({ userId, artworkId });

    if (exists) {
      // Agar pehle se added hai to remove kar do
      await Wishlist.findByIdAndDelete(exists._id);
      return res.status(200).json({ success: true, isWishlisted: false, message: "Removed from wishlist" });
    } else {
      // Agar nahi hai to add kar do
      const item = await Wishlist.create({ userId, artworkId });
      return res.status(200).json({ success: true, isWishlisted: true, data: item, message: "Added to wishlist" });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET WISHLIST (POPULATED)
exports.getWishlist = async (req, res) => {
  try {
    const items = await Wishlist.find({ userId: req.user.id })
      .populate("artworkId");

    // Frontend expectations mapping formatting (Flatten array structure configuration)
    const formattedWishlist = items
      .filter(item => item.artworkId !== null) // Safety check agar artwork delete ho gaya ho
      .map(item => ({
        _id: item.artworkId._id,
        title: item.artworkId.title,
        price: item.artworkId.price,
        image: item.artworkId.image,
        category: item.artworkId.category,
        status: item.artworkId.status,
        artist: item.artworkId.artist
      }));

    res.status(200).json({ success: true, data: formattedWishlist });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};