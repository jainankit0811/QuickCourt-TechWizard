import { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { courtService } from '../../services/auth.service.js';

function CourtManagement() {
  const { facilityId } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const [courts, setCourts] = useState([]);
  const [error, setError] = useState('');
  const facility = state?.facility;

  useEffect(() => {
    const fetchCourts = async () => {
      if (!facilityId) {
        console.error('facilityId is undefined'); // Debug
        setError('No facility ID provided');
        return;
      }
      try {
        console.log('Fetching courts for facilityId:', facilityId);
        const response = await courtService.getAllCourtsByFacility(facilityId);
        console.log('Courts response:', response);
        setCourts(response);
      } catch (err) {
        console.error('Fetch courts error:', err.response?.data);
        setError(err.response?.data?.message || 'Failed to fetch courts');
      }
    };
    fetchCourts();
  }, [facilityId]);

  if (!facilityId) {
    return (
      <div className="text-red-500 text-center mt-10">
        No facility ID provided. Please select a facility from the list.
        <button
          onClick={() => navigate('/owner')}
          className="mt-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg px-4 py-2"
        >
          Go to Facility List
        </button>
      </div>
    );
  }

  if (!facility) {
    return <div className="text-red-500 text-center mt-10">Facility information not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Court Management for {facility.name}</h2>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <div className="mb-6">
        <button
          onClick={() => navigate(`/owner/courts/create`, { state: { facility } })}
          className="text-white bg-blue-600 hover:bg-blue-700 rounded-lg px-4 py-2 mr-2"
        >
          Add New Court
        </button>
      </div>
      {courts.length === 0 ? (
        <p className="text-center">No courts available for this facility</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courts.map((court) => (
            <div key={court._id} className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold">{court.name}</h3>
              <p>Sport: {court.sportType}</p>
              <p>Price per Hour: ${court.pricePerHour}</p>
              <p>
                Operating Hours: {court.operatingHours.start} - {court.operatingHours.end}
              </p>
              <button
                onClick={() => navigate(`/owner/courts/update/${court._id}`, { state: { facility, court } })}
                className="mt-2 text-black bg-yellow-600 hover:bg-yellow-700 rounded-lg px-4 py-2"
              >
                Update Court
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CourtManagement;