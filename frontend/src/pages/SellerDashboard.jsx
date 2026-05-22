import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
// Settings.jsx direct pages folder mein hi hai
import Settings from "./Settings.jsx";

const API_URL = "http://localhost:5000/api/artworks";

const SellerDashboard = () => {
  // Navigation active tab set karne ke liye
  const [activeTab, setActiveTab] = useState("dashboard");

  const [stats, setStats] = useState({ totalArtworks: 0, totalEarnings: 0, soldItems: 0 });
  const [recentArtworks, setRecentArtworks] = useState([]);
  const [orders, setOrders] = useState([]); // Real customer orders state layer
  const [loading, setLoading] = useState(true);
  const [ordersLoading, setOrdersLoading] = useState(false);

  // Upload Form States
  const fileInputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({ title: "", description: "", price: "", category: "Abstract" });
  const [uploadLoading, setUploadLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const { title, description, price, category } = formData;

  // ================= FETCH DASHBOARD COUNTERS & RECENT ARTWORKS =================
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          // FIXED: Pointing exactly to your working live backend controller route
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
            setLoading(false);
            return;
          }
        }
      } catch (err) {
        console.error("Backend fetch status error:", err.message || err);
      }

      // Fallback clean state if connection skips
      setStats({ totalArtworks: 0, totalEarnings: 0, soldItems: 0 });
      setRecentArtworks([]);
      setLoading(false);
    };

    fetchDashboardData();
  }, []);

  // ================= FETCH REAL ORDERS DYNAMICALLY WHEN TAB OPENS =================
  useEffect(() => {
    if (activeTab === "orders") {
      const fetchSellerOrders = async () => {
        setOrdersLoading(true);
        try {
          const token = localStorage.getItem("token");
          const res = await axios.get("http://localhost:5000/api/orders/seller", {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (res.data) {
            setOrders(res.data);
          }
        } catch (err) {
          console.error("Error loading seller custom orders:", err.message);
          setOrders([]); // Strict reset, zero hardcoded fallback data leaks
        } finally {
          setOrdersLoading(false);
        }
      };
      fetchSellerOrders();
    }
  }, [activeTab]);

  // Upload Handlers
  const handleFormChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      setImagePreview(URL.createObjectURL(selectedFile));
    } else {
      setImagePreview(null);
    }
  };

  const handleUploadSubmit = async (e) => {
    e.preventDefault();
    setUploadLoading(true);
    setMessage("");
    setError("");

    if (!file) {
      setError("Please select an artwork image");
      setUploadLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("You must be logged in as seller. Token missing.");
        setUploadLoading(false);
        return;
      }

      const data = new FormData();
      data.append("image", file);
      data.append("title", title);
      data.append("description", description);
      data.append("price", price);
      data.append("category", category);

      await axios.post(API_URL, data, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
      });

      setMessage("Artwork uploaded successfully 🎉");
      setFormData({ title: "", description: "", price: "", category: "Abstract" });
      setFile(null);
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      
    } catch (err) {
      setError(err.response?.data?.message || err.response?.data?.error || "Upload failed. Try again.");
    } finally {
      setUploadLoading(false);
    }
  };

  const getBtnStyle = (tabName) => ({
    textAlign: "left",
    padding: "12px 15px",
    background: activeTab === tabName ? "#a855f7" : "transparent",
    color: activeTab === tabName ? "#fff" : "#ccc",
    border: "none",
    borderRadius: "8px",
    fontWeight: activeTab === tabName ? "bold" : "normal",
    cursor: "pointer",
    transition: "0.2s",
  });

  const getStatusStyle = (status) => {
    switch(status?.toLowerCase()) {
      case "delivered": return { background: "rgba(34,197,94,0.15)", color: "#22c55e" };
      case "processing": return { background: "rgba(59,130,246,0.15)", color: "#3b82f6" };
      case "pending": return { background: "rgba(234,179,8,0.15)", color: "#eab308" };
      default: return { background: "rgba(156,163,175,0.15)", color: "#9ca3af" };
    }
  };

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "70vh", color: "#a855f7", fontSize: "18px", fontFamily: "sans-serif" }}>
        <div>Loading dashboard metrics... 🎨⏳</div>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#121212", color: "#fff", fontFamily: "sans-serif" }}>
      
      {/* SIDEBAR PANEL */}
      <div style={{ width: "260px", background: "#1a1a1a", borderRight: "1px solid #2a2a2a", padding: "25px 20px", display: "flex", flexDirection: "column", gap: "10px" }}>
        <div style={{ fontSize: "20px", fontWeight: "bold", color: "#a855f7", marginBottom: "30px", display: "flex", alignItems: "center", gap: "10px" }}>
          🎨 <span>Seller Panel</span>
        </div>
        
        <button style={getBtnStyle("dashboard")} onClick={() => setActiveTab("dashboard")}>
          📊 Dashboard
        </button>
        <button style={getBtnStyle("upload")} onClick={() => setActiveTab("upload")}>
          ➕ Upload Artwork
        </button>
        <button style={getBtnStyle("myartworks")} onClick={() => setActiveTab("myartworks")}>
          🖼️ My Artworks
        </button>
        <button style={getBtnStyle("orders")} onClick={() => setActiveTab("orders")}>
          🛒 Orders
        </button>
        <button style={getBtnStyle("settings")} onClick={() => setActiveTab("settings")}>
          ⚙️ Settings
        </button>
      </div>

      {/* DYNAMIC MAIN CONTENT AREA */}
      <div style={{ flex: 1, padding: "40px", overflowY: "auto" }}>
        
        {/* TAB 1: DASHBOARD MAIN LOOK */}
        {activeTab === "dashboard" && (
          <div>
            <div style={{ marginBottom: "30px" }}>
              <h1 style={{ fontSize: "28px", fontWeight: "bold", margin: "0 0 5px 0" }}>Welcome Back, Artist ✨</h1>
              <p style={{ color: "#aaa", margin: 0, fontSize: "14px" }}>Here is what's happening with your art store today.</p>
            </div>

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

            <div style={{ background: "#1a1a1a", padding: "25px", borderRadius: "12px", border: "1px solid #2a2a2a" }}>
              <h2 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "20px" }}>⏱️ Recent Art Updates</h2>
              
              {recentArtworks.length === 0 ? (
                <div style={{ textAlign: "center", padding: "30px", color: "#666", fontSize: "14px" }}>
                  No recent art updates found. Upload your first masterpiece! 🚀
                </div>
              ) : (
                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
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
        )}

        {/* TAB 2: UPLOAD ARTWORK FORM VIEW */}
        {activeTab === "upload" && (
          <div style={{ maxWidth: "600px", margin: "0 auto", padding: "30px", borderRadius: "12px", background: "#1a1a1a", border: "1px solid #2a2a2a", boxShadow: "0 8px 24px rgba(0,0,0,0.3)" }}>
            <h2 style={{ marginBottom: "20px", color: "#a855f7", textAlign: "center", fontWeight: "bold" }}>Upload New Artwork</h2>
            {message && <p style={{ color: "#4ade80", background: "rgba(74,222,128,0.1)", padding: "10px", borderRadius: "6px", textAlign: "center", fontWeight: "bold" }}>{message}</p>}
            {error && <p style={{ color: "#f87171", background: "rgba(248,113,113,0.1)", padding: "10px", borderRadius: "6px", textAlign: "center", fontWeight: "bold" }}>{error}</p>}

            <form onSubmit={handleUploadSubmit}>
              <div style={{ marginBottom: "15px" }}>
                <label style={{ display: "block", marginBottom: "5px", color: "#ccc", fontSize: "14px" }}>Title</label>
                <input type="text" name="title" value={title} onChange={handleFormChange} required style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #444", background: "#2a2a2a", color: "#fff", boxSizing: "border-box" }} />
              </div>
              <div style={{ marginBottom: "15px" }}>
                <label style={{ display: "block", marginBottom: "5px", color: "#ccc", fontSize: "14px" }}>Description</label>
                <textarea name="description" value={description} onChange={handleFormChange} required rows="4" style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #444", background: "#2a2a2a", color: "#fff", resize: "none", boxSizing: "border-box" }} />
              </div>
              <div style={{ display: "flex", gap: "15px", marginBottom: "15px" }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: "block", marginBottom: "5px", color: "#ccc", fontSize: "14px" }}>Price (Rs)</label>
                  <input type="number" name="price" value={price} onChange={handleFormChange} required min="0" style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #444", background: "#2a2a2a", color: "#fff", boxSizing: "border-box" }} />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: "block", marginBottom: "5px", color: "#ccc", fontSize: "14px" }}>Category</label>
                  <select name="category" value={category} onChange={handleFormChange} style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #444", background: "#2a2a2a", color: "#fff", boxSizing: "border-box", height: "41px" }}>
                    <option value="Abstract">Abstract</option>
                    <option value="Landscape">Landscape</option>
                    <option value="Portrait">Portrait</option>
                    <option value="Modern">Modern</option>
                    <option value="Islamic">Islamic</option>
                    <option value="Calligraphy">Calligraphy</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", marginBottom: "5px", color: "#ccc", fontSize: "14px" }}>Artwork Image</label>
                <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileChange} required style={{ color: "#ccc" }} />
                {imagePreview && (
                  <div style={{ marginTop: "15px", textAlign: "center" }}>
                    <img src={imagePreview} alt="Preview" style={{ maxWidth: "100%", maxHeight: "180px", borderRadius: "6px", border: "2px solid #a855f7", objectFit: "contain" }} />
                  </div>
                )}
              </div>
              <button type="submit" disabled={uploadLoading} style={{ width: "100%", padding: "12px", background: "#a855f7", color: "#fff", border: "none", borderRadius: "6px", fontSize: "16px", fontWeight: "bold", cursor: uploadLoading ? "not-allowed" : "pointer" }}>
                {uploadLoading ? "Uploading Masterpiece..." : "Upload Artwork"}
              </button>
            </form>
          </div>
        )}

        {/* TAB 3 & 4 */}
        {activeTab === "myartworks" && <div style={{ textAlign: "center", padding: "40px", color: "#aaa" }}>🖼️ My Artworks Management Layout coming soon...</div>}

        {/* TAB 4: REAL DYNAMIC CUSTOMER ORDERS PANEL */}
        {activeTab === "orders" && (
          <div style={{ background: "#1a1a1a", padding: "30px", borderRadius: "12px", border: "1px solid #2a2a2a" }}>
            <div style={{ marginBottom: "25px" }}>
              <h2 style={{ fontSize: "24px", fontWeight: "bold", margin: "0 0 5px 0", color: "#fff" }}>📦 Customer Orders</h2>
              <p style={{ color: "#aaa", margin: 0, fontSize: "14px" }}>Track incoming purchases and artwork shipment statuses.</p>
            </div>
            
            {ordersLoading ? (
              <div style={{ color: "#a855f7", padding: "20px", textAlign: "center" }}>Loading orders database ledger...</div>
            ) : orders.length === 0 ? (
              // ✅ FIXED: Clean empty state instead of hardcoded row
              <div style={{ textAlign: "center", padding: "40px 10px", color: "#555", fontStyle: "italic", border: "1px dashed #333", borderRadius: "8px" }}>
                No customer orders received yet.
              </div>
            ) : (
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
                  <thead>
                    <tr style={{ borderBottom: "2px solid #2a2a2a" }}>
                      <th style={{ padding: "12px 10px", color: "#aaa", fontSize: "14px" }}>Order ID</th>
                      <th style={{ padding: "12px 10px", color: "#aaa", fontSize: "14px" }}>Customer</th>
                      <th style={{ padding: "12px 10px", color: "#aaa", fontSize: "14px" }}>Artwork Title</th>
                      <th style={{ padding: "12px 10px", color: "#aaa", fontSize: "14px" }}>Amount</th>
                      <th style={{ padding: "12px 10px", color: "#aaa", fontSize: "14px" }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order, index) => (
                      <tr key={order._id || index} style={{ borderBottom: "1px solid #252525" }}>
                        <td style={{ padding: "15px 10px", fontSize: "14px", color: "#a855f7", fontWeight: "bold" }}>
                          #{order._id ? order._id.toString().substring(0, 8).toUpperCase() : `ORD-${index}`}
                        </td>
                        <td style={{ padding: "15px 10px", fontSize: "14px", fontWeight: "500" }}>{order.customerName}</td>
                        <td style={{ padding: "15px 10px", fontSize: "14px", color: "#ccc" }}>{order.artworkTitle}</td>
                        <td style={{ padding: "15px 10px", fontSize: "14px", color: "#22c55e", fontWeight: "bold" }}>
                          Rs {order.price ? order.price.toLocaleString() : 0}
                        </td>
                        <td style={{ padding: "15px 10px" }}>
                          <span style={{ display: "inline-block", padding: "4px 12px", fontSize: "12px", borderRadius: "20px", fontWeight: "bold", ...getStatusStyle(order.status) }}>
                            ● {order.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {activeTab === "settings" && <Settings />}

      </div>
    </div>
  );
};

export default SellerDashboard;