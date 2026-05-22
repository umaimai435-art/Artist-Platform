const Order = require("../models/order");
const Artwork = require("../models/artwork");

// ================= CREATE ORDER (BUYER) =================
exports.createOrder = async (req, res) => {
  try {
    const { artworkId } = req.body;

    const artwork = await Artwork.findById(artworkId).populate("artist");

    if (!artwork) {
      return res.status(404).json({ message: "Artwork not found" });
    }

    // Dono fields save kar rahe hain taake schema ya data structures mein kahin bhi query break na ho
    const order = await Order.create({
      buyer: req.user._id,
      seller: artwork.artist._id,
      artist: artwork.artist._id, // Dashboard aggregator ke liye support mapping
      artwork: artwork._id,
      totalPrice: artwork.price, 
      totalAmount: artwork.price, // Dashboard summation aggregation ($sum: "$totalAmount") ke liye alignment
    });

    res.status(201).json({
      message: "Order created successfully",
      order,
    });

  } catch (err) {
    console.error("Order Creation Error:", err);
    res.status(500).json({ message: "Server error during order generation" });
  }
};

// ================= GET BUYER ORDERS =================
exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ buyer: req.user._id })
      .populate("artwork")
      .populate("seller", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ================= GET SELLER ORDERS =================
exports.getSellerOrders = async (req, res) => {
  try {
    const sellerId = req.user._id;

    // Frontend table mapping fields ko fix karne ke liye hum data populate kar rahe hain
    const orders = await Order.find({
      $or: [{ seller: sellerId }, { artist: sellerId }]
    })
      .populate("artwork", "title price")
      .populate("buyer", "name email")
      .sort({ createdAt: -1 });

    // Frontend layout formats ko seamlessly populate karne ke liye normalization helper layer
    const formattedOrders = orders.map(order => ({
      _id: order._id,
      customerName: order.buyer?.name || "Anonymous Buyer",
      artworkTitle: order.artwork?.title || "Untitled Artwork",
      price: order.totalPrice || order.totalAmount || 0,
      date: order.createdAt ? new Date(order.createdAt).toLocaleDateString() : "N/A",
      status: order.status || "Pending"
    }));

    // Response explicitly goes to frontend array direct mapping
    res.status(200).json(formattedOrders);
  } catch (err) {
    console.error("Error inside getSellerOrders controller:", err);
    res.status(500).json({ message: err.message });
  }
};

// ================= UPDATE ORDER STATUS (SELLER) =================
exports.updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Authorization check to guarantee only the rightful seller/artist triggers modifications
    const sellerId = order.seller ? order.seller.toString() : order.artist ? order.artist.toString() : null;
    if (sellerId !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to modify this order state" });
    }

    order.status = status;
    await order.save();

    res.json({
      message: "Order status updated successfully",
      order,
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ================= GET SINGLE ORDER =================
exports.getSingleOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("artwork")
      .populate("buyer", "name email")
      .populate("seller", "name email");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};