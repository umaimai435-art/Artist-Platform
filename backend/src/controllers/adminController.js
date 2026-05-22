const Admin = require("../models/admin");
// Note: Aapke project ke real models ke paths aur names inke mutabik hone chahiye
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
    // Database se real counts dynamically aggregate karna
    const totalUsers = await User.countDocuments({});
    const liveArtworks = await Artwork.countDocuments({ status: "active" }); // ya jo status aap use kr rhe hain
    
    // Total Sales/Volume calculate karne ke liye aggregate query (agar order schema available ho)
    // Abhi safe side ke liye dynamic 0 rkha hai taaki crash na ho, agar order model hai to sum ho jayega
    const platformVolume = 0; 

    // Pending actions (jaise pending verifications ya pending artwork approvals)
    const pendingArtworks = await Artwork.countDocuments({ status: "pending" });

    res.status(200).json({
      success: true,
      stats: {
        totalUsers,
        liveArtworks,
        platformVolume,
        pendingActions: pendingArtworks,
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
    // Sort by creation date descending order aur top 5 users limit kiye hain
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