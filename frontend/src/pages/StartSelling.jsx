import { useNavigate } from "react-router-dom";

const StartSelling = () => {
  const navigate = useNavigate();

  const handleCreateAccount = () => {
    // Artist role ke saath register page par bhejna
    navigate("/register", { state: { role: "artist" } });
  };

  const handleLearnMore = () => {
    // "How it works" page par bhejna
    navigate("/how-it-works");
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-50 via-white to-pink-50 flex items-center justify-center px-6">
      <div className="max-w-xl bg-white/80 backdrop-blur border border-purple-100 rounded-2xl shadow-xl p-10 text-center">
        
        <div className="text-5xl">🎨</div>

        <h1 className="mt-4 text-3xl font-semibold text-gray-900">
          Sell Your Art
        </h1>

        <p className="mt-4 text-gray-600 leading-relaxed">
          Join Artistry Pro and turn your creativity into income.
          Upload your artwork, set your price, and reach collectors globally.
        </p>

        <div className="mt-8 space-y-3">
          <button 
            onClick={handleCreateAccount}
            className="w-full py-3 bg-purple-700 text-white rounded-xl font-medium hover:bg-purple-800 transition shadow-md active:scale-95 cursor-pointer"
          >
            Create Artist Account
          </button>

          <button 
            onClick={handleLearnMore}
            className="w-full py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-100 transition active:scale-95 cursor-pointer"
          >
            Learn How It Works
          </button>
        </div>

      </div>
    </div>
  );
};

export default StartSelling;