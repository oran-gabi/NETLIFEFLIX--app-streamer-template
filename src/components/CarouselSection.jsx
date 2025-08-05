import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import MovieCard from './MovieCard';

const CarouselSection = ({ 
  title, 
  items, 
  categoryKey, 
  onAddToFavorites, 
  onInfoClick, 
  onImageClick, 
  showFavoriteMessage 
}) => {
  const carouselRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const scroll = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.clientWidth * 0.8;
      if (direction === 'left') {
        carouselRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  const checkScrollPosition = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener('scroll', checkScrollPosition);
      checkScrollPosition();
      return () => carousel.removeEventListener('scroll', checkScrollPosition);
    }
  }, []);

  return (
    <section className="px-8 mb-16 relative group/section">
      <h2 className="text-3xl font-bold capitalize mb-6 text-transparent bg-gradient-to-r from-white to-gray-300 bg-clip-text">
        {title}
      </h2>
      <div className="relative">
        <div
          ref={carouselRef}
          className="flex gap-6 overflow-x-scroll scrollbar-hide snap-x snap-mandatory pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {items.map((item, index) => (
            <div
              key={item.id}
              className="flex-shrink-0 snap-start transition-all duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <MovieCard 
                movie={item} 
                isLarge={true}
                onAddToFavorites={onAddToFavorites}
                onInfoClick={onInfoClick}
                onImageClick={onImageClick}
                showFavoriteMessage={showFavoriteMessage}
              />
            </div>
          ))}
        </div>

        {/* Enhanced navigation arrows */}
        {showLeftArrow && (
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 p-4 bg-gradient-to-r from-black/80 to-transparent hover:from-black/90 rounded-r-full transition-all duration-300 z-30 transform hover:scale-110 shadow-2xl backdrop-blur-sm"
          >
            <ChevronLeft size={36} className="text-white drop-shadow-lg" />
          </button>
        )}
        {showRightArrow && (
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 p-4 bg-gradient-to-l from-black/80 to-transparent hover:from-black/90 rounded-l-full transition-all duration-300 z-30 transform hover:scale-110 shadow-2xl backdrop-blur-sm"
          >
            <ChevronRight size={36} className="text-white drop-shadow-lg" />
          </button>
        )}
      </div>
    </section>
  );
};

export default CarouselSection;