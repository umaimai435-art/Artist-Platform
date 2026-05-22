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
      enum: ["buyer", "seller", "admin"], // Admin role bhi add kar di hai safety ke liye
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

/* ======================================
   PASSWORD HASHING (Fixed next() error)
====================================== */
userSchema.pre("save", async function () {
  // Agar password modify nahi hua toh aage barh jayen
  if (!this.isModified("password")) return;

  try {
    // Salt generate karke hash karein
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  } catch (err) {
    throw new Error(err);
  }
});

/* ======================================
   COMPARE PASSWORD METHOD
====================================== */
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.models.User || mongoose.model("User", userSchema);