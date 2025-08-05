import React from 'react';
import MovieCard from './MovieCard';

const MyList = ({ 
  favorites, 
  onAddToFavorites, 
  onInfoClick, 
  onImageClick, 
  showFavoriteMessage 
}) => {
  return (
    <section className="px-8">
      <h2 className="text-3xl font-bold mb-8">My NETLIFEFLIX List</h2>
      {favorites.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {favorites.map(item => (
            <MovieCard 
              key={item.id} 
              movie={item}
              onAddToFavorites={onAddToFavorites}
              onInfoClick={onInfoClick}
              onImageClick={onImageClick}
              showFavoriteMessage={showFavoriteMessage}
            />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-400 mt-20">
          <h3 className="text-2xl mb-4">Your list is empty.</h3>
          <p className="text-lg">Add movies and series to your list by clicking the **+** button!</p>
        </div>
      )}
    </section>
  );
};

export default MyList;