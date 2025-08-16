
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { facilityService } from '../../services/auth.service.js';

function FacilityDetail() {
  const { id } = useParams();
  const [venue, setVenue] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVenue = async () => {
      try {
        const data = await facilityService.getVenueById(id);
        setVenue(data);
      } catch (err) {
        setError(err);
      }
    };
    fetchVenue();
  }, [id]);

  if (error) {
    return <div className="text-red-500 text-center mt-10">{error}</div>;
  }

  if (!venue) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">{venue.name}</h2>
      <div className="bg-white p-4 rounded-lg shadow max-w-2xl mx-auto">
        {venue.photos.length > 0 && (
          <img src={venue.photos[0]} alt={venue.name} className="w-full h-64 object-cover rounded-md mb-4" />
        )}
        <p><strong>Location:</strong> {venue.location}</p>
        <p><strong>Sports:</strong> {venue.sportsSupported.join(', ')}</p>
        <p><strong>Status:</strong> {venue.status}</p>
        <p><strong>Owner:</strong> {venue.owner?.fullName || 'Unknown'}</p>
        <button
          onClick={() => navigate('/facilities')}
          className="mt-4 text-black bg-blue-600 hover:bg-blue-700 rounded-lg px-4 py-2"
        >
          Back to Venues
        </button>
      </div>
    </div>
  );
}

export default FacilityDetail;
