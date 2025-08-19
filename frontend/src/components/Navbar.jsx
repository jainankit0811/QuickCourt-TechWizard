import React, { useState } from 'react';
import { Menu, X, MapPin, User } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">Q</span>
            </div>
            <span className="text-2xl font-bold text-gray-900">QuickCourt</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#venues" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200">
              Venues
            </a>
            <a href="#sports" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200">
              Sports
            </a>
            <a href="#about" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200">
              About
            </a>
            <a href="#contact" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200">
              Contact
            </a>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors duration-200">
              <MapPin size={18} />
                          <a
                            href="/leaflet"
                          ><span>Find Location</span></a>
              
            </button>
            <button className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors duration-200">
              <User size={18} />
              <span>Login</span>
            </button>
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105">
              Sign Up
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-blue-600 transition-colors duration-200"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-4">
              <a href="#venues" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200">
                Venues
              </a>
              <a href="#sports" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200">
                Sports
              </a>
              <a href="#about" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200">
                About
              </a>
              <a href="#contact" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200">
                Contact
              </a>
              <div className="flex flex-col space-y-2 pt-4 border-t border-gray-200">
                <button className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors duration-200">
                  <MapPin size={18} />
                  <span>Find Location</span>
                </button>
                <button className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors duration-200">
                  <User size={18} />
                  <span>Login</span>
                </button>
                <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-200 mt-2">
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;