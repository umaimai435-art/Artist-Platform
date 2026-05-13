const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    buyerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    artworkId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Artwork"
    },
    totalPrice: Number,
    status: {
      type: String,
      default: "Pending"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);