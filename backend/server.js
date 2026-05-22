
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const dns = require("dns");

// ==========================================
// DNS FIX (Pakistan ISP issue workaround)
// ==========================================
dns.setServers(["8.8.8.8", "8.8.4.4", "1.1.1.1"]);

// ==========================================
// CONFIG
// ==========================================
dotenv.config();

// ==========================================
// DB CONNECT
// ==========================================
const connectDB = require("./src/config/db");
connectDB(); // ✅ sirf yahan call

// ==========================================
// EXPRESS APP
// ==========================================
const app = express();

// ==========================================
// REQUEST LOGGER
// ==========================================
app.use((req, res, next) => {
  console.log(`➡️ ${req.method} ${req.originalUrl}`);
  next();
});

// ==========================================
// CORS
// ==========================================
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);

// ==========================================
// BODY PARSER
// ==========================================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ==========================================
// STATIC FILES
// ==========================================
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ==========================================
// TEST ROUTE
// ==========================================
app.get("/", (req, res) => {
  res.status(200).send("🎨 ArtistryPro Server is running successfully!");
});

// ==========================================
// ROUTES
// ==========================================
app.use("/api/auth", require("./src/routes/authRoutes"));
app.use("/api/users", require("./src/routes/userRoutes"));
app.use("/api/artists", require("./src/routes/artistRoutes"));
app.use("/api/artworks", require("./src/routes/artworkRoutes"));
app.use("/api/orders", require("./src/routes/orderRoutes"));
app.use("/api/reviews", require("./src/routes/reviewRoutes"));
app.use("/api/admin", require("./src/routes/adminRoutes"));

// ==========================================
// 404 HANDLER
// ==========================================
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// ==========================================
// GLOBAL ERROR HANDLER
// ==========================================
app.use((err, req, res, next) => {
  console.error("🔥 Error:", err);

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
});

// ==========================================
// START SERVER
// ==========================================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});