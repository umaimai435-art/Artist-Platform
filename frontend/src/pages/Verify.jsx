import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function VerifyOtp() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/verify-otp",
        { email, otp }
      );

      setMessage(res.data.message);

      // redirect after success
      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (err) {
      setMessage(
        err.response?.data?.message || "Verification failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">

        {/* TITLE */}
        <h2 className="text-2xl font-bold text-center mb-2">
          Verify Your Email
        </h2>

        <p className="text-center text-gray-500 mb-6">
          Enter OTP sent to your email
        </p>

        {/* MESSAGE */}
        {message && (
          <div className="text-center text-sm mb-4 text-blue-600">
            {message}
          </div>
        )}

        <form onSubmit={handleVerify} className="space-y-4">

          {/* EMAIL */}
          <input
            type="email"
            placeholder="Enter Email"
            className="w-full border p-3 rounded-lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {/* OTP */}
          <input
            type="text"
            placeholder="Enter OTP"
            className="w-full border p-3 rounded-lg tracking-widest text-center"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>

        </form>
      </div>
    </div>
  );
}