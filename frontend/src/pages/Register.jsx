import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "buyer",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (location.state?.role) {
      setForm((prev) => ({ ...prev, role: location.state.role }));
    }
  }, [location.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
      setMessage("❌ All fields are required");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const payload = {
        name: form.name.trim(),
        email: form.email.trim(),
        password: form.password,
        role: form.role,
      };

      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("REGISTER SUCCESS:", res.data);
      setMessage("✅ Registration successful! Sending OTP...");

      // 🔥 UPDATE: Passing email to VerifyOtp page
      setTimeout(() => {
        navigate("/verify-otp", { state: { email: form.email.trim() } });
      }, 2000);

    } catch (err) {
      console.log("REGISTER ERROR:", err);
      setMessage(
        err.response?.data?.message || "❌ Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-black px-4 relative overflow-hidden"
      style={{ background: "radial-gradient(circle at center, #171717 0%, #000000 100%)" }}
    >
      {/* Glow Effects */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-900 opacity-10 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-900 opacity-10 blur-[120px] rounded-full"></div>

      {/* CARD */}
      <div className="w-full max-w-md bg-neutral-900/40 backdrop-blur-2xl border border-white/5 shadow-2xl rounded-3xl p-10 relative z-10">

        {/* HEADER */}
        <div className="text-center mb-10">
          <h2 className="text-4xl font-black text-white uppercase tracking-tighter italic">
            Artistry <span className="text-purple-600">Pro.</span>
          </h2>
          <p className="text-neutral-500 text-xs mt-3 uppercase tracking-widest font-bold">
            Join as <span className="text-purple-400">{form.role}</span>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* NAME */}
          <input
            type="text"
            required
            placeholder="Full Name"
            className="w-full p-4 bg-neutral-800/30 text-white rounded-xl border border-neutral-700 focus:border-purple-600 outline-none transition"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          {/* EMAIL */}
          <input
            type="email"
            required
            placeholder="Email"
            className="w-full p-4 bg-neutral-800/30 text-white rounded-xl border border-neutral-700 focus:border-purple-600 outline-none transition"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          {/* PASSWORD */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              required
              placeholder="Password"
              className="w-full p-4 bg-neutral-800/30 text-white rounded-xl border border-neutral-700 focus:border-purple-600 outline-none transition"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-4 text-xs font-bold text-gray-500 uppercase hover:text-white"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          {/* ROLE SELECT */}
          <select
            className="w-full p-4 bg-neutral-800/50 text-white rounded-xl border border-neutral-700 focus:border-purple-600 outline-none cursor-pointer"
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
          >
            <option value="buyer">Buyer (Art Lover)</option>
            <option value="seller">Seller (Artist)</option>
          </select>

          {/* MESSAGE */}
          {message && (
            <p className={`text-center text-sm font-medium ${message.includes('✅') ? 'text-green-400' : 'text-red-400'}`}>
              {message}
            </p>
          )}

          {/* SUBMIT BUTTON */}
          <button
            disabled={loading}
            className="w-full bg-white text-black font-black p-4 rounded-xl hover:bg-purple-600 hover:text-white transition-all duration-300 disabled:opacity-50 uppercase tracking-widest shadow-lg shadow-purple-900/20"
          >
            {loading ? "Processing..." : "Create Account"}
          </button>
        </form>

        <div className="text-center mt-8">
          <Link to="/login" className="text-xs font-bold text-neutral-500 uppercase tracking-widest hover:text-purple-400 transition">
            Already have an account? <span className="text-white ml-1">Login</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;