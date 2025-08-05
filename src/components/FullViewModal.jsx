import React from 'react';
import { X } from 'lucide-react';

const FullViewModal = ({ selectedMovie, onClose }) => {
  if (!selectedMovie) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm animate-fade-in-fast">
      <button
        onClick={onClose}
        className="absolute top-8 right-8 text-white hover:text-gray-300 transition-colors z-[110] transform hover:scale-110"
      >
        <X size={48} className="drop-shadow-lg" />
      </button>
      <div className="relative w-full h-full flex items-center justify-center p-8">
        <img
          src={selectedMovie.image}
          alt={selectedMovie.title}
          className="max-w-full max-h-full object-contain rounded-xl shadow-2xl animate-scale-up-center"
        />
      </div>
    </div>
  );
};

export default FullViewModal;