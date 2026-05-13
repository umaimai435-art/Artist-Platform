import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   setError("");

  //   try {
  //     const res = await axios.post("http://localhost:5000/api/admin/login", {
  //       email,
  //       password,
  //     });

  //     const token = res.data?.token;
  //     const user = res.data?.admin || res.data?.user;

  //     if (!user) {
  //       setError("Invalid server response");
  //       setLoading(false);
  //       return;
  //     }

  //     if (user.role !== "admin") {
  //       setError("Access denied. Admin only.");
  //       setLoading(false);
  //       return;
  //     }

  //     localStorage.setItem("adminToken", token);
  //     localStorage.setItem("adminUser", JSON.stringify(user));
  //     navigate("/adminDashboard");

  //   } catch (err) {
  //     setError(err.response?.data?.message || "Login failed");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post("http://localhost:5000/api/admin/adminLogin", {
        email,
        password,
      });

      console.log("ADMIN LOGIN RESPONSE:", res.data);

      const token = res.data?.token;
      const user = res.data?.user || res.data?.admin;

      if (!token || !user) {
        throw new Error("Invalid server response");
      }

      if (user.role !== "admin") {
        throw new Error("Access denied");
      }

      // ✅ Use SAME keys everywhere
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      if (user.role === "admin") {
        navigate("/adminDashboard");
      }
      console.log("ROLE:", user.role);
      // ✅ MUST match App.jsx route
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || "Admin login failed",
      );
    } finally {
      setLoading(false);
    }
  };
  
 return (
  <div
    className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#0b0b0f]"
  >
    {/* BACKGROUND GLOWS */}
    <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600 opacity-10 blur-[140px] rounded-full"></div>
    <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600 opacity-10 blur-[140px] rounded-full"></div>

    {/* CARD */}
    <div className="w-full max-w-md relative z-10">

      <div className="bg-[#111117] border border-white/10 rounded-3xl shadow-2xl backdrop-blur-xl p-10">

        {/* HEADER */}
        <div className="text-center mb-8">

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-600/10 border border-purple-500/20">
            <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></span>
            <span className="text-purple-400 text-xs font-semibold uppercase tracking-widest">
              Secure Admin Access
            </span>
          </div>

          <h2 className="text-4xl font-extrabold text-white mt-6 tracking-tight">
            Admin <span className="text-purple-500">Portal</span>
          </h2>

          <p className="text-gray-400 text-sm mt-2">
            Manage ArtistryPro dashboard securely
          </p>

        </div>

        {/* ERROR */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold p-3 rounded-xl mb-5 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">

          {/* EMAIL */}
          <div className="relative">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-black/40 border border-white/10 px-5 pt-6 pb-3 text-white rounded-xl focus:outline-none focus:border-purple-500 transition"
              placeholder=" "
            />
            <label className="absolute left-5 top-2 text-xs text-gray-500 uppercase tracking-widest">
              Admin Email
            </label>
          </div>

          {/* PASSWORD */}
          <div className="relative">
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-black/40 border border-white/10 px-5 pt-6 pb-3 text-white rounded-xl focus:outline-none focus:border-purple-500 transition"
              placeholder=" "
            />
            <label className="absolute left-5 top-2 text-xs text-gray-500 uppercase tracking-widest">
              Password
            </label>
          </div>

          {/* BUTTON */}
          <button
            disabled={loading}
            className="w-full py-4 rounded-xl font-bold text-black bg-white hover:bg-purple-600 hover:text-white transition-all active:scale-[0.98] shadow-lg"
          >
            {loading ? "Authenticating..." : "Login to Dashboard"}
          </button>

        </form>

        {/* FOOTER */}
        <div className="mt-8 text-center border-t border-white/10 pt-5">
          <Link
            to="/"
            className="text-gray-500 text-xs uppercase tracking-widest hover:text-white transition"
          >
            ← Back to Website
          </Link>
        </div>

      </div>
    </div>
  </div>
);
}
