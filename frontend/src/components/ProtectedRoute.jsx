// import { Navigate } from "react-router-dom";

// const ProtectedRoute = ({ children, adminOnly = false }) => {
//   const isLoggedIn = localStorage.getItem("token");
//   const role = localStorage.getItem("role"); // "user" or "admin"

//   if (!isLoggedIn) return <Navigate to="/login" />;

//   if (adminOnly && role !== "admin") {
//     return <Navigate to="/" />;
//   }

//   return children;
// };

// export default ProtectedRoute;
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, role }) => {
  const token = localStorage.getItem("token");
  const userString = localStorage.getItem("user"); // 👈 'role' ki jagah 'user' nikalein

  // ================= NOT LOGGED IN =================
  if (!token || !userString) {
    // Agar admin login kar raha tha to use adminLogin pe bhejein, baqiyon ko normal login pr
    return <Navigate to={role === "admin" ? "/adminLogin" : "/login"} replace />;
  }

  try {
    // ================= PARSE USER OBJECT =================
    const user = JSON.parse(userString);
    const userRole = user?.role; // 👈 Object ke andar se role nikalein

    // Debugging ke liye console (Aap inspect element mein check kar sakti hain)
    console.log("ProtectedRoute - Required Role:", role, "| User Role:", userRole);

    // ================= ROLE CHECK =================
    if (role && userRole !== role) {
      console.warn("Access Denied! Redirecting to Home...");
      return <Navigate to="/" replace />;
    }

    // ================= ALLOW ACCESS =================
    return children;
    
  } catch (error) {
    console.error("Error parsing user data from localStorage:", error);
    return <Navigate to="/login" replace />;
  }
};

export default ProtectedRoute;