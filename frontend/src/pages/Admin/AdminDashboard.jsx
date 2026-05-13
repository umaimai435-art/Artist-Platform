// import { useNavigate } from "react-router-dom";
// import { FaUsers, FaPalette, FaImages, FaSignOutAlt, FaHome } from "react-icons/fa";

// const AdminDashboard = () => {
//   const navigate = useNavigate();

//   const logout = () => {
//     localStorage.clear();
//     navigate("/admin/login");
//   };

//   return (
//     <div className="min-h-screen flex bg-gray-100">
      
//       {/* Sidebar */}
//       <div className="w-64 bg-gray-900 text-white p-6">
//         <h2 className="text-2xl font-extrabold mb-10">
//           🎨 Admin Panel
//         </h2>

//         <div className="space-y-5">
//           <button onClick={() => navigate("/")} className="flex items-center gap-3 hover:text-gray-300">
//             <FaHome /> Home
//           </button>

//           <button onClick={() => navigate("/admin/users")} className="flex items-center gap-3 hover:text-gray-300">
//             <FaUsers /> Users
//           </button>

//           <button onClick={() => navigate("/admin/artists")} className="flex items-center gap-3 hover:text-gray-300">
//             <FaPalette /> Artists
//           </button>

//           <button onClick={() => navigate("/admin/artworks")} className="flex items-center gap-3 hover:text-gray-300">
//             <FaImages /> Artworks
//           </button>
//         </div>
//       </div>

//       {/* Main */}
//       <div className="flex-1">
        
//         {/* Topbar */}
//         <div className="bg-white shadow flex justify-between items-center px-6 py-4">
//           <h1 className="text-xl font-bold text-gray-700">
//             Dashboard Overview
//           </h1>

//           <button
//             onClick={logout}
//             className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
//           >
//             <FaSignOutAlt /> Logout
//           </button>
//         </div>

//         {/* Content */}
//         <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          
//           {/* Card 1 */}
//           <div className="bg-blue-600 text-white rounded-2xl p-6 shadow">
//             <FaUsers className="text-3xl mb-3" />
//             <h3 className="text-lg">Users</h3>
//             <p className="text-4xl font-bold">120</p>
//           </div>

//           {/* Card 2 */}
//           <div className="bg-purple-600 text-white rounded-2xl p-6 shadow">
//             <FaPalette className="text-3xl mb-3" />
//             <h3 className="text-lg">Artists</h3>
//             <p className="text-4xl font-bold">45</p>
//           </div>

//           {/* Card 3 */}
//           <div className="bg-pink-600 text-white rounded-2xl p-6 shadow">
//             <FaImages className="text-3xl mb-3" />
//             <h3 className="text-lg">Artworks</h3>
//             <p className="text-4xl font-bold">230</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;
const AdminDashboard = () => {
  return (
    <div className="min-h-screen flex bg-[#f8f7fb]">

      {/* SIDEBAR */}
      <div className="w-64 bg-white border-r p-6">

        <h2 className="text-xl font-semibold text-purple-700">
          Artistry Admin
        </h2>

        <div className="mt-10 space-y-4">

          <p className="cursor-pointer text-gray-700 hover:text-purple-700">
            Dashboard
          </p>

          <p className="cursor-pointer text-gray-700 hover:text-purple-700">
            Users
          </p>

          <p className="cursor-pointer text-gray-700 hover:text-purple-700">
            Artworks
          </p>

          <p className="cursor-pointer text-gray-700 hover:text-purple-700">
            Settings
          </p>

        </div>

      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 p-8">

        {/* HEADER */}
        <h1 className="text-3xl font-semibold text-gray-900">
          Admin Dashboard
        </h1>

        <p className="text-gray-500 mt-2">
          Manage artists, users, and artworks
        </p>

        {/* STATS */}
        <div className="grid md:grid-cols-3 gap-6 mt-8">

          <div className="bg-white border rounded-xl p-6 shadow-sm">
            <p className="text-gray-500">Total Users</p>
            <h3 className="text-2xl font-semibold text-purple-700">1,240</h3>
          </div>

          <div className="bg-white border rounded-xl p-6 shadow-sm">
            <p className="text-gray-500">Artworks</p>
            <h3 className="text-2xl font-semibold text-purple-700">560</h3>
          </div>

          <div className="bg-white border rounded-xl p-6 shadow-sm">
            <p className="text-gray-500">Revenue</p>
            <h3 className="text-2xl font-semibold text-purple-700">$12,400</h3>
          </div>

        </div>

        {/* TABLE SECTION */}
        <div className="mt-10 bg-white border rounded-xl p-6 shadow-sm">

          <h2 className="text-xl font-semibold mb-4">
            Recent Users
          </h2>

          <div className="space-y-3">

            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="flex justify-between border-b pb-2"
              >
                <p>User {item}</p>
                <p className="text-gray-500">user@email.com</p>
              </div>
            ))}

          </div>

        </div>

      </div>

    </div>
  );
};

export default AdminDashboard;