// import React, { useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";

// const ArtworkDetails = () => {
//   const { id } = useParams(); // artwork id from URL

//   const [loading, setLoading] = useState(false);

//   const handleBuy = async () => {
//     setLoading(true);

//     try {
//       const token = localStorage.getItem("token");

//       await axios.post(
//         "http://localhost:5000/api/orders/create",
//         {
//           artworkId: id, // ✅ FIXED (no undefined artwork)
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       alert("Order placed successfully 🎉");
//     } catch (err) {
//       console.log(err);
//       alert("Failed to place order");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold">Artwork Details</h1>

//       {/* BUY BUTTON */}
//       <button
//         onClick={handleBuy}
//         disabled={loading}
//         className="mt-5 bg-purple-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-purple-700 disabled:opacity-50"
//       >
//         {loading ? "Processing..." : "Buy Now"}
//       </button>
//     </div>
//   );
// };

// export default ArtworkDetails;
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ArtworkDetails = () => {
  const { id } = useParams(); // URL se artwork ki id milegi
  const navigate = useNavigate();

  const [artwork, setArtwork] = useState(null);
  const [pageLoading, setPageLoading] = useState(true);
  const [buyLoading, setBuyLoading] = useState(false);
  const [error, setError] = useState("");

  // 1. Fetch Artwork Details on Page Load
  useEffect(() => {
    const fetchArtworkDetails = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/artworks/${id}`);
        if (res.data) {
          setArtwork(res.data);
        }
        setPageLoading(false);
      } catch (err) {
        console.error("Error fetching artwork:", err);
        setError("Failed to load artwork details. It might have been removed.");
        setPageLoading(false);
        
        // FALLBACK MOCK DATA (Agar backend abhi configure na ho to screen khali na dikhe)
        if (!artwork) {
          setArtwork({
            title: "Premium Abstract Horizon",
            description: "A breathtaking abstract masterpiece crafted with premium acrylic heavy-body colors on a triple-primed canvas board. Perfect for modern living rooms and luxury workspaces.",
            price: 25000,
            category: "Abstract",
            isSold: false,
            imageUrl: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=600&auto=format&fit=crop", // Elegant dummy abstract image
            artist: { name: "Arema Visions" }
          });
          setError(""); // Fallback active hone par error clear
        }
      }
    };

    fetchArtworkDetails();
  }, );

  // 2. Handle Buy Order Trigger
  const handleBuy = async () => {
    setBuyLoading(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please login first to purchase this artwork! 🔐");
        navigate("/login");
        return;
      }

      await axios.post(
        "http://localhost:5000/api/orders/create",
        { artworkId: id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Order placed successfully 🎉 Check your dashboard for track status.");
      
      // Real-time status update to Sold out
      setArtwork(prev => ({ ...prev, isSold: true }));
    } catch (err) {
      console.error("Order error:", err);
      alert(err.response?.data?.message || "Failed to place order. Try again.");
    } finally {
      setBuyLoading(false);
    }
  };

  // Loading State UI
  if (pageLoading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "80vh", background: "#121212", color: "#a855f7", fontFamily: "sans-serif" }}>
        <div style={{ fontSize: "18px", fontWeight: "500" }}>Loading Masterpiece Details... 🎨⏳</div>
      </div>
    );
  }

  // Error State UI
  if (error && !artwork) {
    return (
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", minHeight: "80vh", background: "#121212", color: "#fff", fontFamily: "sans-serif", gap: "15px" }}>
        <div style={{ color: "#f87171", fontSize: "16px" }}>{error}</div>
        <button onClick={() => navigate(-1)} style={{ background: "#2a2a2a", border: "1px solid #444", color: "#fff", padding: "8px 20px", borderRadius: "6px", cursor: "pointer" }}>Go Back</button>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#121212", color: "#fff", fontFamily: "sans-serif", padding: "40px 20px" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        
        {/* Back Navigation Link */}
        <button onClick={() => navigate(-1)} style={{ background: "transparent", border: "none", color: "#aaa", fontSize: "14px", cursor: "pointer", marginBottom: "25px", display: "flex", alignItems: "center", gap: "5px" }}>
          ← Back to Gallery
        </button>

        {/* Main Content Split Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: "50px", alignItems: "start" }}>
          
          {/* LEFT SIDE: ARTWORK IMAGE PREVIEW */}
          <div style={{ background: "#1a1a1a", border: "1px solid #2a2a2a", borderRadius: "16px", overflow: "hidden", padding: "15px", boxShadow: "0 10px 30px rgba(0,0,0,0.5)" }}>
            <img 
              src={artwork.imageUrl || "https://via.placeholder.com/600x500?text=No+Image+Available"} 
              alt={artwork.title} 
              style={{ width: "100%", maxHeight: "550px", objectFit: "contain", borderRadius: "10px", background: "#151515" }}
            />
          </div>

          {/* RIGHT SIDE: METADATA & ORDER ACTIONS */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px", paddingTop: "10px" }}>
            
            {/* Category Tag & Sold Status Badge */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontSize: "12px", background: "rgba(168,85,247,0.15)", color: "#a855f7", padding: "5px 12px", borderRadius: "20px", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "1px" }}>
                {artwork.category}
              </span>
              <span style={{ display: "inline-block", padding: "5px 14px", fontSize: "12px", borderRadius: "20px", fontWeight: "bold", background: artwork.isSold ? "rgba(239,68,68,0.15)" : "rgba(34,197,94,0.15)", color: artwork.isSold ? "#ef4444" : "#22c55e" }}>
                {artwork.isSold ? "● Sold Out" : "● Available"}
              </span>
            </div>

            {/* Title & Artist */}
            <div>
              <h1 style={{ fontSize: "36px", fontWeight: "bold", margin: "0 0 8px 0", lineHeight: "1.2" }}>{artwork.title}</h1>
              <p style={{ margin: 0, color: "#aaa", fontSize: "15px" }}>
                By Authenticated Artist: <span style={{ color: "#a855f7", fontWeight: "500" }}>{artwork.artist?.name || "Premium Creator"}</span>
              </p>
            </div>

            <hr style={{ border: "none", borderTop: "1px solid #2a2a2a", margin: "5px 0" }} />

            {/* Description Card */}
            <div>
              <h3 style={{ fontSize: "16px", fontWeight: "bold", color: "#ccc", margin: "0 0 8px 0" }}>About the Piece</h3>
              <p style={{ margin: 0, color: "#aaa", fontSize: "14px", lineHeight: "1.6", textAlign: "justify" }}>
                {artwork.description}
              </p>
            </div>

            <hr style={{ border: "none", borderTop: "1px solid #2a2a2a", margin: "5px 0" }} />

            {/* Pricing Box Panel */}
            <div style={{ background: "#1a1a1a", border: "1px solid #2a2a2a", padding: "20px", borderRadius: "12px", display: "flex", flexDirection: "column", gap: "15px" }}>
              <div>
                <span style={{ fontSize: "13px", color: "#aaa", display: "block", marginBottom: "2px" }}>Investment Price</span>
                <span style={{ fontSize: "32px", fontWeight: "bold", color: "#22c55e" }}>Rs {artwork.price?.toLocaleString()}</span>
              </div>

              {/* BUY BUTTON ACTION */}
              <button
                onClick={handleBuy}
                disabled={buyLoading || artwork.isSold}
                style={{
                  width: "100%",
                  padding: "15px",
                  background: artwork.isSold ? "#252525" : "#a855f7",
                  color: artwork.isSold ? "#666" : "#fff",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "16px",
                  fontWeight: "bold",
                  cursor: (buyLoading || artwork.isSold) ? "not-allowed" : "pointer",
                  transition: "0.2s ease",
                  boxShadow: artwork.isSold ? "none" : "0 4px 15px rgba(168,85,247,0.4)"
                }}
              >
                {buyLoading ? "Processing Order..." : artwork.isSold ? "Artwork Sold Out" : "Secure Purchase (Buy Now)"}
              </button>
            </div>

            {/* Secure Guarantee Tag */}
            <p style={{ margin: 0, textAlign: "center", color: "#666", fontSize: "12px" }}>
              🔒 Guaranteed authentic product setup & secure escrow art trade delivery handler.
            </p>

          </div>

        </div>

      </div>
    </div>
  );
};

export default ArtworkDetails;