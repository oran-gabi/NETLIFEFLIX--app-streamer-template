import React from 'react';
import { Baby, UserPlus } from 'lucide-react';

const LandingPage = ({ users, onUserSelect }) => {
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
              onClick={() => onUserSelect(user)}
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
};

export default LandingPage;