// App.jsx

import React, { useState, useEffect, useRef } from 'react';
import { Play, Info, Plus, ChevronDown, Search, Bell, User, X, ChevronLeft, ChevronRight, Heart, Star, Calendar, Clock, Users, UserPlus, LogOut, Baby } from 'lucide-react';

const App = () => {
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
  const [showMyList, setShowMyList] = useState(false); // NEW: State for "My NETLIFEFLIX" view

  // Mock data (unchanged)
  const users = [
    { id: 1, name: 'John Doe', avatar: '👨', type: 'adult' },
    { id: 2, name: 'Sarah Connor', avatar: '👩', type: 'adult' },
    { id: 3, name: 'Kids Profile', avatar: '👶', type: 'kids' }
  ];
  
  // --- UPDATED: Added 5 new titles to each category ---
  const categories = {
    trending: [
      { id: 1, title: "The Crown", image: "https://images.pexels.com/photos/3682153/pexels-photo-3682153.jpeg", rating: "97%", year: "2023", description: "A historical drama following the reign of Queen Elizabeth II.", genre: "Drama", duration: "45 min", seasons: "6 Seasons" },
      { id: 2, title: "Stranger Things", image: "https://images.pexels.com/photos/4841861/pexels-photo-4841861.jpeg", rating: "94%", year: "2024", description: "Supernatural horror series set in 1980s Indiana.", genre: "Sci-Fi", duration: "50 min", seasons: "4 Seasons" },
      { id: 3, title: "The Witcher", image: "https://images.pexels.com/photos/15405986/pexels-photo-15405986.jpeg", rating: "89%", year: "2023", description: "Fantasy epic following Geralt of Rivia.", genre: "Fantasy", duration: "55 min", seasons: "3 Seasons" },
      { id: 4, title: "Ozark", image: "https://images.pexels.com/photos/29173986/pexels-photo-29173986.jpeg", rating: "85%", year: "2024", description: "Crime thriller about money laundering in Missouri.", genre: "Crime", duration: "48 min", seasons: "4 Seasons" },
      { id: 5, title: "Dark", image: "https://images.pexels.com/photos/753994/pexels-photo-753994.jpeg", rating: "92%", year: "2023", description: "Mind-bending German sci-fi thriller.", genre: "Sci-Fi", duration: "52 min", seasons: "3 Seasons" },
      { id: 14, title: "House of Cards", image: "https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg", rating: "88%", year: "2023", description: "Political thriller series.", genre: "Drama", duration: "47 min", seasons: "6 Seasons" },
      // NEW: Added 5 popular trending titles
      { id: 18, title: "The Last of Us", image: "https://images.pexels.com/photos/19515598/pexels-photo-19515598/free-photo-of-a-man-with-a-gun-in-the-last-of-us-series.jpeg", rating: "96%", year: "2023", description: "A post-apocalyptic journey to save humanity.", genre: "Drama", duration: "60 min", seasons: "1 Season" },
      { id: 19, title: "Succession", image: "https://images.pexels.com/photos/10398758/pexels-photo-10398758.jpeg", rating: "95%", year: "2023", description: "A wealthy family's power struggle for a media empire.", genre: "Drama", duration: "60 min", seasons: "4 Seasons" },
      { id: 20, title: "Wednesday", image: "https://images.pexels.com/photos/15418182/pexels-photo-15418182.jpeg", rating: "88%", year: "2022", description: "A new take on Wednesday Addams' high school life.", genre: "Fantasy", duration: "45 min", seasons: "1 Season" },
      { id: 21, title: "Avatar: The Way of Water", image: "https://images.pexels.com/photos/18503831/pexels-photo-18503831/free-photo-of-avatar-the-way-of-water-movie-poster-with-a-blue-creature-on-it.jpeg", rating: "76%", year: "2022", description: "Jake Sully and Ney'tiri must protect their family.", genre: "Sci-Fi", duration: "192 min" },
      { id: 22, title: "Oppenheimer", image: "https://images.pexels.com/photos/24225381/pexels-photo-24225381/free-photo-of-a-close-up-of-the-poster-for-the-movie-oppenheimer.jpeg", rating: "93%", year: "2023", description: "The story of J. Robert Oppenheimer, the father of the atomic bomb.", genre: "Biography", duration: "180 min" }
    ],
    movies: [
      { id: 6, title: "Inception", image: "https://images.pexels.com/photos/29246929/pexels-photo-29246929.jpeg", rating: "96%", year: "2010", description: "A thief enters dreams to plant ideas.", genre: "Sci-Fi", duration: "148 min" },
      { id: 7, title: "Interstellar", image: "https://images.pexels.com/photos/7169857/pexels-photo-7169857.jpeg", rating: "94%", year: "2014", description: "Space exploration to save humanity.", genre: "Sci-Fi", duration: "169 min" },
      { id: 8, title: "The Matrix", image: "https://images.pexels.com/photos/1089438/pexels-photo-1089438.jpeg", rating: "98%", year: "1999", description: "Reality-bending cyberpunk classic.", genre: "Action", duration: "136 min" },
      { id: 9, title: "Blade Runner 2049", image: "https://images.pexels.com/photos/2921139/pexels-photo-2921139.jpeg", rating: "91%", year: "2017", description: "Sequel to the sci-fi masterpiece.", genre: "Sci-Fi", duration: "163 min" },
      { id: 15, title: "Dune", image: "https://images.pexels.com/photos/7169857/pexels-photo-7169857.jpeg", rating: "93%", year: "2021", description: "Epic space opera adaptation.", genre: "Sci-Fi", duration: "155 min" },
      { id: 16, title: "Top Gun: Maverick", image: "https://images.pexels.com/photos/29246929/pexels-photo-29246929.jpeg", rating: "95%", year: "2022", description: "High-flying action sequel.", genre: "Action", duration: "130 min" },
      // NEW: Added 5 popular movies
      { id: 23, title: "Parasite", image: "https://images.pexels.com/photos/3472782/pexels-photo-3472782.jpeg", rating: "99%", year: "2019", description: "A poor family's plan to con a wealthy family.", genre: "Thriller", duration: "132 min" },
      { id: 24, title: "Joker", image: "https://images.pexels.com/photos/2916823/pexels-photo-2916823.jpeg", rating: "85%", year: "2019", description: "A mentally ill comedian embarks on a downward spiral.", genre: "Crime", duration: "122 min" },
      { id: 25, title: "Everything Everywhere All at Once", image: "https://images.pexels.com/photos/14736173/pexels-photo-14736173.jpeg", rating: "95%", year: "2022", description: "An unlikely hero must save the multiverse.", genre: "Sci-Fi", duration: "139 min" },
      { id: 26, title: "The Batman", image: "https://images.pexels.com/photos/11079361/pexels-photo-11079361.jpeg", rating: "85%", year: "2022", description: "Batman investigates a series of murders in Gotham.", genre: "Action", duration: "176 min" },
      { id: 27, title: "Spider-Man: Across the Spider-Verse", image: "https://images.pexels.com/photos/18260655/pexels-photo-18260655/free-photo-of-spider-man-acros-the-spider-verse.jpeg", rating: "95%", year: "2023", description: "Miles Morales travels across the Multiverse.", genre: "Animation", duration: "140 min" }
    ],
    series: [
      { id: 10, title: "Breaking Bad", image: "https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg", rating: "99%", year: "2008", description: "Chemistry teacher turns to crime.", genre: "Crime", duration: "47 min", seasons: "5 Seasons" },
      { id: 11, title: "Game of Thrones", image: "https://images.pexels.com/photos/260024/pexels-photo-260024.jpeg", rating: "88%", year: "2011", description: "Epic fantasy political drama.", genre: "Fantasy", duration: "57 min", seasons: "8 Seasons" },
      { id: 12, title: "The Office", image: "https://images.pexels.com/photos/4065910/pexels-photo-4065910.jpeg", rating: "91%", year: "2005", description: "Mockumentary workplace comedy.", genre: "Comedy", duration: "22 min", seasons: "9 Seasons" },
      { id: 13, title: "Friends", image: "https://images.pexels.com/photos/4065910/pexels-photo-4065910.jpeg", rating: "89%", year: "1994", description: "Classic sitcom about friendship.", genre: "Comedy", duration: "22 min", seasons: "10 Seasons" },
      { id: 17, title: "The Mandalorian", image: "https://images.pexels.com/photos/15405986/pexels-photo-15405986.jpeg", rating: "92%", year: "2019", description: "Star Wars bounty hunter series.", genre: "Sci-Fi", duration: "40 min", seasons: "3 Seasons" },
      // NEW: Added 5 popular series
      { id: 28, title: "The Queen's Gambit", image: "https://images.pexels.com/photos/10141639/pexels-photo-10141639.jpeg", rating: "97%", year: "2020", description: "A young chess prodigy rises to the top.", genre: "Drama", duration: "60 min", seasons: "1 Season" },
      { id: 29, title: "Loki", image: "https://images.pexels.com/photos/1089438/pexels-photo-1089438.jpeg", rating: "92%", year: "2021", description: "The God of Mischief steps out of his brother's shadow.", genre: "Sci-Fi", duration: "50 min", seasons: "2 Seasons" },
      { id: 30, title: "The Boys", image: "https://images.pexels.com/photos/18247076/pexels-photo-18247076/free-photo-of-the-boys-posters.jpeg", rating: "93%", year: "2019", description: "Superheroes abuse their powers rather than use them for good.", genre: "Action", duration: "60 min", seasons: "4 Seasons" },
      { id: 31, title: "Arcane", image: "https://images.pexels.com/photos/17698501/pexels-photo-17698501/free-photo-of-a-close-up-of-a-poster-for-the-series-arcane.jpeg", rating: "100%", year: "2021", description: "A tale of two cities in a fantasy world.", genre: "Animation", duration: "40 min", seasons: "1 Season" },
      { id: 32, title: "Chernobyl", image: "https://images.pexels.com/photos/3321556/pexels-photo-3321556.jpeg", rating: "95%", year: "2019", description: "The true story of the 1986 nuclear disaster.", genre: "Drama", duration: "60 min", seasons: "1 Season" }
    ]
  };

  const featuredContent = {
    title: "Stranger Things 4",
    description: "When a shadowy new threat emerges in Hawkins, the gang must band together once more to save their town and possibly the world. The stakes have never been higher in this thrilling new season.",
    image: "https://images.pexels.com/photos/19187321/pexels-photo-19187321.jpeg",
    rating: "94%",
    year: "2024",
    seasons: "4 Seasons"
  };

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

  // --- COMPONENTS ---
  const MovieCard = ({ movie, isLarge = false }) => {
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
            onClick={() => handleImageClick(movie)}
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
                  handleAddToFavorites(movie);
                }}
                className="bg-gray-800/80 text-white p-3 rounded-full hover:bg-red-600 transition-all duration-300 transform hover:scale-110 shadow-lg backdrop-blur-sm border border-gray-600/50"
                title="Add to My List"
              >
                <Plus size={16} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleInfoClick(movie);
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

  const CarouselSection = ({ title, items, categoryKey }) => {
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
                <MovieCard movie={item} isLarge={true} />
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

  // --- MAIN LAYOUT ---
  if (showLandingPage) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-red-950 text-white flex items-center justify-center relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-red-600/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="text-center relative z-10">
          <h1 className="text-8xl font-bold text-transparent bg-gradient-to-r from-red-600 via-red-500 to-red-400 bg-clip-text mb-12 animate-pulse drop-shadow-2xl">
            NETLIFEFLIX
          </h1>
          <h2 className="text-4xl mb-16 text-gray-200 font-light">Who's watching?</h2>
          <div className="flex gap-12 justify-center items-center flex-wrap">
            {users.map((user, index) => (
              <div
                key={user.id}
                onClick={() => handleUserSelect(user)}
                className="group cursor-pointer text-center transform transition-all duration-500 hover:scale-110"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="w-40 h-40 rounded-2xl flex items-center justify-center mb-6 overflow-hidden group-hover:scale-110 transition-all duration-500 relative shadow-2xl">
                  <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center text-7xl group-hover:from-gray-700 group-hover:to-gray-800 transition-all duration-500 border-4 border-gray-700 group-hover:border-red-500">
                    {user.type === 'kids' ? <Baby size={70} className="text-yellow-400" /> : user.avatar}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-red-600/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-2xl" />
                </div>
                <p className="text-xl text-gray-300 group-hover:text-white transition-all duration-300 font-medium">
                  {user.name}
                </p>
              </div>
            ))}

            <div className="group cursor-pointer text-center transform transition-all duration-500 hover:scale-110">
              <div className="w-40 h-40 rounded-2xl flex items-center justify-center mb-6 overflow-hidden group-hover:scale-110 transition-all duration-500 relative shadow-2xl">
                <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center border-4 border-dashed border-gray-600 group-hover:border-red-500 group-hover:from-gray-700 group-hover:to-gray-800 transition-all duration-500">
                  <UserPlus size={50} className="text-gray-400 group-hover:text-white transition-colors duration-300" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-red-600/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-2xl" />
              </div>
              <p className="text-xl text-gray-300 group-hover:text-white transition-all duration-300 font-medium">
                Add User
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white relative">
      {/* Enhanced header with glassmorphism effect */}
      <header className="fixed top-0 w-full z-50 bg-black/40 backdrop-blur-xl border-b border-gray-800/50 transition-all duration-300">
        <div className="flex items-center justify-between px-8 py-5">
          <div className="flex items-center gap-10">
            <h1 className="text-red-600 text-4xl font-bold drop-shadow-lg">NETLIFEFLIX</h1>
            {/* NEW: Updated navigation to include "My NETLIFEFLIX" button */}
            <nav className="hidden md:flex gap-8">
              <button
                onClick={() => {
                  setSelectedCategory('trending');
                  setShowMyList(false);
                }}
                className={`capitalize hover:text-white transition-all duration-300 text-lg font-semibold relative ${
                  selectedCategory === 'trending' && !showMyList ? 'text-white' : 'text-gray-400 hover:scale-105'
                }`}
              >
                Trending
                {selectedCategory === 'trending' && !showMyList && (
                  <div className="absolute -bottom-2 left-0 right-0 h-1 bg-red-600 rounded-full"></div>
                )}
              </button>
              <button
                onClick={() => {
                  setSelectedCategory('movies');
                  setShowMyList(false);
                }}
                className={`capitalize hover:text-white transition-all duration-300 text-lg font-semibold relative ${
                  selectedCategory === 'movies' && !showMyList ? 'text-white' : 'text-gray-400 hover:scale-105'
                }`}
              >
                Movies
                {selectedCategory === 'movies' && !showMyList && (
                  <div className="absolute -bottom-2 left-0 right-0 h-1 bg-red-600 rounded-full"></div>
                )}
              </button>
              <button
                onClick={() => {
                  setSelectedCategory('series');
                  setShowMyList(false);
                }}
                className={`capitalize hover:text-white transition-all duration-300 text-lg font-semibold relative ${
                  selectedCategory === 'series' && !showMyList ? 'text-white' : 'text-gray-400 hover:scale-105'
                }`}
              >
                Series
                {selectedCategory === 'series' && !showMyList && (
                  <div className="absolute -bottom-2 left-0 right-0 h-1 bg-red-600 rounded-full"></div>
                )}
              </button>
              {/* NEW: My NETLIFEFLIX button */}
              <button
                onClick={() => setShowMyList(true)}
                className={`capitalize hover:text-white transition-all duration-300 text-lg font-semibold relative ${
                  showMyList ? 'text-white' : 'text-gray-400 hover:scale-105'
                }`}
              >
                My NETLIFEFLIX
                {showMyList && (
                  <div className="absolute -bottom-2 left-0 right-0 h-1 bg-red-600 rounded-full"></div>
                )}
              </button>
            </nav>
          </div>

          <div className="flex items-center gap-5">
            <div className="relative">
              <button
                onClick={() => setShowSearch(!showSearch)}
                className="p-3 hover:bg-gray-800/80 rounded-full transition-all duration-300 w-12 h-12 flex items-center justify-center text-gray-400 hover:text-white hover:scale-110"
              >
                <Search size={24} />
              </button>
              {showSearch && (
                <input
                  type="text"
                  placeholder="Search movies, series..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="absolute right-0 top-16 bg-gray-900/95 border border-gray-700 rounded-xl px-6 py-3 w-80 text-white placeholder-gray-400 focus:outline-none focus:border-red-600 backdrop-blur-sm shadow-2xl transition-all duration-300"
                  autoFocus
                />
              )}
            </div>

            <button className="p-3 hover:bg-gray-800/80 rounded-full transition-all duration-300 w-12 h-12 flex items-center justify-center text-gray-400 hover:text-white hover:scale-110">
              <Bell size={24} />
            </button>

            <div className="relative">
              <div
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="w-12 h-12 bg-gradient-to-r from-red-600 to-red-500 rounded-full flex items-center justify-center cursor-pointer hover:from-red-700 hover:to-red-600 transition-all duration-300 shadow-lg hover:scale-110"
              >
                {currentUser?.type === 'kids' ? <Baby size={24} /> : <User size={24} />}
              </div>
              {showUserMenu && (
                <div className="absolute right-0 top-16 bg-gray-900/95 border border-gray-700 rounded-xl p-6 w-72 backdrop-blur-sm shadow-2xl">
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-700">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-red-600 to-red-500 rounded-full flex items-center justify-center">
                        {currentUser?.type === 'kids' ? <Baby size={24} /> : currentUser?.avatar}
                      </div>
                      <span className="font-semibold text-lg">{currentUser?.name}</span>
                    </div>
                    <button onClick={() => setShowUserMenu(false)} className="text-gray-400 hover:text-white transition-colors">
                      <X size={24} />
                    </button>
                  </div>
                  <div className="space-y-3">
                    <button className="w-full text-left px-4 py-3 hover:bg-gray-800 rounded-lg flex items-center gap-4 transition-all duration-300">
                      <User size={20} />
                      Switch Profile
                    </button>
                    <button className="w-full text-left px-4 py-3 hover:bg-gray-800 rounded-lg flex items-center gap-4 transition-all duration-300">
                      <Baby size={20} />
                      Kids Profile
                    </button>
                    <button className="w-full text-left px-4 py-3 hover:bg-gray-800 rounded-lg flex items-center gap-4 transition-all duration-300">
                      <UserPlus size={20} />
                      Add New User
                    </button>
                    <hr className="border-gray-700 my-3" />
                    <button
                      onClick={() => { setShowUserMenu(false); setShowLandingPage(true); }}
                      className="w-full text-left px-4 py-3 hover:bg-gray-800 rounded-lg flex items-center gap-4 text-red-400 transition-all duration-300"
                    >
                      <LogOut size={20} />
                      Exit Profile
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Enhanced hero section */}
      {!searchQuery && !showMyList && (
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
      )}

      {/* NEW: Conditional rendering for My List view or main content */}
      <main className={`${!searchQuery && !showMyList ? 'pt-0' : 'pt-32'} pb-24`}>
        {showMyList ? (
          <section className="px-8">
            <h2 className="text-3xl font-bold mb-8">My NETLIFEFLIX List</h2>
            {favorites.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {favorites.map(item => (
                  <MovieCard key={item.id} movie={item} />
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-400 mt-20">
                <h3 className="text-2xl mb-4">Your list is empty.</h3>
                <p className="text-lg">Add movies and series to your list by clicking the **+** button!</p>
              </div>
            )}
          </section>
        ) : searchQuery ? (
          <section className="px-8">
            <h2 className="text-3xl font-bold mb-8">Search Results for "{searchQuery}"</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {filteredContent().map(item => (
                <MovieCard key={item.id} movie={item} />
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
            />
          ))
        )}
      </main>

      {/* --- Full-Screen Image View Modal --- */}
      {showFullView && selectedMovie && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm animate-fade-in-fast">
          <button
            onClick={() => setShowFullView(false)}
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
      )}

      {/* --- Info Modal --- */}
      {showInfoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-lg animate-fade-in-fast">
          <div className="bg-gray-900/90 border border-gray-700 rounded-3xl p-8 w-11/12 max-w-5xl max-h-[90vh] overflow-y-auto relative animate-scale-up-center shadow-2xl">
            <button
              onClick={() => setShowInfoModal(false)}
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
                    onClick={() => handleAddToFavorites(selectedMovie)}
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
      )}
    </div>
  );
};

export default App;