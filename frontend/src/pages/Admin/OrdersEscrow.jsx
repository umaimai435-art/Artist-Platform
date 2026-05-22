import React, { useState, useEffect } from "react";
import axios from "axios";

const OrdersEscrow = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/api/admin/orders", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.data) setOrders(response.data);
      } catch (err) {
        console.error("Admin escrow database fetch failed:", err);
        // 🔥 Dummy collections deleted! Fallback to clean state
        setOrders([]); 
      } finally {
        setLoading(false);
      }
    };
    fetchAdminOrders();
  }, []);

  if (loading) return <div style={{ color: "#fff", padding: "20px" }}>Loading Escrow System Engine...</div>;

  return (
    <div style={{ color: "#fff", padding: "20px" }}>
      <h3>🔒 Admin Orders & Escrow Control</h3>
      {orders.length === 0 ? (
        <p style={{ color: "#555", fontStyle: "italic" }}>No orders currently logs inside the system escrow escrow room.</p>
      ) : (
        <div>{/* Render real orders table map here */}</div>
      )}
    </div>
  );
};

export default OrdersEscrow;