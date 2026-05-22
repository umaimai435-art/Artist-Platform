import { useState, useEffect } from "react";
import axios from "axios";

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("All");
  
  // Real-time notification data store karne ke liye state
  const [notification, setNotification] = useState(null);

  // 1. Database se Live Users Fetch karne ka function
  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token"); // Auth verification ke liye token
      const response = await axios.get("http://localhost:5000/api/admin/users", {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (response.data && response.data.success) {
        setUsers(response.data.data || []);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // 2. User Block/Unblock (Status Toggle) karne ka function
  const toggleStatus = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(`http://localhost:5000/api/admin/users/toggle/${id}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data && response.data.success) {
        const updatedUser = response.data.data;
        
        // State ko frontend par update karna taake refresh na karna pare (Auto-data update)
        setUsers(users.map(user => 
          user._id === id ? { ...user, status: updatedUser.status } : user
        ));

        // Real-time informative popup notification trigger karna
        setNotification(`User status successfully changed to ${updatedUser.status || "Active"}`);
        setTimeout(() => setNotification(null), 3000); // 3 seconds baad automatic remove
      }
    } catch (error) {
      console.error("Error updating user status:", error);
      alert("Failed to update status");
    }
  };

  // 3. Search aur Filter Logic
  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
      user.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === "All" || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  // Overview Panel Stats calculate karna (Real-time tracking)
  const totalUsers = users.length;
  const totalArtists = users.filter(u => u.role === "Artist").length;
  const totalBuyers = users.filter(u => u.role === "Buyer").length;

  return (
    <div className="p-8 relative z-10 font-sans antialiased text-gray-100">
      
      {/* Real-time Dynamic Popup Notification */}
      {notification && (
        <div className="fixed top-5 right-5 bg-purple-600 text-white text-xs font-bold px-5 py-3 rounded-xl shadow-2xl border border-purple-400/20 animate-bounce z-50">
          ✨ {notification}
        </div>
      )}

      {/* Page Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">User Management</h1>
          <p className="text-gray-400 text-sm">Control and monitor all registered accounts</p>
        </div>
        
        {/* Filters Dashboard Panel Elements */}
        <div className="flex gap-4">
          <input 
            type="text" 
            placeholder="Search user..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-[#141416] border border-gray-800 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-purple-500"
          />
          <select 
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="bg-[#141416] border border-gray-800 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-purple-500"
          >
            <option value="All">All Roles</option>
            <option value="Artist">Artist</option>
            <option value="Buyer">Buyer</option>
          </select>
        </div>
      </div>

      {/* New Informative Stats Overview Grid (Khudi updates value) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-[#141416] border border-gray-800 p-4 rounded-xl">
          <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Total Registered</p>
          <p className="text-2xl font-bold text-white mt-1">{totalUsers} Users</p>
        </div>
        <div className="bg-[#141416] border border-gray-800 p-4 rounded-xl">
          <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Active Artists</p>
          <p className="text-2xl font-bold text-blue-400 mt-1">{totalArtists} Sellers</p>
        </div>
        <div className="bg-[#141416] border border-gray-800 p-4 rounded-xl">
          <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Total Buyers</p>
          <p className="text-2xl font-bold text-purple-400 mt-1">{totalBuyers} Clients</p>
        </div>
      </div>

      {/* Loading Controller Logic Switch */}
      {loading ? (
        <div className="text-center py-12 text-gray-500">Loading users data...</div>
      ) : (
        <div className="bg-[#141416] rounded-2xl border border-gray-800 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-800 text-gray-400 text-sm">
                <th className="p-4 font-medium">User Info</th>
                <th className="p-4 font-medium">Email Address</th>
                <th className="p-4 font-medium">Assigned Role</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center p-8 text-gray-500">No users found.</td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user._id} className="border-b border-gray-800/50 text-sm hover:bg-[#1f1f22]/30 transition-colors">
                    <td className="p-4 font-semibold">{user.name}</td>
                    <td className="p-4 text-gray-400">{user.email}</td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${user.role === 'Artist' ? 'bg-blue-600/10 text-blue-400' : 'bg-purple-600/10 text-purple-400'}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`flex items-center gap-2 ${user.status === 'Blocked' ? 'text-red-400' : 'text-green-400'}`}>
                        <span className={`w-2 h-2 rounded-full ${user.status === 'Blocked' ? 'bg-red-400' : 'bg-green-400'}`}></span>
                        {user.status || "Active"}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <button 
                        onClick={() => toggleStatus(user._id)}
                        className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                          user.status === 'Blocked' 
                            ? 'bg-green-600/10 text-green-400 hover:bg-green-600 hover:text-white' 
                            : 'bg-red-600/10 text-red-400 hover:bg-red-600 hover:text-white'
                        }`}
                      >
                        {user.status === 'Blocked' ? 'Unblock' : 'Block'}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}