// src/pages/admin/FacilityApproval.js
import React, { useState, useEffect } from 'react';

// Mock data - In real app, fetch from API
const mockPendingFacilities = [
  {
    id: 1,
    name: 'Sports Arena',
    location: 'New York',
    description: 'Multi-sport facility',
    sports: ['Badminton', 'Tennis'],
    amenities: ['Parking', 'Showers'],
    photos: ['https://example.com/photo1.jpg', 'https://example.com/photo2.jpg'],
  },
  {
    id: 2,
    name: 'Turf Ground',
    location: 'Los Angeles',
    description: 'Football turf',
    sports: ['Football'],
    amenities: ['Lighting', 'Seating'],
    photos: ['https://example.com/photo3.jpg'],
  },
];

const FacilityApproval = () => {
  const [facilities, setFacilities] = useState([]);
  const [selectedFacility, setSelectedFacility] = useState(null);
  const [comment, setComment] = useState('');

  useEffect(() => {
    // Simulate API fetch
    // axios.get('/api/admin/pending-facilities').then(res => setFacilities(res.data));
    setFacilities(mockPendingFacilities);
  }, []);

  const handleApprove = (id) => {
    // axios.post(`/api/admin/approve-facility/${id}`, { comment });
    alert(`Approved facility ${id} with comment: ${comment}`);
    setFacilities(facilities.filter(f => f.id !== id));
    setSelectedFacility(null);
    setComment('');
  };

  const handleReject = (id) => {
    // axios.post(`/api/admin/reject-facility/${id}`, { comment });
    alert(`Rejected facility ${id} with comment: ${comment}`);
    setFacilities(facilities.filter(f => f.id !== id));
    setSelectedFacility(null);
    setComment('');
  };

  return (
    <div>
      <h1>Facility Approval</h1>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {facilities.map(facility => (
          <li key={facility.id} style={{ marginBottom: '10px' }}>
            <button onClick={() => setSelectedFacility(facility)}>
              {facility.name} - {facility.location}
            </button>
          </li>
        ))}
      </ul>
      {selectedFacility && (
        <div>
          <h2>Details for {selectedFacility.name}</h2>
          <p><strong>Description:</strong> {selectedFacility.description}</p>
          <p><strong>Sports:</strong> {selectedFacility.sports.join(', ')}</p>
          <p><strong>Amenities:</strong> {selectedFacility.amenities.join(', ')}</p>
          <div>
            <h3>Photos:</h3>
            {selectedFacility.photos.map((photo, index) => (
              <img key={index} src={photo} alt={`Photo ${index + 1}`} style={{ width: '200px', marginRight: '10px' }} />
            ))}
          </div>
          <div style={{ marginTop: '20px' }}>
            <label>Comment:</label>
            <textarea value={comment} onChange={e => setComment(e.target.value)} />
          </div>
          <button onClick={() => handleApprove(selectedFacility.id)}>Approve</button>
          <button onClick={() => handleReject(selectedFacility.id)}>Reject</button>
        </div>
      )}
    </div>
  );
};

export default FacilityApproval;