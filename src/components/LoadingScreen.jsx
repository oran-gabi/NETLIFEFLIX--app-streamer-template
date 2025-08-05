import React from 'react';

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-[200] overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-red-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-800/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-red-500/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '0.5s' }}></div>
      </div>

      <div className="text-center relative z-10 space-y-8">
        {/* Main logo with enhanced animation */}
        <div className="mb-12">
          <h1 className="text-6xl md:text-8xl font-bold text-transparent bg-gradient-to-r from-red-600 via-red-500 to-red-400 bg-clip-text drop-shadow-2xl animate-pulse">
            NETLIFEFLIX
          </h1>
        </div>

        {/* Custom loading spinner */}
        <div className="flex justify-center mb-8">
          <div className="relative w-16 h-16">
            {/* Outer ring */}
            <div className="absolute inset-0 border-4 border-gray-700 rounded-full"></div>
            {/* Spinning red arc */}
            <div className="absolute inset-0 border-4 border-transparent border-t-red-600 rounded-full animate-spin"></div>
            {/* Inner pulsing dot */}
            <div className="absolute inset-4 bg-red-600 rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* Loading text with typing animation */}
        <div className="space-y-4">
          <p className="text-xl text-gray-300 font-light animate-pulse">
            Loading your entertainment...
          </p>
          
          {/* Animated dots */}
          <div className="flex justify-center space-x-1">
            <div className="w-2 h-2 bg-red-600 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-red-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-red-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-80 mx-auto mt-12">
          <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-red-600 to-red-500 rounded-full animate-pulse progress-bar"></div>
          </div>
        </div>
      </div>

      {/* Custom CSS for the progress bar animation */}
      <style jsx>{`
        .progress-bar {
          animation: loadingProgress 3s ease-in-out infinite;
        }
        
        @keyframes loadingProgress {
          0% { width: 0%; }
          50% { width: 70%; }
          100% { width: 100%; }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 1s ease-out;
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;