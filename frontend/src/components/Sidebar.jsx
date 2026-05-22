import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { path: "/adminDashboard", label: "Dashboard", icon: "📊" },
    { path: "/admin/users", label: "User Management", icon: "👥" },
    { path: "/admin/artwork-approvals", label: "Artwork Approvals", icon: "🎨" },
    { path: "/admin/orders", label: "Orders & Escrow", icon: "💼" },
    { path: "/admin/artist-verifications", label: "Artist Verifications", icon: "🛡️" },
    { path: "/admin/settings", label: "System Settings", icon: "⚙️" },
  ];

  // // System Logout Engine
  // const handleLogout = () => {
  //   localStorage.removeItem("token");
  //   localStorage.removeItem("role");
  //   localStorage.clear();
  //   navigate("/adminLogin");
  // };

  return (
    <div className="h-screen w-64 bg-[#111117] border-r border-white/5 flex flex-col justify-between p-6 fixed left-0 top-0 z-50 select-none">
      <div>
        {/* Brand Header */}
        <div className="flex items-center gap-2 mb-8 px-2">
          <span className="text-2xl">🎨</span>
          <div>
            <h2 className="text-lg font-bold text-white tracking-wide">Artistry<span className="text-purple-500">Pro</span></h2>
            <span className="text-[10px] font-bold text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded uppercase block mt-0.5 w-max">
              Admin Control
            </span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-1.5">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition ${
                  isActive
                    ? "bg-purple-600 text-white shadow-lg shadow-purple-600/10"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <span>{item.icon}</span>
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer Profile Control & Logout */}
      <div className="border-t border-white/5 pt-4 space-y-3">
        
        {/* ✅ FIXED: Super Admin profile block is now fully clickable and navigates to settings */}
        <div 
          onClick={() => navigate("/admin/settings")}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-xl border transition cursor-pointer group ${
            location.pathname === "/admin/settings"
              ? "bg-purple-600/10 border-purple-500/30 text-white"
              : "border-transparent hover:bg-white/5 text-gray-300 hover:text-white"
          }`}
          title="Open System Settings"
        >
          <div className="h-9 w-9 rounded-full bg-purple-600/20 text-purple-400 flex items-center justify-center font-bold text-sm border border-purple-500/20 group-hover:bg-purple-600 group-hover:text-white transition duration-200">
            AD
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-xs font-bold truncate group-hover:text-purple-400 transition duration-200">
              Super Admin
            </h4>
            <span className="text-[10px] text-emerald-400 font-medium flex items-center gap-1 mt-0.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 inline-block animate-pulse"></span> Root Secure
            </span>
          </div>
          <span className="text-gray-600 group-hover:text-gray-400 text-xs transition">⚙️</span>
        </div>

       
      </div>
    </div>
  );
};

export default Sidebar;