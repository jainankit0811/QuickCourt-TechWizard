import React, { useState } from 'react';

const mockVenues = [
  {
    id: 1,
    name: 'Elite Sports Arena',
    sports: ['Football', 'Tennis'],
    price: 500,
    location: 'Ahmedabad, Gujarat',
    rating: 4.5,
    type: 'Outdoor',
  },
  {
    id: 2,
    name: 'Urban Playzone',
    sports: ['Basketball'],
    price: 300,
    location: 'Mumbai, Maharashtra',
    rating: 4.2,
    type: 'Indoor',
  },
  {
    id: 3,
    name: 'Sky Turf',
    sports: ['Cricket', 'Football'],
    price: 450,
    location: 'Pune, Maharashtra',
    rating: 4.7,
    type: 'Outdoor',
  },
  {
    id: 4,
    name: 'Arena X',
    sports: ['Badminton'],
    price: 250,
    location: 'Delhi',
    rating: 4.0,
    type: 'Indoor',
  },
  // Add more venues as needed
];

function VenuePage() {
  const [search, setSearch] = useState('');
  const [filteredVenues, setFilteredVenues] = useState(mockVenues);
  const [sport, setSport] = useState('');
  const [type, setType] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [minRating, setMinRating] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const venuesPerPage = 4;

  const handleSearch = (e) => {
    setSearch(e.target.value);
    const query = e.target.value.toLowerCase();
    const filtered = mockVenues.filter((venue) =>
      venue.name.toLowerCase().includes(query)
    );
    setFilteredVenues(filtered);
    setCurrentPage(1);
  };

  const applyFilters = () => {
    let filtered = mockVenues;

    if (sport) {
      filtered = filtered.filter((v) => v.sports.includes(sport));
    }
    if (type) {
      filtered = filtered.filter((v) => v.type === type);
    }
    if (maxPrice) {
      filtered = filtered.filter((v) => v.price <= parseInt(maxPrice));
    }
    if (minRating) {
      filtered = filtered.filter((v) => v.rating >= parseFloat(minRating));
    }

    if (search) {
      filtered = filtered.filter((v) =>
        v.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredVenues(filtered);
    setCurrentPage(1);
  };

  const paginatedVenues = filteredVenues.slice(
    (currentPage - 1) * venuesPerPage,
    currentPage * venuesPerPage
  );

  const totalPages = Math.ceil(filteredVenues.length / venuesPerPage);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Approved Sports Venues</h1>

      <input
        type="text"
        placeholder="Search for a venue..."
        value={search}
        onChange={handleSearch}
        className="w-full max-w-md px-4 py-2 mb-4 border rounded-md"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <select onChange={(e) => setSport(e.target.value)} className="px-4 py-2 border rounded-md">
          <option value="">Sport Type</option>
          <option value="Football">Football</option>
          <option value="Tennis">Tennis</option>
          <option value="Basketball">Basketball</option>
          <option value="Cricket">Cricket</option>
          <option value="Badminton">Badminton</option>
        </select>

        <select onChange={(e) => setType(e.target.value)} className="px-4 py-2 border rounded-md">
          <option value="">Venue Type</option>
          <option value="Indoor">Indoor</option>
          <option value="Outdoor">Outdoor</option>
        </select>

        <input
          type="number"
          placeholder="Max Price"
          onChange={(e) => setMaxPrice(e.target.value)}
          className="px-4 py-2 border rounded-md"
        />

        <input
          type="number"
          step="0.1"
          placeholder="Min Rating"
          onChange={(e) => setMinRating(e.target.value)}
          className="px-4 py-2 border rounded-md"
        />

        <button
          onClick={applyFilters}
          className="col-span-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
        >
          Apply Filters
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {paginatedVenues.map((venue) => (
          <div key={venue.id} className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-xl font-bold mb-2">{venue.name}</h2>
            <p><strong>Sport Type(s):</strong> {venue.sports.join(', ')}</p>
            <p><strong>Starting Price:</strong> ₹{venue.price}/hr</p>
            <p><strong>Location:</strong> {venue.location}</p>
            <p><strong>Rating:</strong> ⭐ {venue.rating}</p>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-6 space-x-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-4 py-2 rounded-md ${
              currentPage === i + 1 ? 'bg-blue-600 text-white' : 'bg-white border'
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default VenuePage;