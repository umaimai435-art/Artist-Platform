import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminDashboard = () => {
  const navigate = useNavigate();

  // State Management for Dynamic Data
  const [stats, setStats] = useState({
    totalUsers: 0,
    liveArtworks: 0,
    platformVolume: 0,
    pendingActions: 0,
  });
  const [recentUsers, setRecentUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch Real Data from Backend
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };

        // Note: Endpoints aapki backend routes ke mutabik change ho sakte hain
        const statsRes = await axios.get("http://localhost:5000/api/admin/stats", config);
        const usersRes = await axios.get("http://localhost:5000/api/admin/recent-users", config);

        if (statsRes.data.success) setStats(statsRes.data.stats);
        if (usersRes.data.success) setRecentUsers(usersRes.data.users);
        
        setLoading(false);
      } catch (error) {
        console.error("Dashboard data fetch karne mein error:", error);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Handle Logout Function
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-purple-500 font-semibold bg-[#0c0c0e]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-purple-500 mr-3"></div>
        Loading System Overview...
      </div>
    );
  }

  return (
    <div className="p-8 relative z-10 font-sans antialiased text-gray-100">
      
      {/* Background Subtle Glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-600 opacity-[0.03] blur-[150px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-indigo-600 opacity-[0.03] blur-[150px] rounded-full pointer-events-none"></div>

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-8 border-b border-white/5 pb-5">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            System <span className="text-purple-500">Overview</span>
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Real-time monitoring, content moderation, and marketplace controls.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          <button 
            onClick={() => navigate("/")}
            className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 bg-indigo-500/5 hover:bg-indigo-500/10 border border-indigo-500/10 px-4 py-2 rounded-xl transition flex items-center gap-1.5"
          >
            🏠 Go to Home
          </button>

          <div className="flex items-center gap-2 text-xs text-gray-400 font-medium bg-[#111117] border border-white/5 px-3 py-2 rounded-lg">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Live System State
          </div>

          <button 
            onClick={handleLogout}
            className="text-xs font-semibold text-red-400 hover:text-red-300 bg-red-500/5 hover:bg-red-500/10 border border-red-500/10 px-4 py-2 rounded-xl transition flex items-center gap-1.5"
          >
            🛑 Logout
          </button>
        </div>
      </div>

      {/* STATS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        
        <div className="bg-[#111117] border border-white/5 rounded-2xl p-6 shadow-xl relative overflow-hidden group hover:border-purple-500/30 transition duration-300">
          <div className="flex justify-between items-start mb-4">
            <p className="text-sm font-medium text-gray-400">Total Platform Users</p>
            <span className="text-lg bg-purple-500/10 p-2 rounded-xl text-purple-400">👥</span>
          </div>
          <h3 className="text-3xl font-bold text-white tracking-tight">{stats.totalUsers}</h3>
          <p className="text-xs text-emerald-400 mt-2 flex items-center gap-1 font-medium">
            <span>↑ Dynamic</span> <span className="text-gray-500 font-normal">live users</span>
          </p>
        </div>

        <div className="bg-[#111117] border border-white/5 rounded-2xl p-6 shadow-xl relative overflow-hidden group hover:border-purple-500/30 transition duration-300">
          <div className="flex justify-between items-start mb-4">
            <p className="text-sm font-medium text-gray-400">Live Artworks</p>
            <span className="text-lg bg-indigo-500/10 p-2 rounded-xl text-indigo-400">🎨</span>
          </div>
          <h3 className="text-3xl font-bold text-white tracking-tight">{stats.liveArtworks}</h3>
          <p className="text-xs text-emerald-400 mt-2 flex items-center gap-1 font-medium">
            <span>Active</span> <span className="text-gray-500 font-normal">in exploration</span>
          </p>
        </div>

        <div className="bg-[#111117] border border-white/5 rounded-2xl p-6 shadow-xl relative overflow-hidden group hover:border-purple-500/30 transition duration-300">
          <div className="flex justify-between items-start mb-4">
            <p className="text-sm font-medium text-gray-400">Platform Volume</p>
            <span className="text-lg bg-emerald-500/10 p-2 rounded-xl text-emerald-400">💰</span>
          </div>
          <h3 className="text-3xl font-bold text-white tracking-tight">${stats.platformVolume}</h3>
          <p className="text-xs text-emerald-400 mt-2 flex items-center gap-1 font-medium">
            <span>Total</span> <span className="text-gray-500 font-normal">sales transactions</span>
          </p>
        </div>

        <div className="bg-[#111117] border border-white/5 rounded-2xl p-6 shadow-xl relative overflow-hidden group hover:border-purple-500/30 transition duration-300">
          <div className="flex justify-between items-start mb-4">
            <p className="text-sm font-medium text-gray-400">Pending Actions</p>
            <span className="text-lg bg-amber-500/10 p-2 rounded-xl text-amber-400">⚠️</span>
          </div>
          <h3 className="text-3xl font-bold text-white tracking-tight">{stats.pendingActions}</h3>
          <p className="text-xs text-amber-400 mt-2 flex items-center gap-1 font-medium">
            <span>Requires attention</span>
          </p>
        </div>

      </div>

      {/* DATA TABLE SECTION */}
      <div className="bg-[#111117] border border-white/5 rounded-2xl shadow-2xl overflow-hidden">
        
        <div className="px-6 py-5 border-b border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-white tracking-wide">
              Recent User Registrations
            </h2>
            <p className="text-xs text-gray-400 mt-0.5">
              Overview of newly registered accounts across roles.
            </p>
          </div>
          <button 
            onClick={() => navigate("/admin/users")}
            className="text-xs font-semibold text-purple-400 hover:text-purple-300 bg-purple-500/5 hover:bg-purple-500/10 border border-purple-500/10 px-4 py-2 rounded-xl transition"
          >
            View All Users
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 bg-black/10 text-xs font-semibold uppercase tracking-wider text-gray-400">
                <th className="px-6 py-4">User Info</th>
                <th className="px-6 py-4">Email Address</th>
                <th className="px-6 py-4">Assigned Role</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-sm text-gray-300">
              {recentUsers.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-10 text-center text-sm text-gray-500">
                    No recent users found.
                  </td>
                </tr>
              ) : (
                recentUsers.map((user) => (
                  <tr key={user._id || user.id} className="hover:bg-white/1 transition-colors">
                    <td className="px-6 py-4 font-semibold text-white">{user.name}</td>
                    <td className="px-6 py-4 text-gray-400 font-mono text-xs">{user.email}</td>
                    <td className="px-6 py-4">
                      <span className={`text-xs px-2.5 py-1 rounded-lg font-medium ${
                        user.role === "Artist" 
                          ? "bg-blue-500/10 text-blue-400 border border-blue-500/10" 
                          : "bg-indigo-500/10 text-indigo-400 border border-indigo-500/10"
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 text-xs font-semibold ${
                        user.status === "Active" || user.status === "active"
                          ? "text-emerald-400" 
                          : user.status === "Suspended" || user.status === "suspended"
                          ? "text-red-400" 
                          : "text-amber-400"
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          user.status === "Active" || user.status === "active"
                            ? "bg-emerald-400" 
                            : user.status === "Suspended" || user.status === "suspended"
                            ? "bg-red-400" 
                            : "bg-amber-400"
                        }`}></span>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button className="text-xs bg-white/5 hover:bg-white/10 text-white font-medium px-3 py-1.5 rounded-lg transition border border-white/5">
                          Manage
                        </button>
                        <button className="text-xs bg-red-500/5 hover:bg-red-500/10 text-red-400 font-medium px-3 py-1.5 rounded-lg transition border border-red-500/10">
                          Suspend
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

      </div>

    </div>
  );
};

export default AdminDashboard;