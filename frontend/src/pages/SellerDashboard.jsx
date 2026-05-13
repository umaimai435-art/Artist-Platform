import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import StatCard from "../components/StatCard";

const SellerDashboard = () => {
  const [stats, setStats] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/artist/dashboard-stats",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setStats(res.data.data);
      } catch (error) {
        console.error("Failed to load seller dashboard stats", error);
      }
    };

    fetchDashboardStats();
  },[token]);

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      
      {/* ================= SIDEBAR ================= */}
      <div
        style={{
          width: "220px",
          background: "#1f2937",
          color: "#fff",
          padding: "20px",
        }}
      >
        <h3 style={{ marginBottom: "20px" }}>🎨 Seller Panel</h3>

        <ul style={{ listStyle: "none", padding: 0 }}>
          <li style={{ marginBottom: "12px" }}>
            <Link to="/seller/dashboard" style={linkStyle}>
              Dashboard
            </Link>
          </li>
          <li style={{ marginBottom: "12px" }}>
            <Link to="/upload" style={linkStyle}>
              Upload Artwork
            </Link>
          </li>
          <li style={{ marginBottom: "12px" }}>
            <Link to="/seller/my-artworks" style={linkStyle}>
              My Artworks
            </Link>
          </li>
          <li style={{ marginBottom: "12px" }}>
            <Link to="/orders" style={linkStyle}>
              Orders
            </Link>
          </li>
        </ul>
      </div>

      {/* ================= MAIN CONTENT ================= */}
      <div style={{ flex: 1, padding: "30px", background: "#f9fafb" }}>
        <h1 style={{ fontSize: "24px", marginBottom: "10px" }}>
          Welcome Seller 👩‍🎨
        </h1>
        <p style={{ color: "#6b7280", marginBottom: "30px" }}>
          Manage your artworks, sales, and earnings
        </p>

        {!stats ? (
          <p>Loading dashboard...</p>
        ) : (
          <>
            {/* ===== STATS CARDS ===== */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "20px",
                marginBottom: "30px",
              }}
            >
              <StatCard title="Total Artworks" value={stats.totalArtworks} />
              <StatCard title="Total Orders" value={stats.totalOrders} />
              <StatCard
                title="Total Earnings"
                value={`Rs ${stats.totalEarnings}`}
              />
              <StatCard title="Total Sales" value={stats.totalSales} />
            </div>

            {/* ===== PLACEHOLDER FOR CHART ===== */}
            <div
              style={{
                background: "#fff",
                padding: "20px",
                borderRadius: "8px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
              }}
            >
              <h3>Sales Overview</h3>
              <p style={{ color: "#6b7280" }}>
                Chart will be added in next phase
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const linkStyle = {
  color: "#e5e7eb",
  textDecoration: "none",
};

export default SellerDashboard;