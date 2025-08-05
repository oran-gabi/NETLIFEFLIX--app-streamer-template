import React from 'react';
import { X, Play, Plus } from 'lucide-react';

const InfoModal = ({ selectedMovie, onClose, onAddToFavorites }) => {
  if (!selectedMovie) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-lg animate-fade-in-fast">
      <div className="bg-gray-900/90 border border-gray-700 rounded-3xl p-8 w-11/12 max-w-5xl max-h-[90vh] overflow-y-auto relative animate-scale-up-center shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors transform hover:scale-110"
        >
          <X size={28} />
        </button>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/3 flex-shrink-0">
            <img src={selectedMovie.image} alt={selectedMovie.title} className="w-full rounded-2xl object-cover shadow-xl" />
          </div>
          <div className="flex-1">
            <h2 className="text-5xl font-bold mb-4">{selectedMovie.title}</h2>
            <div className="flex items-center gap-4 text-lg mb-6 flex-wrap">
              <span className="text-green-400 font-bold bg-green-400/20 px-3 py-1 rounded-full backdrop-blur-sm">{selectedMovie.rating}</span>
              <span className="bg-gray-700/60 px-3 py-1 rounded-full backdrop-blur-sm">{selectedMovie.year}</span>
              {selectedMovie.seasons && <span className="bg-gray-700/60 px-3 py-1 rounded-full backdrop-blur-sm">{selectedMovie.seasons}</span>}
              {selectedMovie.duration && <span className="bg-gray-700/60 px-3 py-1 rounded-full backdrop-blur-sm">{selectedMovie.duration}</span>}
              <span className="bg-gray-700/60 px-3 py-1 rounded-full backdrop-blur-sm">{selectedMovie.genre}</span>
            </div>
            <p className="text-gray-300 text-xl mb-8 leading-relaxed font-light">{selectedMovie.description}</p>
            <div className="flex gap-4 flex-wrap">
              <button className="bg-white text-black px-8 py-4 rounded-full flex items-center gap-3 text-lg font-bold hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 shadow-lg">
                <Play size={24} fill="black" />
                Play Now
              </button>
              <button
                onClick={() => onAddToFavorites(selectedMovie)}
                className="bg-gray-700/80 text-white px-8 py-4 rounded-full flex items-center gap-3 text-lg font-bold hover:bg-red-600 transition-all duration-300 transform hover:scale-105 shadow-lg backdrop-blur-sm border border-gray-600/50"
              >
                <Plus size={24} />
                Add to My List
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoModal;