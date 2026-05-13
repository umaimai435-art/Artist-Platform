const AnimatedLogo = () => {
  return (
    <div className="flex items-center gap-2 cursor-pointer select-none">
      
      {/* Animated Icon */}
      <div className="relative w-10 h-10 flex items-center justify-center">
        <div className="absolute w-full h-full rounded-full bg-purple-600 opacity-20 animate-ping"></div>
        <div className="relative w-10 h-10 rounded-full bg-purple-700 flex items-center justify-center shadow-lg">
          <span className="text-white text-xl">🎨</span>
        </div>
      </div>

      {/* Logo Text */}
      <h1 className="text-2xl font-bold tracking-wide">
        Art<span className="text-purple-700">Market</span>
      </h1>

    </div>
  );
};

export default AnimatedLogo;