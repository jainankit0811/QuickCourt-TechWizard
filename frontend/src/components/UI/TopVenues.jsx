import React from 'react';
import { Star, MapPin, Clock } from 'lucide-react';

const TopVenues = () => {
  const venues = [
    {
      id: 1,
      name: 'Elite Sports Complex',
      rating: 4.8,
      location: 'City Center',
      image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80',
      sports: ['Basketball', 'Tennis', 'Badminton'],
      price: '₹500/hour',
      availability: 'Available Now'
    },
    {
      id: 2,
      name: 'Premier Tennis Hub',
      rating: 4.7,
      location: 'Downtown',
      image: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80',
      sports: ['Tennis', 'Squash'],
      price: '₹800/hour',
      availability: '2 slots left'
    },
    {
      id: 3,
      name: 'Urban Football Arena',
      rating: 4.9,
      location: 'North City',
      image: 'https://images.unsplash.com/photo-1459865264687-595d652de67e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80',
      sports: ['Football', 'Cricket'],
      price: '₹1200/hour',
      availability: 'Available Now'
    },
    {
      id: 4,
      name: 'Royal Badminton Center',
      rating: 4.6,
      location: 'West End',
      image: 'https://images.unsplash.com/photo-1544966503-7cc4ac882d5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80',
      sports: ['Badminton', 'Table Tennis'],
      price: '₹400/hour',
      availability: 'Available Now'
    },
    {
      id: 5,
      name: 'Aquatic Sports Hub',
      rating: 4.5,
      location: 'South Park',
      image: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80',
      sports: ['Swimming', 'Water Polo'],
      price: '₹300/hour',
      availability: '5 slots left'
    },
    {
      id: 6,
      name: 'Golf Excellence Range',
      rating: 4.9,
      location: 'Countryside',
      image: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80',
      sports: ['Golf'],
      price: '₹2000/hour',
      availability: 'Available Now'
    }
  ];

  return (
    <section id="venues" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Top Rated <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Venues</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover premium sports facilities with world-class amenities and professional-grade equipment
          </p>
        </div>

        {/* Venues Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {venues.map((venue) => (
            <div
              key={venue.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group"
            >
              {/* Image */}
              <div className="relative overflow-hidden">
                <img
                  src={venue.image}
                  alt={venue.name}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-semibold text-gray-800">{venue.rating}</span>
                  </div>
                </div>
                <div className="absolute top-4 left-4 bg-green-500 text-white text-xs px-3 py-1 rounded-full font-medium">
                  {venue.availability}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{venue.name}</h3>
                
                <div className="flex items-center text-gray-600 mb-3">
                  <MapPin size={16} className="mr-2" />
                  <span className="text-sm">{venue.location}</span>
                </div>

                {/* Sports Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {venue.sports.map((sport, index) => (
                    <span
                      key={index}
                      className="bg-blue-50 text-blue-600 text-xs px-3 py-1 rounded-full font-medium"
                    >
                      {sport}
                    </span>
                  ))}
                </div>

                {/* Price and Booking */}
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-gray-900">{venue.price}</span>
                  </div>
                  <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 text-sm font-semibold">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 text-lg font-semibold">
            View All Venues
          </button>
        </div>
      </div>
    </section>
  );
};

export default TopVenues;