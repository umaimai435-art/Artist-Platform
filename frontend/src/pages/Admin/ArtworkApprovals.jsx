import { useState, useEffect } from "react";
import axios from "axios";

export default function ArtworkApprovals() {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const API_BASE_URL = "http://localhost:5000"; 

  // ==========================================
  // FETCH PENDING ARTWORKS
  // ==========================================
  useEffect(() => {
    const fetchPendingArtworks = async () => {
      try {
        const token = localStorage.getItem("token");
        
        if (!token) {
          setError("No token found. Please login as Admin first.");
          setLoading(false);
          return;
        }

        const response = await axios.get(`${API_BASE_URL}/api/artworks/admin/pending`, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}` // Sahi space aur structure ke sath
          },
        });

        if (response.data.success) {
          setArtworks(response.data.artworks);
        }
      } catch (err) {
        console.error("Error fetching pending artworks:", err);
        setError(err.response?.data?.message || "Invalid token or session expired.");
      } finally {
        setLoading(false);
      }
    };

    fetchPendingArtworks();
  }, []);

  // ==========================================
  // APPROVE ARTWORK ACTION
  // ==========================================
  const handleApprove = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.patch(
        `${API_BASE_URL}/api/artworks/${id}/approve`,
        {},
        {
          headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}` 
          },
        }
      );

      if (response.data.success) {
        setArtworks(artworks.filter((art) => art._id !== id));
        alert("Artwork approved successfully! 🎉");
      }
    } catch (err) {
      console.error("Approval error:", err);
      alert(err.response?.data?.message || "Failed to approve artwork.");
    }
  };

  // ==========================================
  // REJECT ARTWORK ACTION
  // ==========================================
  const handleReject = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.patch(
        `${API_BASE_URL}/api/artworks/${id}/reject`,
        {},
        {
          headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}` 
          },
        }
      );

      if (response.data.success) {
        setArtworks(artworks.filter((art) => art._id !== id));
        alert("Artwork has been rejected! ❌");
      }
    } catch (err) {
      console.error("Rejection error:", err);
      alert(err.response?.data?.message || "Failed to reject artwork.");
    }
  };

  if (loading) {
    return (
      <div className="p-8 text-center text-gray-400 font-sans">
        <p className="text-lg animate-pulse">Loading pending submissions... ⏳</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center font-sans">
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl inline-block max-w-md">
          <p className="font-semibold mb-2">{error}</p>
          <button 
            onClick={() => window.location.href = "/login"} // Redirect option
            className="mt-2 text-xs bg-red-500 text-white px-3 py-1.5 rounded-lg font-medium hover:bg-red-600 transition"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 relative z-10 font-sans antialiased text-gray-100">
      <div className="mb-8 border-b border-white/5 pb-5">
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          Artwork <span className="text-purple-500">Approvals</span>
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          Review new artwork submissions before they go live
        </p>
      </div>

      {artworks.length === 0 ? (
        <div className="bg-[#111117] rounded-2xl border border-white/5 p-12 text-center text-gray-500 shadow-xl">
          No pending artwork approvals.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {artworks.map((art) => (
            <div 
              key={art._id} 
              className="bg-[#111117] border border-white/5 rounded-2xl overflow-hidden flex flex-col shadow-xl hover:border-purple-500/30 transition duration-300 group"
            >
              <div className="w-full h-48 overflow-hidden bg-black/20 border-b border-white/5">
                <img 
                  src={art.image.startsWith("http") ? art.image : `${API_BASE_URL}${art.image}`} 
                  alt={art.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500" 
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/300?text=No+Image+Found";
                  }}
                />
              </div>
              
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-lg text-white tracking-wide">{art.title}</h3>
                  <p className="text-sm text-purple-400 font-medium mt-0.5">
                    By {art.artist?.name || "Unknown Artist"}
                  </p>
                  <p className="text-2xl font-black text-white tracking-tight mt-3">${art.price}</p>
                </div>
                
                <div className="flex gap-3 mt-5">
                  <button 
                    onClick={() => handleReject(art._id)}
                    className="flex-1 py-2 bg-red-500/5 hover:bg-red-500/10 text-red-400 font-medium rounded-xl text-xs transition border border-red-500/10"
                  >
                    Reject
                  </button>
                  <button 
                    onClick={() => handleApprove(art._id)}
                    className="flex-1 py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl text-xs shadow-lg shadow-purple-600/15 transition-all duration-200"
                  >
                    Approve
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}