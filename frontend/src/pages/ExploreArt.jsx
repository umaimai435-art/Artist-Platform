import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const API_URL = "http://localhost:5000/api/artworks";
const WISHLIST_API_URL = "http://localhost:5000/api/wishlist";

const ExploreArtwork = () => {
  const [artworks, setArtworks] = useState([]);
  const [wishlistIds, setWishlistIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshTrigger, setRefreshTrigger] = useState(false);

  // Filters State
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const categories = [
    "All",
    "Abstract",
    "Landscape",
    "Portrait",
    "Modern",
    "Islamic",
    "Calligraphy",
    "Sketches",
  ];

  // Fetch current user's wishlist IDs to display filled/empty heart icons
  const fetchWishlistIds = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const res = await axios.get(WISHLIST_API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data?.success && res.data?.data) {
        setWishlistIds(res.data.data.map((item) => item._id));
      }
    } catch (err) {
      console.error("Error fetching wishlist IDs:", err);
    }
  };

  // Fetch masterpieces based on active search parameters
  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        setLoading(true);
        const res = await axios.get(API_URL, {
          params: {
            search: searchTerm || undefined,
            category: selectedCategory && selectedCategory !== "All" ? selectedCategory : undefined,
          },
        });

        if (res.data?.success && res.data?.data) {
          setArtworks(res.data.data);
        } else {
          setArtworks([]);
        }
      } catch (err) {
        console.error("Backend offline or connection issue:", err);
        setArtworks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchArtworks();
    fetchWishlistIds();
  }, [searchTerm, selectedCategory, refreshTrigger]);

  // Handle dynamic real-time heart icon toggle activation
  const handleToggleWishlist = async (artworkId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please login as a buyer to save your favorite artworks!");
        return;
      }

      const res = await axios.post(
        `${WISHLIST_API_URL}/toggle`,
        { artworkId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data?.success) {
        if (wishlistIds.includes(artworkId)) {
          setWishlistIds(wishlistIds.filter((id) => id !== artworkId));
        } else {
          setWishlistIds([...wishlistIds, artworkId]);
        }
      }
    } catch (err) {
      console.error("Wishlist action failed:", err);
      alert("Could not update wishlist. Please try again.");
    }
  };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "70vh",
          color: "#a855f7",
          fontSize: "20px",
          background: "#0d0d11",
          fontWeight: "bold",
        }}
      >
        Exploring Masterpieces... 🎨✨
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#0d0d11", color: "#fff", padding: "40px 20px" }}>
      {/* HEADER */}
      <div style={{ textAlign: "center", marginBottom: "45px" }}>
        <h1 style={{ color: "#a855f7", fontSize: "2.6rem", fontWeight: "900", letterSpacing: "-0.5px" }}>
          Explore Art Gallery
        </h1>
        <p style={{ color: "#8e8ea0", marginTop: "8px", fontSize: "15px" }}>
          Discover premium handcrafted visual art from certified global creators
        </p>

        <button
          onClick={() => setRefreshTrigger((prev) => !prev)}
          style={{
            marginTop: "20px",
            background: "linear-gradient(135deg, rgba(168, 85, 247, 0.15), rgba(99, 102, 241, 0.15))",
            border: "1px solid rgba(168, 85, 247, 0.4)",
            color: "#d8b4fe",
            padding: "8px 22px",
            borderRadius: "30px",
            fontSize: "12px",
            cursor: "pointer",
            fontWeight: "600",
            letterSpacing: "0.5px",
            transition: "all 0.3s ease",
            boxShadow: "0 4px 15px rgba(168, 85, 247, 0.1)",
          }}
        >
          🔄 Sync Latest Artist Uploads
        </button>
      </div>

      {/* FILTERS SECTION */}
      <div
        style={{
          background: "#13131a",
          padding: "25px",
          borderRadius: "20px",
          marginBottom: "45px",
          border: "1px solid rgba(255,255,255,0.04)",
          boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
        }}
      >
        <input
          type="text"
          placeholder="Search art pieces, themes, or categories..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: "100%",
            padding: "16px 22px",
            marginBottom: "22px",
            background: "#0d0d11",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "14px",
            color: "#fff",
            fontSize: "15px",
            outline: "none",
          }}
        />

        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat === "All" ? "" : cat)}
              style={{
                padding: "9px 20px",
                borderRadius: "30px",
                border: "none",
                cursor: "pointer",
                fontWeight: "600",
                fontSize: "13px",
                transition: "all 0.2s ease",
                background:
                  selectedCategory === cat || (cat === "All" && selectedCategory === "")
                    ? "linear-gradient(135deg, #a855f7, #6366f1)"
                    : "#1e1e24",
                color: "#fff",
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* GALLERY GRID */}
      {artworks.length === 0 ? (
        <div style={{ textAlign: "center", padding: "80px 0" }}>
          <p style={{ color: "#6b6b7b", fontSize: "18px" }}>❌ No matching aesthetic masterpieces found.</p>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "35px",
          }}
        >
          {artworks.map((art) => {
            const isWishlisted = wishlistIds.includes(art._id);
            return (
              <div
                key={art._id}
                style={{
                  background: "#13131a",
                  borderRadius: "24px",
                  overflow: "hidden",
                  border: "1px solid rgba(255,255,255,0.03)",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.4)",
                  display: "flex",
                  flexDirection: "column",
                  height: "420px",
                  position: "relative",
                }}
              >
                {/* Heart Button Element Overlay */}
                <button
                  onClick={() => handleToggleWishlist(art._id)}
                  style={{
                    position: "absolute",
                    top: "15px",
                    right: "15px",
                    background: "rgba(0, 0, 0, 0.5)",
                    border: "none",
                    borderRadius: "50%",
                    width: "36px",
                    height: "36px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "pointer",
                    zIndex: 5,
                    transition: "transform 0.2s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                >
                  {isWishlisted ? (
                    <FaHeart size={18} color="#ef4444" />
                  ) : (
                    <FaRegHeart size={18} color="#fff" />
                  )}
                </button>

                {/* Fixed Aspect Image Box */}
                <div style={{ width: "100%", height: "260px", overflow: "hidden", background: "#1a1a24" }}>
                  <img
                    src={art.image?.startsWith("http") ? art.image : `http://localhost:5000${art.image}`}
                    alt={art.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>

                {/* Card Metadata Box */}
                <div
                  style={{
                    padding: "24px",
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <h3
                      style={{
                        fontSize: "18px",
                        fontWeight: "800",
                        marginBottom: "6px",
                        color: "#fff",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {art.title}
                    </h3>
                    <p style={{ color: "#8e8ea0", fontSize: "14px", fontWeight: "500" }}>{art.category}</p>
                  </div>

                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <strong style={{ color: "#34d399", fontSize: "17px", fontWeight: "800" }}>
                      Rs {art.price.toLocaleString()}
                    </strong>
                    <span
                      style={{
                        fontSize: "11px",
                        color: "#c084fc",
                        background: "rgba(168, 85, 247, 0.12)",
                        padding: "4px 10px",
                        borderRadius: "8px",
                        fontWeight: "600",
                        border: "1px solid rgba(168, 85, 247, 0.2)",
                      }}
                    >
                      Original
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ExploreArtwork;