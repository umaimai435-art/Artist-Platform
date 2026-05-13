const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    artworkId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Artwork"
    },
    rating: Number,
    comment: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", reviewSchema);