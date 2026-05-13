const jwt = require("jsonwebtoken");
const User = require("../models/user");

/* ======================================
   PROTECT ROUTE (JWT AUTH)
====================================== */
const protect = async (req, res, next) => {
  let token;

  // 1️⃣ Get token from header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  // 2️⃣ Token not found
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "You are not logged in. Please login first.",
    });
  }

  try {
    // 3️⃣ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4️⃣ Check if user still exists
    const currentUser = await User.findById(decoded.id).select("-password");

    if (!currentUser) {
      return res.status(401).json({
        success: false,
        message: "User belonging to this token no longer exists.",
      });
    }

    // 5️⃣ Attach user to request (VERY IMPORTANT)
    req.user = {
      id: currentUser._id,
      role: currentUser.role,
      email: currentUser.email,
      name: currentUser.name,
    };

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid token or session expired.",
    });
  }
};

/* ======================================
   ROLE-BASED ACCESS CONTROL
====================================== */
const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "You do not have permission to perform this action.",
      });
    }
    next();
  };
};

module.exports = { protect, restrictTo };