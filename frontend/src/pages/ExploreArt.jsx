import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ExploreArt = () => {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');

  const API_BASE_URL = "http://localhost:5000";

  // Optimized Fetch Logic
  const fetchArtworks = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${API_BASE_URL}/api/artworks`, {
        params: { search, category } 
      });
      setArtworks(data.data);
    } catch (err) {
      console.error("Error fetching artworks:", err);
    } finally {
      setLoading(false);
    }
  }, [search, category]);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchArtworks();
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [fetchArtworks]);

  return (
    <div className="min-h-screen bg-[#fcfcfd] px-4 md:px-10 py-12">
      <div className="max-w-7xl mx-auto">
        {/* --- Header Section --- */}
        <header className="mb-12 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
            Discover Masterpieces
          </h1>
          <p className="mt-4 text-lg text-gray-500 max-w-2xl">
            Explore a curated collection of original artworks from independent creators around the globe.
          </p>
        </header>

        {/* --- Search & Filter Bar --- */}
        <div className="sticky top-4 z-10 mb-12 bg-white/80 backdrop-blur-md p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 items-center">
          <div className="relative w-full md:flex-1 group">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-purple-600 transition-colors">
              🔍
            </span>
            <input
              type="text"
              placeholder="Search by title, artist, or style..."
              className="pl-12 pr-4 py-3 bg-gray-50 border-none rounded-xl w-full focus:ring-2 focus:ring-purple-500 transition shadow-inner"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          
          <div className="w-full md:w-64">
            <select
              className="px-4 py-3 bg-gray-50 border-none rounded-xl w-full focus:ring-2 focus:ring-purple-500 transition shadow-inner appearance-none cursor-pointer"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">All Art Forms</option>
              <option value="Oil Painting">Oil Painting</option>
              <option value="Sketch">Sketch</option>
              <option value="Abstract">Abstract</option>
              <option value="Digital Art">Digital Art</option>
            </select>
          </div>
        </div>

        {/* --- Results Section --- */}
        {loading ? (
          <div className="mt-32 flex flex-col items-center justify-center space-y-4">
             <div className="w-16 h-16 border-4 border-purple-100 border-t-purple-600 rounded-full animate-spin"></div>
             <p className="text-gray-400 font-medium animate-pulse">Curating your gallery...</p>
          </div>
        ) : (
          <>
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-gray-500 font-medium">Showing {artworks.length} results</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {artworks && artworks.length > 0 ? (
                artworks.map((art) => (
                  <Link
                    to={`/artwork/${art._id}`}
                    key={art._id}
                    className="flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group border border-gray-50"
                  >
                    {/* Image Container */}
                    <div className="h-64 overflow-hidden relative">
                      <img
                        src={`${API_BASE_URL}${art.image}`}
                        alt={art.title}
                        onError={(e) => { e.target.src = 'https://via.placeholder.com/600x400?text=Gallery+Preview'; }}
                        className="w-full h-full object-cover group-hover:scale-110 transition duration-700 ease-out"
                      />
                      {/* Fixed: bg-gradient-to-t */}
                      {/* Gradient ki jagah solid black translucent overlay */}
<div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute top-4 left-4">
                         <span className="bg-white/90 backdrop-blur text-purple-700 text-[10px] font-bold px-3 py-1.5 rounded-full shadow-sm uppercase tracking-widest">
                          {art.category}
                        </span>
                      </div>
                    </div>

                    {/* Info Container */}
                    <div className="p-6 flex flex-col flex-1">
                      <h3 className="font-bold text-gray-900 text-lg leading-tight group-hover:text-purple-700 transition-colors">
                        {art.title}
                      </h3>
                      <p className="text-sm text-gray-400 mt-2 flex items-center">
                         <span className="w-4 h-px bg-gray-300 mr-2"></span>
                         {art.artist?.name || 'Unknown Artist'}
                      </p>
                      
                      <div className="mt-auto pt-5 flex items-center justify-between border-t border-gray-50">
                        <div className="flex flex-col">
                          <span className="text-[10px] text-gray-400 uppercase font-semibold">Current Price</span>
                          <span className="font-black text-2xl text-gray-900">${art.price}</span>
                        </div>
                        <div className="bg-gray-900 text-white p-3 rounded-xl group-hover:bg-purple-600 transition-colors duration-300">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="col-span-full flex flex-col items-center justify-center py-24 bg-white rounded-3xl border-2 border-dashed border-gray-100">
                  <div className="text-6xl grayscale mb-6">🏜️</div>
                  <h3 className="text-2xl font-bold text-gray-800">No art matches your search</h3>
                  <p className="text-gray-500 mt-2">Try clearing your filters or using different keywords.</p>
                  <button 
                    onClick={() => {setSearch(''); setCategory('');}}
                    className="mt-6 text-purple-600 font-bold hover:underline"
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ExploreArt;