import React, { useEffect, useState } from "react";
import axios from "axios";

const DashboardHome = () => {
  const [stats, setStats] = useState({ totalArtworks: 0, totalEarnings: 0, soldItems: 0 });
  const [recentArtworks, setRecentArtworks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        // Aapke real endpoint se artist ke data counters fetch ho rahe hain
        const res = await axios.get("http://localhost:5000/api/dashboard/artist", {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        if (res.data && res.data.success) {
          setStats({
            totalArtworks: res.data.stats?.totalArtworks || 0,
            totalEarnings: res.data.stats?.totalEarnings || 0,
            soldItems: res.data.stats?.soldItems || 0
          });
          setRecentArtworks(res.data.recent || []);
        }
      } catch (err) {
        console.error("Dashboard database sync error:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardStats();
  }, []);

  if (loading) {
    return <div style={{ color: "#a855f7", padding: "20px", textAlign: "center" }}>Loading metrics... 📊</div>;
  }

  return (
    <div>
      <div style={{ marginBottom: "30px" }}>
        <h1 style={{ fontSize: "28px", fontWeight: "bold", margin: "0 0 5px 0", color: "#fff" }}>Welcome Back, Artist ✨</h1>
        <p style={{ color: "#aaa", margin: 0, fontSize: "14px" }}>Here is what's happening with your art store today.</p>
      </div>

      {/* Counters Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px", marginBottom: "40px" }}>
        <div style={{ background: "#1a1a1a", padding: "25px", borderRadius: "12px", border: "1px solid #2a2a2a" }}>
          <p style={{ color: "#aaa", fontSize: "14px", margin: "0 0 10px 0" }}>Total Artworks</p>
          <h3 style={{ fontSize: "32px", margin: 0, color: "#a855f7", fontWeight: "bold" }}>{stats.totalArtworks}</h3>
        </div>
        <div style={{ background: "#1a1a1a", padding: "25px", borderRadius: "12px", border: "1px solid #2a2a2a" }}>
          <p style={{ color: "#aaa", fontSize: "14px", margin: "0 0 10px 0" }}>Total Earnings</p>
          <h3 style={{ fontSize: "32px", margin: 0, color: "#22c55e", fontWeight: "bold" }}>Rs {stats.totalEarnings.toLocaleString()}</h3>
        </div>
        <div style={{ background: "#1a1a1a", padding: "25px", borderRadius: "12px", border: "1px solid #2a2a2a" }}>
          <p style={{ color: "#aaa", fontSize: "14px", margin: "0 0 10px 0" }}>Masterpieces Sold</p>
          <h3 style={{ fontSize: "32px", margin: 0, color: "#3b82f6", fontWeight: "bold" }}>{stats.soldItems}</h3>
        </div>
      </div>

      {/* Recent Updates Table */}
      <div style={{ background: "#1a1a1a", padding: "25px", borderRadius: "12px", border: "1px solid #2a2a2a" }}>
        <h2 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "20px", color: "#fff" }}>⏱️ Recent Art Updates</h2>
        
        {recentArtworks.length === 0 ? (
          <div style={{ textAlign: "center", padding: "30px", color: "#666", fontSize: "14px" }}>
            No recent art updates found. Upload your first masterpiece! 🚀
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", color: "#fff" }}>
              <thead>
                <tr style={{ borderBottom: "2px solid #2a2a2a" }}>
                  <th style={{ padding: "12px 10px", color: "#aaa" }}>Artwork Title</th>
                  <th style={{ padding: "12px 10px", color: "#aaa" }}>Category</th>
                  <th style={{ padding: "12px 10px", color: "#aaa" }}>Price</th>
                  <th style={{ padding: "12px 10px", color: "#aaa" }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentArtworks.map((art, idx) => (
                  <tr key={art._id || idx} style={{ borderBottom: "1px solid #252525" }}>
                    <td style={{ padding: "15px 10px", fontSize: "14px", fontWeight: "500" }}>{art.title}</td>
                    <td style={{ padding: "15px 10px", fontSize: "14px", color: "#ccc" }}>{art.category}</td>
                    <td style={{ padding: "15px 10px", fontSize: "14px", color: "#a855f7", fontWeight: "bold" }}>Rs {art.price?.toLocaleString()}</td>
                    <td style={{ padding: "15px 10px" }}>
                      <span style={{ display: "inline-block", padding: "4px 10px", fontSize: "12px", borderRadius: "20px", fontWeight: "bold", background: art.isSold ? "rgba(239,68,68,0.15)" : "rgba(34,197,94,0.15)", color: art.isSold ? "#ef4444" : "#22c55e" }}>
                        {art.isSold ? "● Sold" : "● Active"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardHome;