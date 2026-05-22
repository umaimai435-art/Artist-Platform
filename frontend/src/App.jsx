
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar"; // Sidebar import kiya
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
import Order from "./pages/Order"; // Seller ke liye Customer Orders page
import UploadArtwork from "./pages/UploadArtwork";
import ArtworkDetails from "./pages/ArtworkDetails";
import Reviews from "./pages/Reviews";
import Notfound from "./pages/Notfound";
import HowItWorks from "./pages/HowItWorks";
import VerifyOtp from "./pages/Verify";
import MyOrders from "./pages/MyOrders"; // Buyer ke liye apna Orders page
import Wishlist from "./pages/Wishlist";

// Dashboards
import SellerDashboard from "./pages/SellerDashboard";
import BuyerDashboard from "./pages/BuyerDashboard";

// Admin Pages
import AdminLogin from "./pages/Admin/AdminLogin";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import UserManagement from "./pages/Admin/UserManagement";
import ArtworkApprovals from "./pages/Admin/ArtworkApprovals";
import OrdersEscrow from "./pages/Admin/OrdersEscrow";
import ArtistVerifications from "./pages/Admin/ArtistVerifications";
import SystemSettings from "./pages/Admin/SystemSettings";

// Wrapper Component: Jo sirf store/client pages par Navbar dikhayega, Admin par nahi
const ClientLayout = ({ children }) => (
  <>
    <Navbar />
    {children}
  </>
);

// Wrapper Component: Jo saare Admin pages par Sidebar dikhayega aur content ko perfect spacing dega
const AdminLayout = ({ children }) => (
  <div className="flex min-h-screen bg-[#0c0c0e] text-white">
    {/* Warning yahan solve ki hai: flex-shrink-0 ko shrink-0 likha hai */}
    <div className="w-64 shrink-0">
      <Sidebar />
    </div>
    
    {/* Main content area jo bachi hui poori width lega aur left ke khali fasle ko khatam karega */}
    <div className="flex-1 min-h-screen p-6 overflow-x-hidden">
      {children}
    </div>
  </div>
);

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* ================= PUBLIC ROUTES ================= */}
        <Route path="/" element={<ClientLayout><Home /></ClientLayout>} />
        <Route path="/explore" element={<ClientLayout><ExploreArt /></ClientLayout>} />
        <Route path="/start-selling" element={<ClientLayout><StartSelling /></ClientLayout>} />
        <Route path="/login" element={<ClientLayout><Login /></ClientLayout>} />
        <Route path="/register" element={<ClientLayout><Register /></ClientLayout>} />
        <Route path="/check-email" element={<ClientLayout><CheckEmail /></ClientLayout>} />
        <Route path="/art/:id" element={<ClientLayout><ArtworkDetails /></ClientLayout>} />
        <Route path="/reviews" element={<ClientLayout><Reviews /></ClientLayout>} />
        <Route path="/how-it-works" element={<ClientLayout><HowItWorks /></ClientLayout>} />
        <Route path="/verify-otp" element={<ClientLayout><VerifyOtp /></ClientLayout>} />
        <Route path="/wishlist" element={<ClientLayout><Wishlist /></ClientLayout>} />

        {/* ================= BUYER DASHBOARD ================= */}
        <Route
          path="/buyer/dashboard"
          element={
            <ProtectedRoute role="buyer">
              <ClientLayout><BuyerDashboard /></ClientLayout>
            </ProtectedRoute>
          }
        />

        {/* ================= BUYER ONLY ROUTES ================= */}
        <Route
          path="/cart"
          element={
            <ProtectedRoute role="buyer">
              <ClientLayout><Cart /></ClientLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/checkout"
          element={
            <ProtectedRoute role="buyer">
              <ClientLayout><Checkout /></ClientLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-orders"
          element={
            <ProtectedRoute role="buyer">
              <ClientLayout><MyOrders /></ClientLayout>
            </ProtectedRoute>
          }
        />

        {/* ================= SELLER DASHBOARD ================= */}
        <Route
          path="/seller/dashboard"
          element={
            <ProtectedRoute role="seller">
              <ClientLayout><SellerDashboard /></ClientLayout>
            </ProtectedRoute>
          }
        />

        {/* ================= SELLER ONLY ROUTES ================= */}
        <Route
          path="/upload"
          element={
            <ProtectedRoute role="seller">
              <ClientLayout><UploadArtwork /></ClientLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/seller/orders"
          element={
            <ProtectedRoute role="seller">
              <ClientLayout><Order /></ClientLayout>
            </ProtectedRoute>
          }
        />

        {/* ================= ADMIN PUBLIC ROUTES ================= */}
        <Route path="/adminLogin" element={<AdminLogin />} />

        {/* ================= ADMIN PROTECTED ROUTES ================= */}
        <Route
          path="/adminDashboard"
          element={
            <ProtectedRoute role="admin">
              <AdminLayout><AdminDashboard /></AdminLayout>
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute role="admin">
              <AdminLayout><UserManagement /></AdminLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/artwork-approvals"
          element={
            <ProtectedRoute role="admin">
              <AdminLayout><ArtworkApprovals /></AdminLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/orders"
          element={
            <ProtectedRoute role="admin">
              <AdminLayout><OrdersEscrow /></AdminLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/artist-verifications"
          element={
            <ProtectedRoute role="admin">
              <AdminLayout><ArtistVerifications /></AdminLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/settings"
          element={
            <ProtectedRoute role="admin">
              <AdminLayout><SystemSettings /></AdminLayout>
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