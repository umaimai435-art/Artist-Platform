import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_BASE_URL = "http://localhost:5000";

  useEffect(() => {
    const fetchMyOrders = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const { data } = await axios.get(`${API_BASE_URL}/api/orders/my-orders`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        // ✅ PURE DYNAMIC LOGIC: Agar database khali hai toh empty array hi set hoga
        if (data && data.success && data.orders) {
          setOrders(data.orders);
        } else {
          setOrders([]);
        }
      } catch (err) {
        console.warn("Backend connection error or empty database state.", err);
        setOrders([]); // Safe empty state on failure
      } finally {
        setLoading(false);
      }
    };

    fetchMyOrders();
  }, []); 

  const getStatusStyle = (status) => {
    if (status?.toLowerCase() === "delivered") return "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20";
    if (status?.toLowerCase() === "processing") return "bg-blue-500/10 text-blue-400 border border-blue-500/20";
    return "bg-amber-500/10 text-amber-400 border border-amber-500/20";
  };

  return (
    <div className="min-h-screen bg-[#121212] text-white px-4 md:px-10 py-12 font-sans">
      <div className="max-w-4xl mx-auto">
        
        {/* HEADER */}
        <div className="mb-12 border-b border-[#2a2a2a] pb-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center gap-2">
              📦 My Purchases
            </h1>
            <p className="text-gray-400 mt-1 text-sm">
              Track your personal art collections and shipment statuses.
            </p>
          </div>
          <Link 
            to="/buyer/dashboard" 
            className="border border-[#3a3a3a] text-gray-300 bg-transparent px-4 py-2 rounded-xl text-xs font-bold hover:bg-[#1a1a1a] transition duration-200"
          >
            ← Dashboard
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-20 text-purple-400 animate-pulse">Loading your orders...</div>
        ) : (
          <div className="space-y-6">
            {orders.length === 0 ? (
              /* ✅ BEAUTIFUL EMPTY STATE: Jab koi data na ho */
              <div className="text-center py-16 bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl p-8">
                <span className="text-4xl block mb-3">🛒</span>
                <h3 className="text-lg font-bold text-white">No Orders Placed Yet</h3>
                <p className="text-gray-400 text-sm mt-1">When you buy an artwork, your purchase history will appear here.</p>
              </div>
            ) : (
              orders.map((order) => (
                <div key={order._id} className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl p-6 shadow-xl">
                  <div className="flex justify-between items-center border-b border-[#2a2a2a] pb-4 mb-4">
                    <div>
                      <span className="text-xs text-gray-500 uppercase tracking-wider font-bold">Order Number</span>
                      <p className="text-purple-400 font-mono text-sm">{order._id}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusStyle(order.status)}`}>
                      • {order.status}
                    </span>
                  </div>

                  {order.items?.map((item, index) => (
                    <div key={index} className="flex items-center gap-4 py-2">
                      <img src={item.image} alt={item.title} className="w-16 h-16 object-cover rounded-xl border border-[#2a2a2a]" />
                      <div className="flex-1">
                        <h4 className="font-bold text-white text-base">{item.title}</h4>
                        <p className="text-xs text-gray-400">Quantity: {item.quantity || 1}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-emerald-400 font-bold">Rs {item.price?.toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;