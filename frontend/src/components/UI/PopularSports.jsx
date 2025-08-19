import { useEffect, useState } from 'react';
import { Users, TrendingUp } from 'lucide-react';
import { facilityService } from '../../services/auth.service.js';
import { useNavigate } from 'react-router-dom';

const PopularSports = () => {
  const [sports, setSports] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApprovedVenues = async () => {
      try {
        setLoading(true);
        const venues = await facilityService.getAllVenues({ status: 'approved' });
        console.log('Fetched venues:', venues); // Debug log
        // Aggregate venues by sport and select a representative photo
        const sportCounts = {};
        venues.forEach((venue) => {
          venue.sportsSupported.forEach((sport) => {
            if (!sportCounts[sport]) {
              sportCounts[sport] = {
                name: sport,
                venues: 0,
                players: 0,
                photo: venue.photos && venue.photos.length > 0 ? venue.photos[0] : null,
              };
            }
            sportCounts[sport].venues += 1;
            sportCounts[sport].players = sportCounts[sport].venues * 100; // Arbitrary calculation
            // Use the first available photo if not already set
            if (!sportCounts[sport].photo && venue.photos && venue.photos.length > 0) {
              sportCounts[sport].photo = venue.photos[0];
            }
          });
        });
        const sportList = Object.values(sportCounts).sort((a, b) => b.venues - a.venues).slice(0, 6); // Top 6 sports
        setSports(sportList.map((sport, index) => ({
          id: index + 1,
          name: sport.name,
          image: sport.photo || 'https://via.placeholder.com/300?text=' + sport.name, // Fallback to placeholder
          players: sport.players + '+',
          venues: sport.venues + '+',
          trending: index < 3,
        })));
      } catch (err) {
        console.error('Error fetching venues:', err); // Debug log
        setError(err.message || 'Failed to fetch venues');
      } finally {
        setLoading(false);
      }
    };
    fetchApprovedVenues();
  }, []);

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center mt-10">{error}</div>;
  }

  return (
    <section id="sports" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Popular <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Sports</span> in 2025
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join thousands of players in your favorite sports. From football to golf, find your game today
          </p>
        </div>

        {/* Sports Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sports.map((sport) => (
            <div
              key={sport.id}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              {/* Background Image with Overlay */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={sport.image}
                  alt={sport.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  onError={(e) => {
                    console.error(`Failed to load image for ${sport.name}: ${sport.image}`);
                    e.target.src = 'https://via.placeholder.com/300?text=' + sport.name; // Fallback on error
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                
                {/* Trending Badge */}
                {sport.trending && (
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center space-x-1">
                    <TrendingUp size={12} />
                    <span>Trending</span>
                  </div>
                )}

                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-2xl font-bold text-white mb-3">{sport.name}</h3>
                  
                  {/* Stats */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1 text-white/90">
                        <Users size={16} />
                        <span className="text-sm font-medium">{sport.players} Players</span>
                      </div>
                      <div className="text-white/90 text-sm font-medium">
                        {sport.venues} Venues
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-6">
                <button 
                  onClick={() => navigate('/venues', { state: { sport: sport.name } })}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 font-semibold"
                >
                  Find {sport.name} Venues
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center bg-white rounded-3xl shadow-lg p-12">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">
            Don't see your favorite sport?
          </h3>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            We're always adding new sports and venues. Contact us to request your favorite sport or suggest a venue.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 font-semibold">
              Request a Sport
            </button>
            <button className="border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-full hover:border-blue-600 hover:text-blue-600 transition-all duration-200 font-semibold">
              Suggest a Venue
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PopularSports;