const express = require("express");
const router = express.Router();

// IMPORTANT: destructuring protect (correct way)
const { protect } = require("../middleware/authMiddleware");

// controller import
const orderController = require("../controllers/orderController");

// ================= DEBUG (TEMP) =================
// Uncomment this if error continues
// console.log("orderController =>", orderController);

// ================= CREATE ORDER =================
router.post(
  "/",
  protect,
  orderController.createOrder
);

// ================= BUYER ORDERS =================
router.get(
  "/my",
  protect,
  orderController.getMyOrders
);

// ================= SELLER ORDERS =================
router.get(
  "/seller",
  protect,
  orderController.getSellerOrders
);

// ================= SINGLE ORDER =================
router.get(
  "/:id",
  protect,
  orderController.getSingleOrder
);

// ================= UPDATE STATUS =================
router.put(
  "/:id/status",
  protect,
  orderController.updateOrderStatus
);

module.exports = router;