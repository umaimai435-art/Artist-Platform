const Artwork = require("../models/artworkModel");
const Order = require("../models/order");
const User = require("../models/user");

// ===============================
// 🎨 ARTIST / SELLER DASHBOARD
// ===============================
exports.getArtistDashboard = async (req, res) => {
  try {
    // ✅ Safety check
    if (!req.user || !req.user._id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: user not found",
      });
    }

    const artistId = req.user._id;

    const artworks = await Artwork.find({ artist: artistId });
    const totalArtworks = artworks.length;

    const soldArtworks = artworks.filter((art) => art.isSold).length;

    const totalEarnings = artworks
      .filter((art) => art.isSold)
      .reduce((sum, art) => sum + (art.price || 0), 0);

    res.status(200).json({
      success: true,
      totalArtworks,
      soldArtworks,
      totalEarnings,
      artworks,
    });
  } catch (error) {
    console.error("❌ Artist Dashboard Error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to load artist dashboard",
      error: error.message,
    });
  }
};

// ===============================
// 🛒 BUYER DASHBOARD
// ===============================
exports.getBuyerDashboard = async (req, res) => {
  try {
    const orders = await Order.find({ buyer: req.user._id }).populate("artwork");

    res.status(200).json({
      success: true,
      totalOrders: orders.length,
      orders,
    });
  } catch (error) {
    console.error("❌ Buyer Dashboard Error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to load buyer dashboard",
    });
  }
};

// ===============================
// 🛠️ ADMIN DASHBOARD
// ===============================
exports.getAdminDashboard = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalArtworks = await Artwork.countDocuments();
    const totalOrders = await Order.countDocuments();

    res.status(200).json({
      success: true,
      totalUsers,
      totalArtworks,
      totalOrders,
    });
  } catch (error) {
    console.error("❌ Admin Dashboard Error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to load admin dashboard",
    });
  }
};