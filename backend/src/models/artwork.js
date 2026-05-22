const mongoose = require("mongoose");

const artworkSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Artwork title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Artwork description is required"],
    },
    price: {
      type: Number,
      required: [true, "Artwork price is required"],
      min: [0, "Price cannot be negative"],
    },
    image: {
      type: String,
      required: [true, "Artwork image is required"], 
    },
    category: {
      type: String,
      required: true,
      enum: [
        "Abstract",
        "Landscape",
        "Portrait",
        "Modern",
        "Islamic",
        "Calligraphy",
        "Sketches", // Extended dynamic selection mapping element
        "Other",
      ],
      default: "Other",
    },
    status: {
      type: String,
      enum: ["pending", "active", "rejected"],
      default: "pending",
    },
    artist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

artworkSchema.index({ status: 1, artist: 1 });

module.exports = mongoose.models.Artwork || mongoose.model("Artwork", artworkSchema);