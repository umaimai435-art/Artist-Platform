import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const { token, user } = res.data;

      // safety check (prevents crash)
      if (!token || !user) {
        throw new Error("Invalid server response");
      }

      // SAVE AUTH DATA
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // ROLE BASED REDIRECT
      if (user.role === "seller") {
        navigate("/seller/dashboard");
      } else {
        navigate("/buyer/dashboard");
      }

    } catch (err) {
      console.log("Login Error:", err);

      setError(
        err.response?.data?.message ||
        err.message ||
        "Login failed. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4 relative overflow-hidden">

      {/* Decorative Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-purple-600/20 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-80 h-80 bg-blue-900/10 blur-[100px] rounded-full"></div>

      {/* Card */}
      <div className="w-full max-w-md bg-neutral-900/50 backdrop-blur-xl border border-white/10 shadow-2xl rounded-2xl p-10 relative z-10">

        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-black text-white uppercase tracking-tighter">
            Access <span className="text-purple-500">ArtistryPro</span>
          </h2>
          <p className="text-gray-500 text-xs mt-2 uppercase tracking-widest font-bold">
            Sign in to your creative space
          </p>
        </div>

        {/* Error */}
        {error && (
          <p className="text-red-500 text-sm text-center mb-4">
            {error}
          </p>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-6">

          {/* Email */}
          <div className="relative">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="peer w-full bg-black/50 border border-white/10 px-4 pt-6 pb-2 text-white rounded-lg focus:outline-none focus:border-purple-500 placeholder-transparent"
              placeholder="Email"
            />
            <label className="absolute left-4 top-2 text-[10px] font-bold text-purple-500 uppercase tracking-widest">
              Email Address
            </label>
          </div>

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="peer w-full bg-black/50 border border-white/10 px-4 pt-6 pb-2 text-white rounded-lg focus:outline-none focus:border-purple-500 placeholder-transparent"
              placeholder="Password"
            />

            <label className="absolute left-4 top-2 text-[10px] font-bold text-purple-500 uppercase tracking-widest">
              Password
            </label>

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-4 text-[10px] font-black text-gray-400 uppercase hover:text-white transition"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-black font-black py-4 rounded-lg uppercase tracking-widest hover:bg-purple-600 hover:text-white transition disabled:bg-gray-600"
          >
            {loading ? "Authenticating..." : "Login"}
          </button>

        </form>

        {/* Footer */}
        <div className="mt-8 text-center border-t border-white/5 pt-8">
          <p className="text-gray-500 text-xs uppercase tracking-widest font-bold">
            Don&apos;t have an account?
            <Link
              to="/register"
              className="text-purple-500 hover:text-white ml-2 transition-colors"
            >
              Register
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
};

export default Login;