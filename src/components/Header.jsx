import React from 'react';
import { Search, Bell, User, X, UserPlus, Baby, LogOut } from 'lucide-react';

const Header = ({
  selectedCategory,
  setSelectedCategory,
  searchQuery,
  setSearchQuery,
  showSearch,
  setShowSearch,
  showUserMenu,
  setShowUserMenu,
  currentUser,
  showMyList,
  setShowMyList,
  setShowLandingPage
}) => {
  return (
    <header className="fixed top-0 w-full z-50 bg-black/40 backdrop-blur-xl border-b border-gray-800/50 transition-all duration-300">
      <div className="flex items-center justify-between px-8 py-5">
        <div className="flex items-center gap-10">
          <h1 className="text-red-600 text-4xl font-bold drop-shadow-lg">NETLIFEFLIX</h1>
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
  );
};

export default Header;