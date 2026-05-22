import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

// ==========================================
// 🎨 LATEST NEW ARRIVALS FALLBACK DATA
// (Aesthetic, realistic and matches categories)
// ==========================================
const homeFallbackArtworks = [
  
 
];

const Home = () => {
  const [featuredArt, setFeaturedArt] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_BASE_URL = "http://localhost:5000";

  useEffect(() => {
    const fetchArt = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/artworks`);

        if (res.data?.success && res.data?.data && res.data.data.length > 0) {
          // Latest 4 products ko pick karne ke liye slice aur reverse
          setFeaturedArt(res.data.data.slice(-4).reverse());
        } else {
          // Agar database completely blank ho to fallback load ho
          setFeaturedArt(homeFallbackArtworks);
        }
      } catch (err) {
        console.log("Fetch error, loading curated fallback items:", err);
        setFeaturedArt(homeFallbackArtworks);
      } finally {
        setLoading(false);
      }
    };

    fetchArt();
  }, [API_BASE_URL]);

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-purple-500">

      {/* ================= HERO SECTION ================= */}
      <section className="h-screen flex flex-col justify-center items-center text-center px-6 bg-neutral-950 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-purple-600 blur-[120px] rounded-full"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-blue-900 blur-[120px] rounded-full"></div>
        </div>

        <div className="relative z-10">
          <p className="text-purple-500 font-bold tracking-[0.4em] text-xs mb-6 uppercase">
            Curated Masterpieces
          </p>

          <h1 className="text-7xl md:text-9xl font-black tracking-tighter leading-none mb-8 uppercase">
            Artistry <br />
            <span className="text-neutral-700">Pro</span>
          </h1>

          <p className="text-lg md:text-xl text-neutral-400 max-w-xl mx-auto font-light leading-relaxed mb-12 px-4">
            A borderless digital gallery connecting independent creators with
            the world's most elite collectors.
          </p>

          <div className="flex flex-wrap justify-center gap-6">
            <Link
              to="/explore"
              className="px-10 py-4 bg-white text-black font-bold uppercase hover:bg-purple-600 hover:text-white transition-all duration-300"
            >
              Explore Gallery
            </Link>

            <Link
              to="/start-selling"
              className="px-10 py-4 border border-white/20 text-white font-bold hover:bg-white/10 transition-all uppercase"
            >
              Become Artist
            </Link>
          </div>
        </div>
      </section>

      {/* ================= NEW ARRIVALS SECTION ================= */}
      <section className="py-32 px-6 md:px-24 bg-white text-black">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-6">
          <div>
            <h2 className="text-5xl font-black uppercase tracking-tighter">
              New Arrivals
            </h2>
            <div className="h-1 w-20 bg-purple-600 mt-4"></div>
          </div>

          <Link
            to="/explore"
            className="text-xs font-black tracking-widest border-b-4 border-black pb-2 hover:text-purple-600 hover:border-purple-600 transition-all uppercase"
          >
            View Collection →
          </Link>
        </div>

        {loading ? (
          <p className="text-center text-neutral-400 italic">
            Loading artworks...
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {featuredArt.map((art) => (
              <Link to={`/art/${art._id}`} key={art._id} className="group flex flex-col justify-between">
                <div>
                  {/* Fixed Box Aspect ratio to make cards identical */}
                  <div className="relative h-96 w-full overflow-hidden bg-neutral-100 shadow-sm transition-all duration-500 group-hover:shadow-2xl">
                    <img
                      src={
                        art.image?.startsWith("http")
                          ? art.image
                          : `${API_BASE_URL}${art.image}`
                      }
                      alt={art.title}
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                      onError={(e) => {
                        e.target.src =
                          "https://via.placeholder.com/600x800?text=Premium+Art";
                      }}
                    />

                    <div className="absolute top-4 left-4 bg-black text-white px-2 py-1 text-[8px] font-black tracking-widest uppercase">
                      Authentic
                    </div>
                  </div>

                  {/* Text Details Area */}
                  <div className="mt-6">
                    <h3 className="text-lg font-bold tracking-tight uppercase group-hover:text-purple-600 transition-colors line-clamp-1">
                      {art.title}
                    </h3>
                    <p className="text-xs text-neutral-400 font-medium mt-1">
                      By {art.artist?.name || "Artistry Artist"}
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-2 border-t border-neutral-100 flex justify-between items-center">
                  <span className="text-lg font-black text-black">
                    Rs {art.price.toLocaleString()}
                  </span>
                  <span className="text-[10px] font-bold text-purple-600 tracking-wider uppercase">
                    Original Art
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="py-20 bg-black border-t border-white/5 text-center">
        <h2 className="text-2xl font-black italic tracking-tighter mb-6 uppercase">
          ArtistryPro.
        </h2>

        <div className="flex justify-center gap-8 mb-10 text-[10px] font-bold text-neutral-600 uppercase tracking-widest">
          <Link to="/explore" className="hover:text-white transition">
            Explore
          </Link>
          <Link to="/start-selling" className="hover:text-white transition">
            Sell Art
          </Link>
          <Link to="/login" className="hover:text-white transition">
            Login
          </Link>
        </div>

        <p className="text-[10px] text-neutral-800 font-bold tracking-[0.5em] uppercase">
          © 2026 THE STANDARD OF EXCELLENCE
        </p>
      </footer>
    </div>
  );
};

export default Home;