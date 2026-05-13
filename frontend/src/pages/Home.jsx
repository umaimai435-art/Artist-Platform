
// import { Link } from "react-router-dom";

// const Home = () => {
//   return (
//     <div className="min-h-screen bg-white text-gray-900">

//       {/* HERO – MINIMAL & STRONG */}
//       <section className="border-b">
//         <div className="max-w-7xl mx-auto px-6 py-28 text-center">
//           <p className="uppercase tracking-widest text-sm text-purple-600 mb-4">
//             Original Artwork Marketplace
//           </p>

//           <h1 className="text-5xl md:text-6xl font-bold leading-tight">
//             Art That Speaks
//             <br />
//             <span className="text-purple-600">Directly to You</span>
//           </h1>

//           <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
//             Buy original paintings directly from independent artists.
//             No prints. No copies. Only authentic art.
//           </p>

//           <div className="mt-10 flex justify-center gap-4">
//             <Link
//               to="/explore"
//               className="px-8 py-4 bg-black text-white rounded-full hover:bg-gray-800 transition"
//             >
//               Explore Gallery
//             </Link>

//             <Link
//               to="/start-selling"
//               className="px-8 py-4 border border-gray-300 rounded-full hover:bg-gray-100 transition"
//             >
//               Sell Your Art
//             </Link>
//           </div>
//         </div>
//       </section>

//       {/* FEATURED GALLERY STRIP */}
//       <section className="max-w-7xl mx-auto px-6 py-20">
//         <h2 className="text-3xl font-semibold mb-10">
//           Featured Today
//         </h2>

//         <div className="grid md:grid-cols-3 gap-8">
//           {[1, 2, 3].map((i) => (
//             <div
//               key={i}
//               className="group cursor-pointer"
//             >
//               <div className="h-80 bg-gray-200 rounded-xl overflow-hidden">
//                 <div className="w-full h-full group-hover:scale-105 transition duration-300" />
//               </div>

//               <div className="mt-4">
//                 <p className="font-medium">Artwork Title</p>
//                 <p className="text-sm text-gray-500">Artist Name</p>
//                 <p className="mt-1 font-semibold">$180</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* WHY THIS PLATFORM */}
//       <section className="bg-gray-50 py-24">
//         <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-12 text-center">
//           <div>
//             <h3 className="text-xl font-semibold mb-3">
//               100% Original Art
//             </h3>
//             <p className="text-gray-600">
//               Every piece is uploaded directly by the artist.
//               No mass production.
//             </p>
//           </div>

//           <div>
//             <h3 className="text-xl font-semibold mb-3">
//               Direct Artist Support
//             </h3>
//             <p className="text-gray-600">
//               Your purchase supports artists directly — no middlemen.
//             </p>
//           </div>

//           <div>
//             <h3 className="text-xl font-semibold mb-3">
//               Verified Creators
//             </h3>
//             <p className="text-gray-600">
//               Artists are verified to ensure authenticity and trust.
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* CATEGORY ROW */}
//       <section className="max-w-7xl mx-auto px-6 py-20">
//         <h2 className="text-3xl font-semibold mb-10">
//           Browse by Style
//         </h2>

//         <div className="flex flex-wrap gap-4">
//           {["Abstract", "Portrait", "Landscape", "Modern", "Digital", "Calligraphy"].map((cat) => (
//             <Link
//               key={cat}
//               to={`/explore?category=${cat}`}
//               className="px-6 py-3 border rounded-full hover:bg-black hover:text-white transition"
//             >
//               {cat}
//             </Link>
//           ))}
//         </div>
//       </section>

//       {/* SELLER CTA – STRONG */}
//       <section className="bg-black text-white">
//         <div className="max-w-7xl mx-auto px-6 py-28 text-center">
//           <h2 className="text-4xl font-bold">
//             Are You an Artist?
//           </h2>

//           <p className="mt-6 text-lg text-gray-300 max-w-xl mx-auto">
//             Create your profile, upload your artwork, and start selling
//             to collectors worldwide.
//           </p>

//           <Link
//             to="/start-selling"
//             className="inline-block mt-10 px-10 py-4 bg-white text-black rounded-full hover:bg-gray-200 transition"
//           >
//             Start Selling Today
//           </Link>
//         </div>
//       </section>

//       {/* FOOTER */}
//       <footer className="border-t py-8 text-center text-sm text-gray-500">
//         © 2026 Art Marketplace — Built for Artists
//       </footer>

