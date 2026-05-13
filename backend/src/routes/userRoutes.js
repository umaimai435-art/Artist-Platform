const express = require("express");
const router = express.Router();

// Import controller functions
const {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controller/userController.js");

// Routes
router.get("/", getAllUsers);        // ✅ function reference
router.get("/:id", getUserById);     // ✅ function reference
router.put("/:id", updateUser);      // ✅ function reference
router.delete("/:id", deleteUser);   // ✅ function reference

module.exports = router;
