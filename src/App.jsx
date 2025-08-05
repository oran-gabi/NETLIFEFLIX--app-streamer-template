import React, { useState, useEffect } from 'react';

// Import all components
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import HeroSection from './components/HeroSection';
import CarouselSection from './components/CarouselSection';
import MyList from './components/MyList';
import InfoModal from './components/InfoModal';
import FullViewModal from './components/FullViewModal';
import MovieCard from './components/MovieCard';
import LoadingScreen from './components/LoadingScreen';

const App = () => {
  // All state management stays in App
  const [selectedCategory, setSelectedCategory] = useState('trending');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [showLandingPage, setShowLandingPage] = useState(true);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [showFavoriteMessage, setShowFavoriteMessage] = useState(null);
  const [showFullView, setShowFullView] = useState(false);
  const [showMyList, setShowMyList] = useState(false);
  
  // NEW: Loading state
  const [isLoading, setIsLoading] = useState(true);

  // Loading effect - simulates app initialization
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // 3 seconds loading time

    return () => clearTimeout(timer);
  }, []);

  // Mock data
  const users = [
    { id: 1, name: 'Gabi', avatar: '🤴', type: 'adult' },
    { id: 2, name: 'Halisi', avatar: '👸', type: 'adult' },
    { id: 3, name: 'Kids Profile', avatar: '🐥', type: 'kids' }
  ];

  const categories = {
    trending: [
      { id: 1, title: "The Crown", image: "https://images.pexels.com/photos/3682153/pexels-photo-3682153.jpeg", rating: "97%", year: "2023", description: "A historical drama following the reign of Queen Elizabeth II.", genre: "Drama", duration: "45 min", seasons: "6 Seasons" },
      { id: 2, title: "Stranger Things", image: "https://images.pexels.com/photos/4841861/pexels-photo-4841861.jpeg", rating: "94%", year: "2024", description: "Supernatural horror series set in 1980s Indiana.", genre: "Sci-Fi", duration: "50 min", seasons: "4 Seasons" },
      { id: 3, title: "The Witcher", image: "https://images.pexels.com/photos/15405986/pexels-photo-15405986.jpeg", rating: "89%", year: "2023", description: "Fantasy epic following Geralt of Rivia.", genre: "Fantasy", duration: "55 min", seasons: "3 Seasons" },
      { id: 4, title: "Ozark", image: "https://images.pexels.com/photos/29173986/pexels-photo-29173986.jpeg", rating: "85%", year: "2024", description: "Crime thriller about money laundering in Missouri.", genre: "Crime", duration: "48 min", seasons: "4 Seasons" },
      { id: 5, title: "Dark", image: "https://images.pexels.com/photos/753994/pexels-photo-753994.jpeg", rating: "92%", year: "2023", description: "Mind-bending German sci-fi thriller.", genre: "Sci-Fi", duration: "52 min", seasons: "3 Seasons" },
      { id: 14, title: "House of Cards", image: "https://images.pexels.com/photos/262333/pexels-photo-262333.jpeg", rating: "88%", year: "2023", description: "Political thriller series.", genre: "Drama", duration: "47 min", seasons: "6 Seasons" },
      { id: 18, title: "The Last of Us", image: "https://media.istockphoto.com/id/478995576/photo/view-of-the-destroyed-city.jpg?s=1024x1024&w=is&k=20&c=eA32YWNdDT4amEvUHNJ1MJ6PFIFFkxUaH_N_xY6GLwI=", genre: "Drama", duration: "60 min", seasons: "1 Season" },
      { id: 19, title: "Succession", image: "https://images.pexels.com/photos/10398758/pexels-photo-10398758.jpeg", rating: "95%", year: "2023", description: "A wealthy family's power struggle for a media empire.", genre: "Drama", duration: "60 min", seasons: "4 Seasons" },
      { id: 20, title: "Wednesday", image: "https://images.pexels.com/photos/18866179/pexels-photo-18866179.jpeg", rating: "88%", year: "2022", description: "A new take on Wednesday Addams' high school life.", genre: "Fantasy", duration: "45 min", seasons: "1 Season" },
      { id: 21, title: "Avatar: The Way of Water", image: "https://images.pexels.com/photos/1597017/pexels-photo-1597017.jpeg", rating: "76%", year: "2022", description: "Jake Sully and Ney'tiri must protect their family.", genre: "Sci-Fi", duration: "192 min" },
      { id: 22, title: "Oppenheimer", image: "https://images.pexels.com/photos/28900246/pexels-photo-28900246.jpeg", rating: "93%", year: "2023", description: "The story of J. Robert Oppenheimer, the father of the atomic bomb.", genre: "Biography", duration: "180 min" }
    ],
    movies: [
      { id: 6, title: "Inception", image: "https://images.pexels.com/photos/29246929/pexels-photo-29246929.jpeg", rating: "96%", year: "2010", description: "A thief enters dreams to plant ideas.", genre: "Sci-Fi", duration: "148 min" },
      { id: 7, title: "Interstellar", image: "https://images.pexels.com/photos/7169857/pexels-photo-7169857.jpeg", rating: "94%", year: "2014", description: "Space exploration to save humanity.", genre: "Sci-Fi", duration: "169 min" },
      { id: 27, title: "Spider-Man: Across the Spider-Verse", image: "https://images.pexels.com/photos/13246954/pexels-photo-13246954.jpeg", rating: "91%", year: "2023", description: "story of Miles Morales as he navigates the multiverse and faces new challenges alongside Gwen Stacy", genre: "Animation", duration: "140 min" },
      { id: 8, title: "The Matrix", image: "https://images.pexels.com/photos/1089438/pexels-photo-1089438.jpeg", rating: "98%", year: "1999", description: "Reality-bending cyberpunk classic.", genre: "Action", duration: "136 min" },
      { id: 9, title: "Blade Runner 2049", image: "https://images.pexels.com/photos/2921139/pexels-photo-2921139.jpeg", rating: "91%", year: "2017", description: "Sequel to the sci-fi masterpiece.", genre: "Sci-Fi", duration: "163 min" },
      { id: 15, title: "Dune", image: "https://images.pexels.com/photos/1509582/pexels-photo-1509582.jpeg", rating: "93%", year: "2021", description: "Epic space opera adaptation.", genre: "Sci-Fi", duration: "155 min" },
      { id: 16, title: "Top Gun: Maverick", image: "https://images.pexels.com/photos/76971/fighter-jet-fighter-aircraft-f-16-falcon-aircraft-76971.jpeg", rating: "95%", year: "2022", description: "High-flying action sequel.", genre: "Action", duration: "130 min" },
      { id: 23, title: "Parasite", image: "https://images.pexels.com/photos/6491663/pexels-photo-6491663.jpeg", rating: "99%", year: "2019", description: "A poor family's plan to con a wealthy family.", genre: "Thriller", duration: "132 min" },
      { id: 24, title: "Joker", image: "https://images.pexels.com/photos/10532562/pexels-photo-10532562.jpeg", rating: "85%", year: "2019", description: "A mentally ill comedian embarks on a downward spiral.", genre: "Crime", duration: "122 min" },
      { id: 25, title: "Everything Everywhere All at Once", image: "https://images.pexels.com/photos/6005391/pexels-photo-6005391.jpeg", rating: "95%", year: "2022", description: "An unlikely hero must save the multiverse.", genre: "Sci-Fi", duration: "139 min" },
      { id: 26, title: "The Batman", image: "https://images.pexels.com/photos/15511010/pexels-photo-15511010.jpeg", rating: "85%", year: "2022", description: "Batman investigates a series of murders in Gotham.", genre: "Action", duration: "176 min" }
    ],
    series: [
      { id: 17, title: "The Mandalorian", image: "https://images.pexels.com/photos/32671629/pexels-photo-32671629.jpeg", rating: "92%", year: "2019", description: "Star Wars bounty hunter series.", genre: "Sci-Fi", duration: "40 min", seasons: "3 Seasons" },
      { id: 10, title: "Breaking Bad", image: "https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg", rating: "99%", year: "2008", description: "Chemistry teacher turns to crime.", genre: "Crime", duration: "47 min", seasons: "5 Seasons" },
      { id: 11, title: "Game of Thrones", image: "https://images.pexels.com/photos/3359734/pexels-photo-3359734.jpeg", rating: "88%", year: "2011", description: "Epic fantasy political drama.", genre: "Fantasy", duration: "57 min", seasons: "8 Seasons" },
      { id: 12, title: "The Office", image: "https://images.pexels.com/photos/4065910/pexels-photo-4065910.jpeg", rating: "91%", year: "2005", description: "Mockumentary workplace comedy.", genre: "Comedy", duration: "22 min", seasons: "9 Seasons" },
      { id: 13, title: "Friends", image: "https://images.pexels.com/photos/30500272/pexels-photo-30500272.jpeg", rating: "89%", year: "1994", description: "Classic sitcom about friendship.", genre: "Comedy", duration: "22 min", seasons: "10 Seasons" },
      { id: 28, title: "The Queen's Gambit", image: "https://images.pexels.com/photos/260024/pexels-photo-260024.jpeg", rating: "97%", year: "2020", description: "A young chess prodigy rises to the top.", genre: "Drama", duration: "60 min", seasons: "1 Season" },
      { id: 29, title: "Loki", image: "https://images.pexels.com/photos/26654748/pexels-photo-26654748.jpeg", rating: "92%", year: "2021", description: "The God of Mischief steps out of his brother's shadow.", genre: "Sci-Fi", duration: "50 min", seasons: "2 Seasons" },
      { id: 30, title: "The Boys", image: "https://images.pexels.com/photos/7768663/pexels-photo-7768663.jpeg", rating: "93%", year: "2019", description: "Superheroes abuse their powers rather than use them for good.", genre: "Action", duration: "60 min", seasons: "4 Seasons" },
      { id: 31, title: "Arcane", image: "https://images.pexels.com/photos/8721339/pexels-photo-8721339.jpeg", rating: "100%", year: "2021", description: "A tale of two cities in a fantasy world.", genre: "Animation", duration: "40 min", seasons: "1 Season" },
      { id: 32, title: "Chernobyl", image: "https://media.istockphoto.com/id/1128905463/photo/man-in-gas-mask-and-cloak-of-chemical-protection-on-abandoned-road.jpg?s=1024x1024&w=is&k=20&c=_BK0fbPWZ1ZaQnwItY4npxVIUbGS4bF_7dq0eY49tZw=", rating: "95%", year: "2019", description: "The true story of the 1986 nuclear disaster.", genre: "Drama", duration: "60 min", seasons: "1 Season" }
    ]
  };

  const featuredContent = {
    title: "Stranger Things 4",
    description: "When a shadowy new threat emerges in Hawkins, the gang must band together once more to save their town and possibly the world. The stakes have never been higher in this thrilling new season.",
    image: "https://images.pexels.com/photos/30359246/pexels-photo-30359246.jpeg",
    rating: "94%",
    year: "2024",
    seasons: "4 Seasons"
  };

  // Event handlers
  const handleUserSelect = (user) => {
    setCurrentUser(user);
    setShowLandingPage(false);
  };

  const handleAddToFavorites = (movie) => {
    if (!favorites.find(fav => fav.id === movie.id)) {
      setFavorites([...favorites, movie]);
      setShowFavoriteMessage(movie.id);
      setTimeout(() => setShowFavoriteMessage(null), 2000);
    }
  };

  const handleInfoClick = (movie) => {
    setSelectedMovie(movie);
    setShowInfoModal(true);
  };

  const handleImageClick = (movie) => {
    setSelectedMovie(movie);
    setShowFullView(true);
  };

  const filteredContent = () => {
    if (!searchQuery) return categories[selectedCategory] || [];
    return Object.values(categories).flat().filter(item =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  // Show loading screen first
  if (isLoading) {
    return <LoadingScreen />;
  }

  // Show landing page
  if (showLandingPage) {
    return (
      <LandingPage 
        users={users} 
        onUserSelect={handleUserSelect} 
      />
    );
  }

  // Main app layout
  return (
    <div className="min-h-screen bg-black text-white relative">
      <Header
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        showSearch={showSearch}
        setShowSearch={setShowSearch}
        showUserMenu={showUserMenu}
        setShowUserMenu={setShowUserMenu}
        currentUser={currentUser}
        showMyList={showMyList}
        setShowMyList={setShowMyList}
        setShowLandingPage={setShowLandingPage}
      />

      {/* Hero section */}
      {!searchQuery && !showMyList && (
        <HeroSection featuredContent={featuredContent} />
      )}

      {/* Main content */}
      <main className={`${!searchQuery && !showMyList ? 'pt-0' : 'pt-32'} pb-24`}>
        {showMyList ? (
          <MyList
            favorites={favorites}
            onAddToFavorites={handleAddToFavorites}
            onInfoClick={handleInfoClick}
            onImageClick={handleImageClick}
            showFavoriteMessage={showFavoriteMessage}
          />
        ) : searchQuery ? (
          <section className="px-8">
            <h2 className="text-3xl font-bold mb-8">Search Results for "{searchQuery}"</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {filteredContent().map(item => (
                <MovieCard 
                  key={item.id} 
                  movie={item}
                  onAddToFavorites={handleAddToFavorites}
                  onInfoClick={handleInfoClick}
                  onImageClick={handleImageClick}
                  showFavoriteMessage={showFavoriteMessage}
                />
              ))}
            </div>
          </section>
        ) : (
          Object.entries(categories).map(([category, items]) => (
            <CarouselSection
              key={category}
              title={category === selectedCategory ? `${category} Now` : category}
              items={items}
              categoryKey={category}
              onAddToFavorites={handleAddToFavorites}
              onInfoClick={handleInfoClick}
              onImageClick={handleImageClick}
              showFavoriteMessage={showFavoriteMessage}
            />
          ))
        )}
      </main>

      {/* Modals */}
      {showInfoModal && (
        <InfoModal
          selectedMovie={selectedMovie}
          onClose={() => setShowInfoModal(false)}
          onAddToFavorites={handleAddToFavorites}
        />
      )}

      {showFullView && (
        <FullViewModal
          selectedMovie={selectedMovie}
          onClose={() => setShowFullView(false)}
        />
      )}
    </div>
  );
};

export default App;