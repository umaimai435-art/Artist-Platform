import { Link, useNavigate } from "react-router-dom";
import { FaSignInAlt, FaUserPlus, FaHome } from "react-icons/fa";

const Navbar = () => {
 
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return ( <nav className="bg-purple-700 to-indigo-700 text-white px-8 py-4 shadow-lg">
   
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* Logo */}
        <h1 className="text-2xl font-extrabold tracking-wide">
          <Link to="/" className="hover:text-gray-200 transition">
            🎨 ArtistryPro
          </Link>
        </h1>

        {/* Links */}
        <div className="flex items-center gap-6 text-sm font-medium">
          <Link to="/" className="hover:text-gray-200 transition">
            <FaHome/>
          </Link>

          {/* User not logged in */}
          {!token && (
            <>
              <Link to="/login" className="hover:text-gray-200 transition">
                <FaSignInAlt/>
              </Link>
              <Link to="/register" className="hover:text-gray-200 transition">
                <FaUserPlus/>
              </Link>

              {/* Admin Login always visible */}
            </>
          )}
              <Link
                to="/adminLogin"
                className="bg-black /80 px-4 py-1.5 rounded-md hover:bg-black transition"
              >
                LogIn as Admin
              </Link>

          {/* Admin logged in */}
          {token && role === "admin" && (
            <Link
              to="/adminDashboard"
              className="bg-black/80 px-4 py-1.5 rounded-md hover:bg-black transition"
            >
              Admin Dashboard
            </Link>
          )}

          {/* Logout */}
          {token && (
            <button
              onClick={logout}
              className="bg-red-500 px-4 py-1.5 rounded-md hover:bg-red-600 transition"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;