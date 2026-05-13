const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["buyer", "seller"],
      default: "buyer",
    },

    bio: {
      type: String,
      default: "",
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    otp: String,
    otpExpires: Date,
  },
  { timestamps: true }
);

/// 🔐 HASH PASSWORD BEFORE SAVE
userSchema.pre("save", async function (next) {
  try {
    if (this.isModified("password")) {
      this.password = await bcrypt.hash(this.password, 10);
    }

    // OTP generation (only for new users or unverified users)
    if (this.isNew || !this.isVerified) {
      this.otp = Math.floor(100000 + Math.random() * 900000).toString();
      this.otpExpires = Date.now() + 10 * 60 * 1000;
    }

    next();
  } catch (err) {
    next(err);
  }
});

/// 🔑 COMPARE PASSWORD METHOD (THIS FIXES YOUR ERROR)
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports =
  mongoose.models.User || mongoose.model("User", userSchema);