import React from "react";
import { useNavigate } from "react-router-dom";

const CheckEmail = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-50 via-white to-pink-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white/80 backdrop-blur-md border border-purple-100 shadow-2xl rounded-2xl p-10 text-center">
        
        {/* ICON */}
        <div className="text-6xl mb-6 animate-bounce">📩</div>

        {/* HEADING */}
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Check Your Email
        </h1>

        {/* DESCRIPTION */}
        <p className="text-gray-600 mb-8 leading-relaxed">
          Humne aapki email par ek **verification link** bheja hai. 
          Apna account activate karne ke liye please us link par click karein.
        </p>

        {/* ACTION BUTTONS */}
        <div className="space-y-4">
          <button 
            onClick={() => window.open("https://mail.google.com/", "_blank")}
            className="w-full bg-purple-700 text-white py-3 rounded-xl font-semibold hover:bg-purple-800 transition shadow-lg cursor-pointer"
          >
            Open Gmail
          </button>

          <button 
            onClick={() => navigate("/login")}
            className="w-full border border-gray-300 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-50 transition cursor-pointer"
          >
            Back to Login
          </button>
        </div>

        {/* FOOTER */}
        <p className="mt-8 text-sm text-gray-400">
          Email nahi mili? Spam folder check karein ya thoda intezar karein.
        </p>
      </div>
    </div>
  );
};

export default CheckEmail;