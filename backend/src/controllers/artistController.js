const ArtistProfile = require("../models/artistprofile");
const Artwork = require("../models/artwork");
const Order = require("../models/order");

/* ======================================
   CREATE ARTIST PROFILE
====================================== */
exports.createProfile = async (req, res) => {
  try {
    // 🔥 FIX: req.user safety check
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: user not found in request",
      });
    }

    const profileData = {
      ...req.body,
      userId: req.user.id, // link profile with logged-in seller
    };

    const profile = await ArtistProfile.create(profileData);

    res.status(201).json({
      success: true,
      message: "Artist profile created successfully",
      data: profile,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create artist profile",
      error: error.message,
    });
  }
};

/* ======================================
   GET ALL ARTISTS (PUBLIC)
====================================== */
exports.getArtists = async (req, res) => {
  try {
    const artists = await ArtistProfile.find()
      .populate("userId", "name email");

    res.status(200).json({
      success: true,
      count: artists.length,
      data: artists,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch artists",
      error: error.message,
    });
  }
};

/* ======================================
   SELLER DASHBOARD STATS
====================================== */
exports.getDashboardStats = async (req, res) => {
  try {
    // 🔥 FIX: req.user safety check
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: user not found in request",
      });
    }

    const sellerId = req.user.id;

    // Total artworks by seller
    const totalArtworks = await Artwork.countDocuments({
      artist: sellerId,
    });

    // Orders for seller
    const orders = await Order.find({
      seller: sellerId,
    });

    const totalOrders = orders.length;

    const totalEarnings = orders.reduce(
      (sum, order) => sum + order.totalAmount,
      0
    );

    res.status(200).json({
      success: true,
      data: {
        totalArtworks,
        totalOrders,
        totalEarnings,
        totalSales: totalOrders,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to load dashboard stats",
      error: error.message,
    });
  }
};