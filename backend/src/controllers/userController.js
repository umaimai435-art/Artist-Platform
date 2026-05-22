const User = require("../models/user.js");

/**
 * @desc    Get all users (Admin panel ke liye)
 * @route   GET /api/users
 */
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    // Frontend ke mutabiq success: true aur data bhej rahe hain
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch users" });
  }
};

/**
 * @desc    Toggle User Status (Block/Unblock)
 * @route   PUT /api/users/toggle/:id
 */
exports.toggleUserStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Agar user ka status schema mein defined nahi hai to default "Active" hoga
    // Agar "Active" hai to "Blocked" kar do, nahi to "Active" kar do
    user.status = user.status === "Blocked" ? "Active" : "Blocked";
    await user.save();

    res.status(200).json({
      success: true,
      message: `User status updated to ${user.status}`,
      data: user
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error updating user status", error: error.message });
  }
};

/**
 * @desc    Get user by ID
 * @route   GET /api/users/:id
 */
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(400).json({ success: false, message: "Invalid user ID" });
  }
};

/**
 * @desc    Update user profile (Settings)
 * @route   PUT /api/users/update-profile
 */
exports.updateUser = async (req, res) => {
  try {
    // 1. User ID check karein: Agar login token se ID mil rahi hai to wo use karein, nahi to URL params se lein
    const userId = req.user ? req.user.id : req.params.id;

    if (!userId) {
      return res.status(400).json({ success: false, message: "User identity not found" });
    }

    // 2. Sirf wahi fields nikalein jo settings mein update karni hain (security ke liye)
    const { name, bio } = req.body;

    // 3. Database mein update karein
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, bio },
      { new: true, runValidators: true } // runValidators se schema rules double check hote hain
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser
    });
  } catch (error) {
    res.status(400).json({ success: false, message: "Failed to update user", error: error.message });
  }
};

/**
 * @desc    Delete user
 * @route   DELETE /api/users/:id
 */
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    res.status(400).json({ success: false, message: "Failed to delete user" });
  }
};