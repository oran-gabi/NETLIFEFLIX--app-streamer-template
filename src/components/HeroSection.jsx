import React from 'react';
import { Play, Info } from 'lucide-react';

const HeroSection = ({ featuredContent }) => {
  return (
    <section className="relative h-screen flex items-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center transform scale-105 transition-transform duration-1000"
        style={{ backgroundImage: `url(${featuredContent.image})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

      <div className="relative z-10 px-8 max-w-3xl ml-8">
        <h1 className="text-7xl font-bold mb-6 text-white drop-shadow-2xl animate-fade-in-up">
          {featuredContent.title}
        </h1>
        <div className="flex items-center gap-6 mb-6 text-xl">
          <span className="text-green-400 font-bold bg-green-400/20 px-3 py-1 rounded-full backdrop-blur-sm">
            {featuredContent.rating}
          </span>
          <span className="bg-gray-700/60 px-3 py-1 rounded-full backdrop-blur-sm">
            {featuredContent.year}
          </span>
          <span className="bg-gray-700/60 px-3 py-1 rounded-full backdrop-blur-sm">
            {featuredContent.seasons}
          </span>
        </div>
        <p className="text-xl mb-10 text-gray-200 leading-relaxed max-w-2xl font-light">
          {featuredContent.description}
        </p>

        <div className="flex gap-6">
          <button className="bg-white text-black px-10 py-4 rounded-xl flex items-center gap-4 text-xl font-bold hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 shadow-2xl">
            <Play size={28} fill="black" />
            Play Now
          </button>
          <button className="bg-gray-700/80 text-white px-10 py-4 rounded-xl flex items-center gap-4 text-xl font-semibold hover:bg-gray-600 transition-all duration-300 backdrop-blur-sm border border-gray-600/50 shadow-xl">
            <Info size={28} />
            More Info
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;