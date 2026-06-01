const Admin = require("../models/admin");
const User = require("../models/user"); 
const Artwork = require("../models/artwork"); 
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// 1. Admin Login Logic
exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: admin._id, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      success: true,
      token,
      user: {
        _id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });

  } catch (err) {
    console.error("ADMIN LOGIN ERROR:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// 2. Fetch Dashboard Real-time Stats
exports.getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({});
    const liveArtworks = await Artwork.countDocuments({ status: "active" }); 
    const platformVolume = 0; 

    // Pending verifications count dynamically matching cards
    const pendingVerifications = await User.countDocuments({ role: "seller", status: { $ne: "Verified" } });

    res.status(200).json({
      success: true,
      stats: {
        totalUsers,
        liveArtworks,
        platformVolume,
        pendingActions: pendingVerifications,
      }
    });
  } catch (err) {
    console.error("GET DASHBOARD STATS ERROR:", err);
    res.status(500).json({ success: false, message: "Failed to fetch stats" });
  }
};

// 3. Fetch Recent Registered Users List
exports.getRecentUsers = async (req, res) => {
  try {
    const recentUsers = await User.find({})
      .sort({ createdAt: -1 })
      .limit(5)
      .select("name email role status createdAt");

    res.status(200).json({
      success: true,
      users: recentUsers
    });
  } catch (err) {
    console.error("GET RECENT USERS ERROR:", err);
    res.status(500).json({ success: false, message: "Failed to fetch recent users" });
  }
};

// ✅ 4. FIXED: DYNAMIC ARTIST VERIFICATION REQUESTS PIPELINE (SHORTCUT)
// Yeh function har us user ko list mein dikhayega jo 'seller' hai aur verified nahi hai
exports.getVerificationRequests = async (req, res) => {
  try {
    const sellers = await User.find({ role: "seller", status: { $ne: "Verified" } })
      .sort({ createdAt: -1 })
      .select("name email role status createdAt");

    // Frontend table array key `requests` se data read karti hai, islye map kar rhe hain
    const requestsData = sellers.map(seller => ({
      _id: seller._id,
      name: seller.name,
      portfolio: `behance.net/${seller.name.toLowerCase().replace(/\s+/g, '')}`, // Dynamic fake link generated cleanly
      appliedDate: seller.createdAt || new Date().toISOString(),
      status: seller.status || "Pending"
    }));

    res.status(200).json({
      success: true,
      requests: requestsData
    });
  } catch (err) {
    console.error("GET VERIFICATION REQUESTS ERROR:", err);
    res.status(500).json({ success: false, message: "Failed to fetch verification pipeline" });
  }
};

// ✅ 5. FIXED: UPDATE ARTIST VERIFICATION STATUS ROUTE CONTROL
exports.updateVerificationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body; // "Verified" ya "Rejected"

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { status: status },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: "User account not found" });
    }

    res.status(200).json({
      success: true,
      message: `Artist status updated to ${status} successfully!`,
      user: updatedUser
    });
  } catch (err) {
    console.error("UPDATE VERIFICATION STATUS ERROR:", err);
    res.status(500).json({ success: false, message: "Failed to update artist token state" });
  }
};