import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const WISHLIST_API_URL = "http://localhost:5000/api/wishlist";

const Wishlist = () => {
  const navigate = useNavigate();
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchWishlist = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await axios.get(WISHLIST_API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data?.success && res.data?.data) {
        setWishlistItems(res.data.data);
      }
    } catch (err) {
      console.error("Error loading live wishlist objects:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  const removeItem = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `${WISHLIST_API_URL}/toggle`,
        { artworkId: id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data?.success) {
        setWishlistItems(wishlistItems.filter((item) => item._id !== id));
      }
    } catch (err) {
      console.error("Failed to remove target user item from wishlist:", err);
    }
  };

  const handleBuyNow = (item) => {
    navigate("/cart", { state: { directItem: item } });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#121212] text-purple-400 flex items-center justify-center font-bold text-lg">
        Syncing Saved Masterpieces... ✨
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#121212] text-white px-4 md:px-10 py-12 transition-all duration-300">
      <div className="max-w-7xl mx-auto">
        {/* HEADER SECTION */}
        <div className="mb-12 border-b border-[#2a2a2a] pb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-4xl font-extrabold text-white flex items-center gap-2">❤️ My Saved Wishlist</h1>
            <p className="text-gray-400 mt-2 text-sm md:text-base">
              Review or instantly checkout your saved masterpieces.
            </p>
          </div>
          <Link
            to="/buyer/dashboard"
            className="border border-[#3a3a3a] text-gray-300 bg-transparent px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-[#1a1a1a] hover:text-white transition duration-200 shadow-sm"
          >
            ← Dashboard
          </Link>
        </div>

        {/* MAIN CONDITIONAL RENDER */}
        {wishlistItems.length === 0 ? (
          <div className="bg-[#1a1a1a] rounded-2xl p-12 border border-[#2a2a2a] text-center text-gray-400 shadow-xl max-w-md mx-auto mt-10">
            <div className="text-5xl mb-4">🛒</div>
            <h3 className="text-xl font-bold text-white mb-2">Your Wishlist is Empty</h3>
            <p className="text-sm text-gray-400 mb-6">Explore our store to save amazing art pieces.</p>
            <Link
              to="/explore"
              className="px-5 py-2.5 bg-purple-600 text-white font-bold rounded-xl hover:bg-purple-700 transition inline-block text-sm"
            >
              Discover Artworks
            </Link>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {wishlistItems.map((item) => (
              <div
                key={item._id}
                className="bg-[#1a1a1a] rounded-2xl overflow-hidden border border-[#2a2a2a] shadow-xl hover:shadow-purple-900/10 hover:border-purple-500/30 transition duration-300 flex flex-col justify-between"
              >
                {/* Image Wrap */}
                <div className="h-56 overflow-hidden relative bg-[#0a0a0a]">
                  <img
                    src={item.image?.startsWith("http") ? item.image : `http://localhost:5000${item.image}`}
                    alt={item.title}
                    className="w-full h-full object-cover hover:scale-105 transition duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md text-purple-400 font-bold text-xs px-3 py-1 rounded-full border border-purple-500/20 uppercase tracking-wider">
                    {item.category}
                  </div>
                </div>

                {/* Content Box */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-white line-clamp-1 mb-1">{item.title}</h3>
                    <span className="text-emerald-400 font-extrabold text-base block mb-4">
                      Rs {item.price?.toLocaleString()}
                    </span>
                  </div>

                  {/* Actions Row */}
                  <div className="flex items-center gap-3 pt-3 border-t border-[#2a2a2a]">
                    <button
                      onClick={() => handleBuyNow(item)}
                      className="flex-2 bg-purple-600 text-white text-center py-2 px-4 rounded-xl text-xs font-bold hover:bg-purple-700 shadow-md shadow-purple-600/10 transition duration-200"
                    >
                      Buy Now 🛍️
                    </button>
                    <button
                      onClick={() => removeItem(item._id)}
                      className="flex-1 bg-red-500/10 text-red-500 border border-red-500/20 py-2 px-3 rounded-xl text-xs font-bold hover:bg-red-500 hover:text-white transition duration-200"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;