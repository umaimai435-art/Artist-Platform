import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
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
import MyArtworks from "./pages/MyArtworks";
import ArtworkDetails from "./pages/ArtworkDetails";
import Reviews from "./pages/Reviews";
import Notfound from "./pages/Notfound";
import HowItWorks from "./pages/HowItWorks";
import VerifyOtp from "./pages/Verify";
import MyOrders from "./pages/MyOrders";
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

// ================= LAYOUTS =================
const ClientLayout = ({ children }) => (
  <>
    <Navbar />
    {children}
  </>
);

const AdminLayout = ({ children }) => (
  <div className="flex min-h-screen bg-[#0c0c0e] text-white">
    <div className="w-64 shrink-0">
      <Sidebar />
    </div>
    <div className="flex-1 p-6 overflow-x-hidden">{children}</div>
  </div>
);

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* ===== PUBLIC ===== */}
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

        {/* ===== BUYER ===== */}
        <Route
          path="/buyer/dashboard"
          element={
            <ProtectedRoute role="buyer">
              <ClientLayout><BuyerDashboard /></ClientLayout>
            </ProtectedRoute>
          }
        />
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

        {/* ===== SELLER / ARTIST ===== */}
        <Route
          path="/seller/dashboard"
          element={
            <ProtectedRoute role="seller">
              <ClientLayout><SellerDashboard /></ClientLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/upload"
          element={
            <ProtectedRoute role="seller">
              <ClientLayout><UploadArtwork /></ClientLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-artworks"
          element={
            <ProtectedRoute role="seller">
              <ClientLayout><MyArtworks /></ClientLayout>
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

        {/* ===== ADMIN ===== */}
        <Route path="/adminLogin" element={<AdminLogin />} />
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

        {/* ===== 404 ===== */}
        <Route path="*" element={<Notfound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;