//     </div>
//   );
// };

// export default Home;
import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

const Home = () => {
  const [featuredArt, setFeaturedArt] = useState([]);
  const API_BASE_URL = "http://localhost:5000";

  useEffect(() => {
    const fetchArt = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/artworks`);
        if (res.data && res.data.data) {
          setFeaturedArt(res.data.data.slice(-4).reverse());
        }
      } catch (err) {
        console.log("Fetch error:", err);
      }
    };
    fetchArt();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-purple-500">
      
      {/* --- PREMIUM HERO SECTION --- */}
      <section className="h-screen flex flex-col justify-center items-center text-center px-6 bg-neutral-950 relative overflow-hidden">
        {/* Animated Gradient Background Effect */}
        <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
            <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-purple-600 blur-[120px] rounded-full"></div>
            <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-blue-900 blur-[120px] rounded-full"></div>
        </div>

        <div className="relative z-10">
          <p className="text-purple-500 font-bold tracking-[0.4em] text-xs mb-6 uppercase">
            Curated Masterpieces
          </p>
          <h1 className="text-7xl md:text-9xl font-black tracking-tighter leading-none mb-8 uppercase">
            Artistry <br /> <span className="text-neutral-700">Pro</span>
          </h1>
          <p className="text-lg md:text-xl text-neutral-400 max-w-xl mx-auto font-light leading-relaxed mb-12 px-4">
            A borderless digital gallery connecting independent creators with the world's most elite collectors.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link to="/explore" className="px-10 py-4 bg-white text-black font-bold uppercase hover:bg-purple-600 hover:text-white transition-all duration-300">
              Explore Gallery
            </Link>
            <Link to="/start-selling" className="px-10 py-4 border border-white/20 text-white font-bold hover:bg-white/10 transition-all uppercase">
              Become Artist
            </Link>
          </div>
        </div>
      </section>

      {/* --- NEW DROPS (Minimalist Look) --- */}
      <section className="py-32 px-6 md:px-24 bg-white text-black">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-6">
          <div>
            <h2 className="text-5xl font-black uppercase tracking-tighter">New Arrivals</h2>
            <div className="h-1 w-20 bg-purple-600 mt-4"></div>
          </div>
          <Link to="/explore" className="text-xs font-black tracking-widest border-b-4 border-black pb-2 hover:text-purple-600 hover:border-purple-600 transition-all uppercase">
            View Collection →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {featuredArt.length > 0 ? featuredArt.map((art) => (
            <Link to={`/art/${art._id}`} key={art._id} className="group">
              <div className="relative h-96 w-full overflow-hidden bg-neutral-100 shadow-sm transition-all duration-500 group-hover:shadow-2xl">
                <img 
                  src={art.image.startsWith('http') ? art.image : `${API_BASE_URL}${art.image}`} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                  alt={art.title}
                  onError={(e) => { e.target.src = 'https://via.placeholder.com/600x800?text=Premium+Art'; }}
                />
                <div className="absolute top-4 left-4 bg-black text-white px-2 py-1 text-[8px] font-black tracking-widest uppercase">
                  Authentic
                </div>
              </div>
              <div className="mt-6 flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-bold tracking-tight uppercase group-hover:text-purple-600 transition-colors">{art.title}</h3>
                  <p className="text-xs text-neutral-400 font-medium">{art.artist?.name || 'Artistry Artist'}</p>
                </div>
                <span className="text-lg font-black text-black">${art.price}</span>
              </div>
            </Link>
          )) : (
            <p className="text-neutral-400 italic">No artwork found...</p>
          )}
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-20 bg-black border-t border-white/5 text-center">
        <h2 className="text-2xl font-black italic tracking-tighter mb-6 uppercase">ArtistryPro.</h2>
        <div className="flex justify-center gap-8 mb-10 text-[10px] font-bold text-neutral-600 uppercase tracking-widest">
            <Link to="/explore" className="hover:text-white transition">Explore</Link>
            <Link to="/start-selling" className="hover:text-white transition">Sell Art</Link>
            <Link to="/login" className="hover:text-white transition">Login</Link>
        </div>
        <p className="text-[10px] text-neutral-800 font-bold tracking-[0.5em] uppercase">© 2026 THE STANDARD OF EXCELLENCE</p>
      </footer>
    </div>
  );
};

export default Home;