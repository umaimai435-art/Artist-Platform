// import { Link, useNavigate } from "react-router-dom";
// import { FaSignInAlt, FaUserPlus, FaHome } from "react-icons/fa";

// const Navbar = () => {
 
//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");
//   const role = localStorage.getItem("role");

//   const logout = () => {
//     localStorage.clear();
//     navigate("/login");
//   };

//   return ( <nav className="bg-purple-700 to-indigo-700 text-white px-8 py-4 shadow-lg">
   
//       <div className="max-w-7xl mx-auto flex justify-between items-center">
        
//         {/* Logo */}
//         <h1 className="text-2xl font-extrabold tracking-wide">
//           <Link to="/" className="hover:text-gray-200 transition">
//             🎨 ArtistryPro
//           </Link>
//         </h1>

//         {/* Links */}
//         <div className="flex items-center gap-6 text-sm font-medium">
//           <Link to="/" className="hover:text-gray-200 transition">
//             <FaHome/>
//           </Link>

//           {/* User not logged in */}
//           {!token && (
//             <>
//               <Link to="/login" className="hover:text-gray-200 transition">
//                 <FaSignInAlt/>
//               </Link>
//               <Link to="/register" className="hover:text-gray-200 transition">
//                 <FaUserPlus/>
//               </Link>

//               {/* Admin Login always visible */}
//             </>
//           )}
//               <Link
//                 to="/adminLogin"
//                 className="bg-black /80 px-4 py-1.5 rounded-md hover:bg-black transition"
//               >
//                 LogIn as Admin
//               </Link>

//           {/* Admin logged in */}
//           {token && role === "admin" && (
//             <Link
//               to="/adminDashboard"
//               className="bg-black/80 px-4 py-1.5 rounded-md hover:bg-black transition"
//             >
//               Admin Dashboard
//             </Link>
//           )}

//           {/* Logout */}
//           {token && (
//             <button
//               onClick={logout}
//               className="bg-red-500 px-4 py-1.5 rounded-md hover:bg-red-600 transition"
//             >
//               Logout
//             </button>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaSignInAlt, FaUserPlus, FaHome } from "react-icons/fa";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const token = localStorage.getItem("token");
  const userString = localStorage.getItem("user");
  
  let user = null;
  if (userString) {
    try {
      user = JSON.parse(userString);
    } catch (error) {
      console.error("Error parsing user from localStorage:", error);
    }
  }

  // Check karein ke kya user kisi bhi dashboard par hai
  const isDashboardPage = 
    location.pathname.includes("/adminDashboard") || 
    location.pathname.includes("/seller/dashboard") || 
    location.pathname.includes("/buyer/dashboard");

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="bg-purple-700 text-white px-8 py-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* Logo */}
        <h1 className="text-2xl font-extrabold tracking-wide">
          <Link to="/" className="hover:text-gray-200 transition">
            🎨 ArtistryPro
          </Link>
        </h1>

        {/* Links */}
        <div className="flex items-center gap-6 text-sm font-medium">
          
          {/* HOME ICON - Yeh hamesha har halat mein dikhega */}
          <Link to="/" className="hover:text-gray-200 transition text-base" title="Home">
            <FaHome />
          </Link>

          {/* ================= CONDITION 1: AGAR USER DASHBOARD PAR HAI ================= */}
          {isDashboardPage ? (
            <>
              {/* Dashboard par sirf Home (jo upar hai) aur yeh Logout button dikhega */}
              {token && (
                <button
                  onClick={logout}
                  className="bg-red-500 px-4 py-1.5 rounded-md hover:bg-red-600 transition font-semibold"
                >
                  Logout
                </button>
              )}
            </>
          ) : (
            // ================= CONDITION 2: AGAR USER NORMAL PAGES / HOME PAGE PAR HAI =================
            <>
              {/* User NOT logged in: Login aur Register icons dikhao */}
              {!token && (
                <>
                  <Link to="/login" className="hover:text-gray-200 transition text-base" title="Login">
                    <FaSignInAlt />
                  </Link>
                  <Link to="/register" className="hover:text-gray-200 transition text-base" title="Register">
                    <FaUserPlus />
                  </Link>

                  {/* Admin Login Button - Sirf tab dikhe jab koi bhi login na ho */}
                  <Link
                    to="/adminLogin"
                    className="bg-black/40 px-4 py-1.5 rounded-md hover:bg-black transition text-xs uppercase tracking-wider font-semibold border border-white/10"
                  >
                    LogIn as Admin
                  </Link>
                </>
              )}

              {/* Dynamic Dashboard Redirection Button - Agar logged in ho to uske relevant dashboard ka link dikhao */}
              {token && user && (
                <>
                  {user.role === "admin" && (
                    <Link
                      to="/adminDashboard"
                      className="bg-black/60 px-4 py-1.5 rounded-md hover:bg-black transition font-semibold"
                    >
                      Admin Dashboard
                    </Link>
                  )}
                  {user.role === "seller" && (
                    <Link
                      to="/seller/dashboard"
                      className="bg-black/60 px-4 py-1.5 rounded-md hover:bg-black transition font-semibold"
                    >
                      Seller Dashboard
                    </Link>
                  )}
                  {user.role === "buyer" && (
                    <Link
                      to="/buyer/dashboard"
                      className="bg-black/60 px-4 py-1.5 rounded-md hover:bg-black transition font-semibold"
                    >
                      Buyer Dashboard
                    </Link>
                  )}

                  {/* General Logout Button for normal pages */}
                  <button
                    onClick={logout}
                    className="bg-red-500 px-4 py-1.5 rounded-md hover:bg-red-600 transition font-semibold"
                  >
                    Logout
                  </button>
                </>
              )}
            </>
          )}

        </div>
      </div>
    </nav>
  );
};

export default Navbar;