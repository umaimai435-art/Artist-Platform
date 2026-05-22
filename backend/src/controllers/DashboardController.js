const User = require("../models/user");
const Artwork = require("../models/artwork");
const Order = require("../models/order");

// ================= ARTIST (SELLER) DASHBOARD =================
exports.getArtistDashboard = async (req, res) => {
  try {
    const artistId = req.user._id;

    // 1. Live Counters from Database
    const totalArtworks = await Artwork.countDocuments({ artist: artistId });
    const soldItems = await Order.countDocuments({ artist: artistId, status: "delivered" });

    // 2. Real Earnings Calculation (Using your existing schema field 'totalAmount')
    const earningsResult = await Order.aggregate([
      { $match: { artist: artistId, status: "delivered" } },
      { $group: { _id: null, total: { $sum: "$totalAmount" } } },
    ]);
    const totalEarnings = earningsResult[0]?.total || 0;

    // 3. Dynamic Recent Art Updates for Dashboard Table
    // Yeh top 5 latest uploaded artworks fetch karega artist ke liye
    const recent = await Artwork.find({ artist: artistId })
      .sort({ createdAt: -1 })
      .limit(5)
      .select("title category price status isSold"); 

    // Formatting the response exactly how Frontend's fetchDashboardData expects it
    res.status(200).json({
      success: true,
      stats: {
        totalArtworks,
        totalEarnings,
        soldItems
      },
      recent: recent.map(art => ({
        _id: art._id,
        title: art.title,
        category: art.category,
        price: art.price,
        // If your schema has status (pending/active), we pass it, otherwise fallback check
        status: art.status || "active",
        isSold: art.isSold || false
      }))
    });

  } catch (error) {
    console.error("Artist dashboard controller error:", error);
    res.status(500).json({ success: false, message: "Artist dashboard error", error: error.message });
  }
};

// ================= BUYER DASHBOARD =================
exports.getBuyerDashboard = async (req, res) => {
  try {
    const buyerId = req.user._id;

    const totalOrders = await Order.countDocuments({ buyer: buyerId });
    
    // Dynamic list of buyer's recent purchases
    const recentOrders = await Order.find({ buyer: buyerId })
      .populate("artwork", "title price image")
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json({
      success: true,
      stats: {
        totalOrders,
      },
      orders: recentOrders
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Buyer dashboard error" });
  }
};

// ================= ADMIN DASHBOARD =================
exports.getAdminDashboard = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalArtists = await User.countDocuments({ role: "artist" });
    const totalArtworks = await Artwork.countDocuments();
    const totalOrders = await Order.countDocuments();

    // Admin panel dashboard insights configuration
    res.status(200).json({
      success: true,
      stats: {
        totalUsers,
        totalArtists,
        totalArtworks,
        totalOrders,
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Admin dashboard error" });
  }
};