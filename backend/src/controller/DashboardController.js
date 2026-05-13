const User = require("../models/user");
const Artwork = require("../models/artwork");
const Order = require("../models/order");

// ================= ARTIST DASHBOARD =================
exports.getArtistDashboard = async (req, res) => {
  try {
    const artistId = req.user._id;

    const totalArtworks = await Artwork.countDocuments({ artist: artistId });
    const totalOrders = await Order.countDocuments({ artist: artistId });

    const earningsResult = await Order.aggregate([
      { $match: { artist: artistId, status: "delivered" } },
      { $group: { _id: null, total: { $sum: "$totalAmount" } } },
    ]);

    const earnings = earningsResult[0]?.total || 0;

    res.status(200).json({
      totalArtworks,
      totalOrders,
      earnings,
    });
  } catch (error) {
    res.status(500).json({ message: "Artist dashboard error" });
  }
};

// ================= BUYER DASHBOARD =================
exports.getBuyerDashboard = async (req, res) => {
  try {
    const buyerId = req.user._id;

    const totalOrders = await Order.countDocuments({ buyer: buyerId });

    res.status(200).json({
      totalOrders,
    });
  } catch (error) {
    res.status(500).json({ message: "Buyer dashboard error" });
  }
};

// ================= ADMIN DASHBOARD =================
exports.getAdminDashboard = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalArtists = await User.countDocuments({ role: "artist" });
    const totalArtworks = await Artwork.countDocuments();
    const totalOrders = await Order.countDocuments();

    res.status(200).json({
      totalUsers,
      totalArtists,
      totalArtworks,
      totalOrders,
    });
  } catch (error) {
    res.status(500).json({ message: "Admin dashboard error" });
  }
};