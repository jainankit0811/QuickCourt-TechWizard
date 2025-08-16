import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { facilityService } from '../../services/auth.service.js';

function FacilityList() {
  const [venues, setVenues] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const data = await facilityService.getAllVenues();
        setVenues(data);
      } catch (err) {
        setError(err);
      }
    };
    fetchVenues();
  }, []);

  if (error) {
    return <div className="text-red-500 text-center mt-10">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Sports Venues</h2>
      {venues.length === 0 ? (
        <p className="text-center">No venues available</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {venues.map((venue) => (
            <div key={venue._id} className="bg-white p-4 rounded-lg shadow">
              <img
                src={venue.photos[0] || 'https://via.placeholder.com/300'}
                alt={venue.name}
                className="w-full h-40 object-cover rounded-md mb-2"
              />
              <h3 className="text-lg font-semibold">{venue.name}</h3>
              <p>Location: {venue.location}</p>
              <p>Sports: {venue.sportsSupported.join(', ')}</p>
              <button
                onClick={() => navigate(`/owner/facilities/${venue._id}`)}
                className="mt-2 text-black bg-blue-600 hover:bg-blue-700 rounded-lg px-4 py-2"
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FacilityList;
