const jwt = require("jsonwebtoken");
const User = require("../models/user");

/* ======================================
   PROTECT ROUTE (JWT AUTH)
====================================== */
const protect = async (req, res, next) => {
  try {
    let token;

    // Get token from header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "You are not logged in. Please login first.",
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find user
    const currentUser = await User.findById(decoded.id).select("-password");

    if (!currentUser) {
      return res.status(401).json({
        success: false,
        message: "User no longer exists.",
      });
    }

    // 🔥 FIX: ensure role always exists
    const userRole = currentUser.role ? currentUser.role : "user";

    // Attach user
    req.user = {
      id: currentUser._id,
      role: userRole,
      email: currentUser.email,
      name: currentUser.name,
    };

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid token or session expired.",
      error: error.message,
    });
  }
};

/* ======================================
   ROLE-BASED ACCESS CONTROL
====================================== */
const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Not authenticated",
      });
    }

    // 🔥 FIX: normalize role check (case-safe)
    const userRole = (req.user.role || "").toLowerCase();

    const allowedRoles = roles.map((r) => r.toLowerCase());

    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({
        success: false,
        message: "You do not have permission to perform this action.",
      });
    }

    next();
  };
};

module.exports = { protect, restrictTo };