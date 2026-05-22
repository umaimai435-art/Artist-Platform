import React, { useState, useEffect } from "react";
import axios from "axios";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/api/orders/seller", {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        if (response && response.data) {
          // Parses array direct or nested root data safely
          const ordersList = Array.isArray(response.data) ? response.data : response.data.orders || [];
          setOrders(ordersList);
        }
      } catch (err) {
        console.error("Error fetching live orders:", err.message);
        setError("Could not sync incoming sales ledger from database.");
        setOrders([]); 
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

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
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50vh", color: "#a855f7", fontFamily: "sans-serif" }}>
        Loading Live Order Ledger... 📦
      </div>
    );
  }

  return (
    <div style={{ background: "#121212", minHeight: "100vh", padding: "40px", color: "#fff", fontFamily: "sans-serif" }}>
      <div style={{ background: "#1a1a1a", padding: "30px", borderRadius: "12px", border: "1px solid #2a2a2a", maxWidth: "1100px", margin: "0 auto" }}>
        
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "25px" }}>
          <div>
            <h2 style={{ fontSize: "24px", fontWeight: "bold", margin: "0 0 5px 0", color: "#fff" }}>📦 Customer Orders</h2>
            <p style={{ color: "#aaa", margin: 0, fontSize: "14px" }}>Track incoming purchases and artwork shipment statuses.</p>
          </div>
        </div>

        {error && (
          <div style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", color: "#f87171", padding: "10px", borderRadius: "6px", fontSize: "13px", marginBottom: "20px" }}>
            {error}
          </div>
        )}

        {orders.length === 0 ? (
          <div style={{ textAlign: "center", padding: "50px 20px", color: "#666", border: "1px dashed #333", borderRadius: "8px" }}>
            <span style={{ fontSize: "36px", display: "block", marginBottom: "10px" }}>🛒</span>
            <p style={{ margin: 0, fontSize: "16px", fontWeight: "500", color: "#fff" }}>No customer orders yet</p>
            <p style={{ margin: "5px 0 0 0", fontSize: "13px", color: "#aaa" }}>When a buyer purchases your artwork, it will appear here instantly automatically.</p>
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
                  <th style={{ padding: "12px 10px", color: "#aaa", fontSize: "14px" }}>Date</th>
                  <th style={{ padding: "12px 10px", color: "#aaa", fontSize: "14px" }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => (
                  <tr key={order._id || index} style={{ borderBottom: "1px solid #252525" }}>
                    <td style={{ padding: "15px 10px", fontSize: "14px", color: "#a855f7", fontWeight: "bold" }}>
                      #{order._id ? order._id.toString().substring(0, 8).toUpperCase() : `ORD-${index}`}
                    </td>
                    <td style={{ padding: "15px 10px", fontSize: "14px", fontWeight: "500" }}>{order.customerName || "Buyer User"}</td>
                    <td style={{ padding: "15px 10px", fontSize: "14px", color: "#ccc" }}>{order.artworkTitle || "Artwork Item"}</td>
                    <td style={{ padding: "15px 10px", fontSize: "14px", color: "#22c55e", fontWeight: "bold" }}>
                      Rs {order.price ? order.price.toLocaleString() : 0}
                    </td>
                    <td style={{ padding: "15px 10px", fontSize: "14px", color: "#aaa" }}>
                      {order.date ? new Date(order.date).toLocaleDateString() : new Date().toLocaleDateString()}
                    </td>
                    <td style={{ padding: "15px 10px" }}>
                      <span style={{ display: "inline-block", padding: "4px 12px", fontSize: "12px", borderRadius: "20px", fontWeight: "bold", ...getStatusStyle(order.status || "Pending") }}>
                        ● {order.status || "Pending"}
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

export default Order;
