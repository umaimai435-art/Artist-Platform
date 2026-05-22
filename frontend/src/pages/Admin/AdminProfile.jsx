import React, { useState } from "react";

const AdminProfile = () => {
  // Mock state for form fields
  const [adminData, setAdminData] = useState({
    name: "Super Admin",
    email: "admin@artistry.com",
    role: "Full Platform Access",
    currentPassword: "",
    newPassword: "",
  });

  const handleUpdate = (e) => {
    e.preventDefault();
    alert("Profile settings updated successfully!");
  };

  return (
    <div className="p-8 relative z-10 font-sans antialiased text-gray-100">
      
      {/* HEADER */}
      <div className="mb-8 border-b border-white/5 pb-5">
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          Admin <span className="text-purple-500">Profile</span>
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          Manage your personal account credentials and security settings.
        </p>
      </div>

      {/* PROFILE CARD & FORM */}
      <div className="max-w-2xl bg-[#111117] border border-white/5 rounded-2xl shadow-2xl p-6">
        
        {/* Avatar Display */}
        <div className="flex items-center gap-5 mb-8 pb-6 border-b border-white/5">
          <div className="w-20 h-20 rounded-2xl bg-purple-600 flex items-center justify-center text-3xl font-bold text-white shadow-xl shadow-purple-600/10">
            AD
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">{adminData.name}</h2>
            <p className="text-xs text-purple-400 font-semibold mt-0.5">{adminData.role}</p>
          </div>
        </div>

        {/* Update Form */}
        <form onSubmit={handleUpdate} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
              Full Name
            </label>
            <input 
              type="text" 
              value={adminData.name}
              onChange={(e) => setAdminData({...adminData, name: e.target.value})}
              className="w-full bg-[#09090d] border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-purple-500 transition"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
              Email Address
            </label>
            <input 
              type="email" 
              value={adminData.email}
              disabled
              className="w-full bg-[#09090d]/50 border border-white/5 rounded-xl px-4 py-3 text-sm text-gray-500 cursor-not-allowed"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-white/5">
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Current Password
              </label>
              <input 
                type="password" 
                placeholder="••••••••"
                value={adminData.currentPassword}
                onChange={(e) => setAdminData({...adminData, currentPassword: e.target.value})}
                className="w-full bg-[#09090d] border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-purple-500 transition"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                New Password
              </label>
              <input 
                type="password" 
                placeholder="Leave blank to keep current"
                value={adminData.newPassword}
                onChange={(e) => setAdminData({...adminData, newPassword: e.target.value})}
                className="w-full bg-[#09090d] border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-purple-500 transition"
              />
            </div>
          </div>

          <button 
            type="submit"
            className="w-full mt-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold text-sm py-3.5 rounded-xl shadow-lg shadow-purple-600/10 hover:shadow-purple-600/20 transition duration-300"
          >
            Save Profile Updates
          </button>
        </form>

      </div>
    </div>
  );
};

export default AdminProfile;