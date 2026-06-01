import React, { useState, useEffect } from "react";
import axios from "axios";

export default function MyArtworks() {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorInfo, setErrorInfo] = useState(null);

  // =====================
  // FETCH LIVE DATA FROM DB
  // =====================
  const fetchMyArtworks = async () => {
    try {
      setLoading(true);
      setErrorInfo(null);
      const token = localStorage.getItem("token");

      if (!token) {
        setErrorInfo("Authorization token missing. Please log in again.");
        setLoading(false);
        return;
      }

      const response = await axios.get(
        "http://localhost:5000/api/artworks/my", 
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Backend payload structure standard backup syncing
      if (response.data && response.data.artworks && Array.isArray(response.data.artworks)) {
        setArtworks(response.data.artworks);
      } else if (response.data && Array.isArray(response.data)) {
        setArtworks(response.data);
      } else if (response.data?.success && Array.isArray(response.data.data)) {
        setArtworks(response.data.data);
      } else {
        setArtworks([]);
      }
    } catch (error) {
      console.error("Failed to fetch artworks:", error);
      setErrorInfo(error.response?.data?.message || "Unable to sync live data from the server.");
      setArtworks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyArtworks();
  }, []);

  // =====================
  // DELETE ARTWORK LOGIC
  // =====================
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this artwork?")) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/artworks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Filter state locally for instantaneous visual update
      setArtworks((prev) => prev.filter((art) => art._id !== id));
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete artwork from database.");
    }
  };

  return (
    <div className="bg-[#0d0d0f] min-h-screen text-white p-6">
      {/* HEADER */}
      <div className="mb-8 border-b border-gray-800 pb-6">
        <h1 className="text-3xl font-bold mb-2">🎨 My Artworks Gallery</h1>
        <p className="text-gray-400 text-sm">
          Your uploaded masterpieces appear here in real-time.
        </p>
      </div>

      {errorInfo && (
        <div className="bg-red-600/10 border border-red-500/20 text-red-400 p-3 rounded-xl mb-6 text-xs">
          ⚠️ {errorInfo}
        </div>
      )}

      {loading ? (
        <p className="text-purple-400 text-sm font-semibold">Fetching your direct collections... ⏱️</p>
      ) : artworks.length === 0 ? (
        <div className="text-center py-12 border border-dashed border-gray-800 rounded-2xl text-gray-500">
          <p className="text-base mb-1">No artwork live inside your gallery portfolio.</p>
          <p className="text-xs text-gray-600">Go to Upload tab to launch your first art piece!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {artworks.map((art) => {
            // Mongoose Schema utilizes 'image' key
            const rawImage = art.image || art.imageUrl || "";
            const finalImageUrl = rawImage.startsWith("http")
              ? rawImage
              : `http://localhost:5000/${rawImage}`;

            return (
              <div
                key={art._id}
                className="bg-[#141416] border border-gray-800 rounded-2xl overflow-hidden flex flex-col justify-between shadow-lg"
              >
                <div>
                  <div className="h-48 w-full bg-[#1c1c1f] flex items-center justify-center overflow-hidden">
                    <img
                      src={finalImageUrl}
                      alt={art.title}
                      className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                      onError={(e) => { e.target.src = "https://via.placeholder.com/400x300?text=Artwork+Image"; }}
                    />
                  </div>

                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h2 className="font-bold text-lg text-white truncate max-w-180px">{art.title}</h2>
                      <span className="text-[10px] bg-purple-900/40 text-purple-400 border border-purple-500/20 px-2 py-0.5 rounded-full font-medium">
                        {art.category || "General"}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 mb-4 line-clamp-2">
                      {art.description || "No description provided."}
                    </p>
                  </div>
                </div>

                <div className="p-4 pt-0">
                  <div className="flex justify-between items-center mb-3">
                    <p className="text-green-400 font-extrabold text-base">
                      Rs {art.price?.toLocaleString()}
                    </p>
                    <span className={`text-[11px] font-bold ${art.isSold ? "text-red-500" : "text-emerald-400"}`}>
                      {art.isSold ? "● SOLD" : "● AVAILABLE"}
                    </span>
                  </div>

                  <button
                    onClick={() => handleDelete(art._id)}
                    className="w-full py-2 bg-red-600/10 hover:bg-red-600 text-red-400 hover:text-white rounded-xl text-xs font-bold transition-colors duration-200"
                  >
                    Remove Artwork
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}