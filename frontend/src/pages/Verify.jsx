import { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

export default function VerifyOtp() {
  const location = useLocation();
  const navigate = useNavigate();

  const [email, setEmail] = useState(location.state?.email || "");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(""); 

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setStatus("");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/verify-otp",
        { email, otp }
      );

      setMessage("✅ " + res.data.message);
      setStatus("success");

      setTimeout(() => {
        navigate("/login");
      }, 2000);

    } catch (err) {
      setMessage("❌ " + (err.response?.data?.message || "Verification failed"));
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg from-purple-50 to-pink-50 px-4">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-3xl p-10 border border-purple-100">
        
        <div className="text-center text-5xl mb-4">🔐</div>

        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Verify Your Email
        </h2>
        <p className="text-center text-gray-500 mb-8">
A 6-digit code has been sent to your email. Check and verify it!        </p>

        {message && (
          <div className={`text-center p-3 rounded-lg mb-6 text-sm font-medium ${
            status === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
          }`}>
            {message}
          </div>
        )}

        <form onSubmit={handleVerify} className="space-y-5">
          <div>
            <label className="text-sm font-semibold text-gray-600 ml-1">Email Address</label>
            <input
              type="email"
              placeholder="name@example.com"
              className="w-full mt-1 border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none transition text-black"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-600 ml-1">Enter 6-Digit OTP</label>
            <input
              type="text"
              placeholder="· · · · · ·"
              className="w-full mt-1 border border-gray-200 p-3 rounded-xl tracking-[1em] text-center text-2xl font-bold focus:ring-2 focus:ring-purple-500 outline-none transition text-black"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              maxLength="6"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-4 rounded-xl font-bold text-white shadow-lg transition transform active:scale-95 ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-purple-700 hover:bg-purple-800"
            }`}
          >
            {loading ? "Verifying..." : "Verify & Activate"}
          </button>
        </form>
      </div>
    </div>
  );
}