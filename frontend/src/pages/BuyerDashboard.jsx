import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const BuyerDashboard = () => {
  const [stats, setStats] = useState({
    wishlistCount: 0,
    ordersCount: 0,
  });

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const wishlistRes = await axios.get("http://localhost:5000/api/wishlist", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const ordersRes = await axios.get("http://localhost:5000/api/orders/my-orders", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setStats({
          wishlistCount: wishlistRes.data?.data?.length || 0,
          ordersCount: ordersRes.data?.orders?.length || 0,
        });
      } catch (err) {
        console.error("Dashboard metric parsing layer issues:", err);
      }
    };

    fetchDashboardStats();
  }, []);

  return (
    <div style={styles.page}>
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.heading}>Welcome, Buyer 🛍️</h1>
        <p style={styles.subHeading}>Browse, purchase, and track amazing artworks from talented artists</p>
      </div>

      {/* Stats Section */}
      <div style={styles.statsGrid}>
        <Link
          to="/explore"
          style={styles.statCard}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-5px)";
            e.currentTarget.style.boxShadow = "0 8px 22px rgba(168,85,247,0.15)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 4px 15px rgba(0,0,0,0.4)";
          }}
        >
          <h2 style={{ margin: 0, fontSize: "32px" }}>🎨</h2>
          <p style={styles.statTitle}>Explore Artworks</p>
          <span style={styles.statDesc}>Discover new masterpieces</span>
        </Link>

        <Link
          to="/my-orders"
          style={styles.statCard}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-5px)";
            e.currentTarget.style.boxShadow = "0 8px 22px rgba(168,85,247,0.15)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 4px 15px rgba(0,0,0,0.4)";
          }}
        >
          <h2 style={{ margin: 0, fontSize: "32px" }}>🧾</h2>
          <p style={styles.statTitle}>My Orders ({stats.ordersCount})</p>
          <span style={styles.statDesc}>View purchase history</span>
        </Link>

        <Link
          to="/wishlist"
          style={styles.statCard}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-5px)";
            e.currentTarget.style.boxShadow = "0 8px 22px rgba(168,85,247,0.15)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 4px 15px rgba(0,0,0,0.4)";
          }}
        >
          <h2 style={{ margin: 0, fontSize: "32px" }}>❤️</h2>
          <p style={styles.statTitle}>Wishlist ({stats.wishlistCount})</p>
          <span style={styles.statDesc}>Save favorite artworks</span>
        </Link>
      </div>

      {/* Action Buttons */}
      <div style={styles.actions}>
        <Link
          to="/explore"
          style={styles.primaryBtn}
          onMouseOver={(e) => (e.currentTarget.style.background = "#9333ea")}
          onMouseOut={(e) => (e.currentTarget.style.background = "#a855f7")}
        >
          Explore Artworks
        </Link>

        <Link
          to="/my-orders"
          style={styles.secondaryBtn}
          onMouseOver={(e) => {
            e.currentTarget.style.background = "rgba(168,85,247,0.1)";
            e.currentTarget.style.borderColor = "#9333ea";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.borderColor = "#a855f7";
          }}
        >
          View My Orders
        </Link>
      </div>

      {/* Info Section */}
      <div style={styles.infoBox}>
        <h3 style={{ margin: "0 0 15px 0", fontSize: "18px", color: "#fff", fontWeight: "bold" }}>
          🖼️ How it works
        </h3>
        <ul style={styles.list}>
          <li>Real time data dynamically synchronizes through active MongoDB schemas.</li>
          <li>Wishlist management is persistent per authenticated buyer id context.</li>
          <li>Purchase flows securely update the active tracking interfaces.</li>
        </ul>
      </div>
    </div>
  );
};

const styles = {
  page: { padding: "40px", minHeight: "100vh", background: "#121212", color: "#fff", fontFamily: "Segoe UI, sans-serif" },
  header: { marginBottom: "35px", borderBottom: "1px solid #2a2a2a", paddingBottom: "20px" },
  heading: { fontSize: "32px", fontWeight: "bold", marginBottom: "8px", color: "#fff" },
  subHeading: { fontSize: "15px", color: "#aaa", margin: 0 },
  statsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "25px", marginBottom: "35px" },
  statCard: {
    background: "#1a1a1a",
    borderRadius: "12px",
    padding: "25px 20px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.4)",
    border: "1px solid #2a2a2a",
    textAlign: "center",
    textDecoration: "none",
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
  },
  statTitle: { fontSize: "18px", fontWeight: "bold", marginTop: "12px", marginBottom: "5px", color: "#fff" },
  statDesc: { fontSize: "13px", color: "#aaa" },
  actions: { display: "flex", gap: "15px", marginBottom: "35px", flexWrap: "wrap" },
  primaryBtn: {
    padding: "12px 24px",
    background: "#a855f7",
    color: "#fff",
    borderRadius: "8px",
    textDecoration: "none",
    fontWeight: "bold",
    fontSize: "14px",
    transition: "0.2s ease",
    boxShadow: "0 4px 15px rgba(168,85,247,0.3)",
  },
  secondaryBtn: {
    padding: "12px 24px",
    background: "transparent",
    color: "#a855f7",
    border: "2px solid #a855f7",
    borderRadius: "8px",
    textDecoration: "none",
    fontWeight: "bold",
    fontSize: "14px",
    transition: "0.2s ease",
  },
  infoBox: { background: "#1a1a1a", borderRadius: "12px", padding: "25px", border: "1px solid #2a2a2a", boxShadow: "0 4px 15px rgba(0,0,0,0.4)" },
  list: { paddingLeft: "20px", color: "#ccc", lineHeight: "1.8", margin: 0, fontSize: "14px" },
};

export default BuyerDashboard;