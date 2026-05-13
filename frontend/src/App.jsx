import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

// Pages
import Home from "./pages/Home";
import ExploreArt from "./pages/ExploreArt";
import StartSelling from "./pages/StartSelling";
import CheckEmail from "./pages/CheckEmail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Order from "./pages/Order";
import UploadArtwork from "./pages/UploadArtwork";
import ArtworkDetails from "./pages/ArtworkDetails";
import Reviews from "./pages/Reviews";
import Notfound from "./pages/Notfound";
import HowItWorks from "./pages/HowItWorks";
import VerifyOtp from "./pages/Verify";

// Dashboards
import SellerDashboard from "./pages/SellerDashboard.jsx";
import BuyerDashboard from "./pages/BuyerDashboard.jsx";

// Admin Pages
import AdminLogin from "./pages/Admin/AdminLogin";
import AdminDashboard from "./pages/Admin/AdminDashboard";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>

        {/* ================= PUBLIC ROUTES ================= */}
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<ExploreArt />} />
        <Route path="/start-selling" element={<StartSelling />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/check-email" element={<CheckEmail />} />
        <Route path="/art/:id" element={<ArtworkDetails />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
          <Route
  path="/adminDashboard"
  element={
    <ProtectedRoute role="admin">
      <AdminDashboard />
    </ProtectedRoute>
  }
/>
        {/* ================= USER (BUYER) DASHBOARD ================= */}
        <Route
          path="/buyer/dashboard"
          element={
            <ProtectedRoute role="buyer">
              <BuyerDashboard />
            </ProtectedRoute>
          }
        />

        {/* ================= SELLER DASHBOARD ================= */}
        <Route
          path="/seller/dashboard"
          element={
            <ProtectedRoute role="seller">
              <SellerDashboard />
            </ProtectedRoute>
          }
        />

        {/* ================= SELLER ONLY ROUTES ================= */}
        <Route
          path="/upload"
          element={
            <ProtectedRoute role="seller">
              <UploadArtwork />
            </ProtectedRoute>
          }
        />

        {/* ================= USER PROTECTED ROUTES ================= */}
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />

        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />

        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <Order />
            </ProtectedRoute>
          }
        />

        {/* ================= ADMIN ROUTES ================= */}
        <Route path="/adminLogin" element={<AdminLogin />} />

        <Route
          path="/adminDashboard"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* ================= 404 ================= */}
        <Route path="*" element={<Notfound />} />

      </Routes>
    </BrowserRouter>
  );
};

export default App;