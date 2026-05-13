const mongoose = require("mongoose");

const artworkSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    image: {
      type: String,
      required: true, // Cloudinary / image URL
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
        "Other",
      ],
      default: "Other",
    },

    // ✅ ONLY ONE artist field (FIXED)
    artist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.models.Artwork || mongoose.model("Artwork", artworkSchema)