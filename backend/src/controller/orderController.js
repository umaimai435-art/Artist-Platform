const Order = require("../models/order");

exports.placeOrder = async (req, res) => {
  const order = await Order.create(req.body);
  res.status(201).json({ message: "Order placed", order });
};