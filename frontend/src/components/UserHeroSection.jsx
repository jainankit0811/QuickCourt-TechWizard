import React from 'react';
import { Search, MapPin } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side */}
          <div className="space-y-8">
            {/* Search Bar */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MapPin className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search location..."
                className="block w-full pl-10 pr-3 py-4 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <button className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-md transition-colors duration-200">
                  <Search className="h-5 w-5" />
                </button>
              </div>
            </div>
            
            {/* Large Heading */}
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                FIND PLAYERS
                <br />
                <span className="text-blue-600">AND VENUES</span>
              </h1>
              
              {/* Small Text */}
              <p className="text-xl text-gray-600 leading-relaxed max-w-md">
                Easily explore sport venues and connect with players in your area
              </p>
            </div>
            
            <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 px-8 rounded-lg text-lg transition-colors duration-200 shadow-lg hover:shadow-xl">
              Start Exploring
            </button>
          </div>
          
          {/* Right Side - Image */}
          <div className="relative">
            <div className="aspect-w-16 aspect-h-12 rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://www.avantseating.com/wp-content/uploads/2020/08/sports-arena-7.jpg"
                alt="Sports Arena"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;