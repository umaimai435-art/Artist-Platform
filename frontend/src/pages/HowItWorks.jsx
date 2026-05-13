import React from "react";
import { useNavigate } from "react-router-dom";

const HowItWorks = () => {
  const navigate = useNavigate();

  const steps = [
    { title: "Create Account", desc: "Sign up as an artist and set up your portfolio." },
    { title: "Upload Artwork", desc: "Upload high-quality images of your paintings or sketches." },
    { title: "Set Your Price", desc: "Choose a fair price for your work and list it for sale." },
    { title: "Earn Money", desc: "Get paid safely when a collector buys your masterpiece." }
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-50 via-white to-pink-50 py-16 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">How Artistry Pro Works</h1>
        <p className="text-gray-600 mb-12">Turning your creativity into a professional business is easy.</p>

        <div className="grid md:grid-cols-2 gap-8 text-left">
          {steps.map((step, index) => (
            <div key={index} className="bg-white p-8 rounded-2xl shadow-md border border-purple-100">
              <span className="text-purple-700 font-bold text-xl block mb-2">0{index + 1}.</span>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-500">{step.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <button 
            onClick={() => navigate("/start-selling")}
            className="bg-purple-700 text-white px-8 py-3 rounded-xl font-bold hover:bg-purple-800 transition cursor-pointer"
          >
            Got it, Let's Start
          </button>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;