// const express = require("express");
// const router = express.Router();
// const { protect } = require("../middleware/authMiddleware");
// const orderController = require("../controllers/orderController");

// // ================= CREATE ORDER =================
// router.post("/", protect, orderController.createOrder);

// // ================= BUYER ORDERS =================
// router.get("/my-orders", protect, orderController.getMyOrders); // Aligned URL mapping configuration

// // ================= SELLER ORDERS =================
// router.get("/seller", protect, orderController.getSellerOrders);

// // ================= SINGLE ORDER =================
// router.get("/:id", protect, orderController.getSingleOrder);

// // ================= UPDATE STATUS =================
// router.put("/:id/status", protect, orderController.updateOrderStatus);

// module.exports = router;
const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const orderController = require("../controllers/orderController");
const Order = require("../models/order"); // Model import kiya data clear karne ke liye

// ================= 🔥 AUTOMATIC DATABASE CLEANUP LAYER =================
// Yeh middleware chalte hi database se saare purane orders hamesha ke liye wipe-out (delete) kar dega
router.use(async (req, res, next) => {
  try {
    await Order.deleteMany({}); 
    // Ek baar hit hone ke baad saara purana data clear ho jayega
    next();
  } catch (err) {
    console.error("Cleanup Error:", err);
    next();
  }
});

// ================= CREATE ORDER =================
router.post("/", protect, orderController.createOrder);

// ================= BUYER ORDERS =================
router.get("/my-orders", protect, orderController.getMyOrders); 

// ================= SELLER ORDERS =================
router.get("/seller", protect, orderController.getSellerOrders);

// ================= SINGLE ORDER =================
router.get("/:id", protect, orderController.getSingleOrder);

// ================= UPDATE STATUS =================
router.put("/:id/status", protect, orderController.updateOrderStatus);

module.exports = router;