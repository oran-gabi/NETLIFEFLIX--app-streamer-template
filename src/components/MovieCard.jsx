import React, { useState } from 'react';
import { Play, Info, Plus } from 'lucide-react';

const MovieCard = ({ 
  movie, 
  isLarge = false, 
  onAddToFavorites, 
  onInfoClick, 
  onImageClick, 
  showFavoriteMessage 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div
      className={`relative group cursor-pointer transition-all duration-500 ease-out transform-gpu ${
        isLarge ? 'w-80 h-[450px]' : 'w-56 h-80'
      } flex-shrink-0 ${isHovered ? 'z-50 scale-110 shadow-2xl' : 'hover:scale-105'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative w-full h-full overflow-hidden rounded-xl shadow-lg">
        <img
          src={movie.image}
          alt={movie.title}
          className={`w-full h-full object-cover transition-all duration-700 ease-out transform-gpu ${
            isHovered ? 'scale-110 brightness-110' : 'scale-100'
          } ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => onImageClick(movie)}
          onLoad={() => setIsLoaded(true)}
        />

        {/* Loading skeleton */}
        {!isLoaded && (
          <div className="absolute inset-0 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 animate-pulse" />
        )}

        {/* Enhanced gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent rounded-xl" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent rounded-xl" />

        {/* Favorite notification with enhanced animation */}
        {showFavoriteMessage === movie.id && (
          <div className="absolute top-4 left-4 bg-gradient-to-r from-red-600 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-bold animate-bounce z-30 shadow-lg backdrop-blur-sm">
            ❤️ Added to My List!
          </div>
        )}

        {/* Enhanced hover overlay */}
        <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-xl transition-all duration-500 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`} />

        {/* Content overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-20">
          <h3 className={`font-bold mb-2 ${isLarge ? 'text-2xl' : 'text-xl'} drop-shadow-lg`}>
            {movie.title}
          </h3>
          <div className="flex items-center gap-3 text-sm opacity-90 mb-3">
            <span className="text-green-400 font-semibold bg-green-400/20 px-2 py-1 rounded-full">
              {movie.rating}
            </span>
            <span className="bg-gray-700/60 px-2 py-1 rounded-full backdrop-blur-sm">
              {movie.year}
            </span>
          </div>
          {isLarge && (
            <p className="text-sm opacity-85 line-clamp-2 mb-4 leading-relaxed">
              {movie.description}
            </p>
          )}

          {/* Enhanced button animations */}
          <div className={`flex gap-3 transition-all duration-500 ease-out ${
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <button className="bg-white text-black px-6 py-2.5 rounded-full flex items-center gap-2 text-sm font-bold hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 shadow-lg">
              <Play size={16} fill="black" />
              Play
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onAddToFavorites(movie);
              }}
              className="bg-gray-800/80 text-white p-3 rounded-full hover:bg-red-600 transition-all duration-300 transform hover:scale-110 shadow-lg backdrop-blur-sm border border-gray-600/50"
              title="Add to My List"
            >
              <Plus size={16} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onInfoClick(movie);
              }}
              className="bg-gray-800/80 text-white p-3 rounded-full hover:bg-blue-600 transition-all duration-300 transform hover:scale-110 shadow-lg backdrop-blur-sm border border-gray-600/50"
              title="More information"
            >
              <Info size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;