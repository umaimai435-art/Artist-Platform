import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const isLoggedIn = localStorage.getItem("token");
  const role = localStorage.getItem("role"); // "user" or "admin"

  if (!isLoggedIn) return <Navigate to="/login" />;

  if (adminOnly && role !== "admin") {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;