import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle, Polyline } from "react-leaflet";
import { MapPin, Navigation, Clock, Star, Phone, Calendar, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

const userLocation = { lat: 24.525049, lng: 73.677116 };

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// Sport Courts Data
const sportCourts = [
  {
    id: 1,
    name: "Narendra Modi Stadium",
    type: "Cricket",
    lat: 23.0917,
    lng: 72.5975,
    rating: 4.8,
    price: "₹2000/hour",
    phone: "+91 79 2656 5000",
    image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    amenities: ["Parking", "Cafeteria", "Changing Rooms", "First Aid"],
    openTime: "6:00 AM - 10:00 PM"
  },
  {
    id: 2,
    name: "Rajiv Gandhi Sports Complex",
    type: "Multi-Sport",
    lat: 24.6208, 
    lng: 73.8370,
    rating: 4.5,
    price: "₹800/hour",
    phone: "+91 294 242 8888",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    amenities: ["Swimming Pool", "Gym", "Tennis Courts", "Basketball Court"],
    openTime: "5:00 AM - 11:00 PM"
  },
  {
    id: 3,
    name: "City Sports Arena",
    type: "Football",
    lat: 24.5854,
    lng: 73.7125,
    rating: 4.3,
    price: "₹1200/hour",
    phone: "+91 294 251 0000",
    image: "https://images.unsplash.com/photo-1459865264687-595d652de67e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    amenities: ["Floodlights", "Spectator Stands", "Parking", "Refreshments"],
    openTime: "6:00 AM - 9:00 PM"
  }
];

// Distance calculation function
function getDistance(lat1, lng1, lat2, lng2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLng = (lng2 - lng1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLng / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return (R * c).toFixed(1);
}

// Custom marker icons
const createCustomIcon = (color) => {
  return L.divIcon({
    html: `<div style="background-color: ${color}; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
    className: 'custom-marker',
    iconSize: [20, 20],
    iconAnchor: [10, 10]
  });
};

const Leaflet = () => {
  const [selectedCourt, setSelectedCourt] = useState(null);
  const [mapCenter, setMapCenter] = useState([24.0, 73.0]);

  // Create polylines for all courts
  const polylines = sportCourts.map(court => [
    [userLocation.lat, userLocation.lng],
    [court.lat, court.lng]
  ]);

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-lg z-10 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link 
                to="/" 
                className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors duration-200"
              >
                <ArrowLeft size={20} />
                <span className="font-medium">Back to Home</span>
              </Link>
              <div className="h-6 w-px bg-gray-300"></div>
              <h1 className="text-2xl font-bold text-gray-900">Sports Venue Map</h1>
            </div>
            
            <div className="flex items-center space-x-2 bg-blue-50 px-4 py-2 rounded-full">
              <MapPin className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-medium text-blue-800">Udaipur, Rajasthan</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex">
        {/* Map Container */}
        <div className="flex-1 relative">
          <MapContainer 
            center={mapCenter} 
            zoom={8} 
            style={{ height: "100%", width: "100%" }}
            className="z-0"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* User Location Marker */}
            <Marker 
              position={[userLocation.lat, userLocation.lng]}
              icon={createCustomIcon('#3B82F6')}
            >
              <Popup className="custom-popup">
                <div className="p-2">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <Navigation className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Your Location</h3>
                      <p className="text-sm text-gray-600">Udaipur, Rajasthan</p>
                    </div>
                  </div>
                </div>
              </Popup>
            </Marker>

            {/* User Location Circle */}
            <Circle 
              center={[userLocation.lat, userLocation.lng]} 
              radius={15000} 
              color="#3B82F6" 
              fillColor="#3B82F6"
              fillOpacity={0.1}
              weight={2}
            />

            {/* Sport Courts Markers */}
            {sportCourts.map((court) => {
              const distance = getDistance(userLocation.lat, userLocation.lng, court.lat, court.lng);
              return (
                <Marker 
                  key={court.id} 
                  position={[court.lat, court.lng]}
                  icon={createCustomIcon('#EF4444')}
                  eventHandlers={{
                    click: () => setSelectedCourt(court)
                  }}
                >
                  <Popup className="custom-popup">
                    <div className="p-2 min-w-[250px]">
                      <img 
                        src={court.image} 
                        alt={court.name}
                        className="w-full h-32 object-cover rounded-lg mb-3"
                      />
                      <h3 className="font-bold text-gray-900 mb-1">{court.name}</h3>
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium">
                          {court.type}
                        </span>
                        <div className="flex items-center space-x-1">
                          <Star className="w-3 h-3 text-yellow-400 fill-current" />
                          <span className="text-xs font-medium text-gray-700">{court.rating}</span>
                        </div>
                      </div>
                      <div className="space-y-1 text-sm text-gray-600">
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-3 h-3" />
                          <span>{distance} km away</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="w-3 h-3" />
                          <span>{court.openTime}</span>
                        </div>
                        <div className="font-semibold text-gray-900 mt-2">
                          {court.price}
                        </div>
                      </div>
                      <button 
                        onClick={() => setSelectedCourt(court)}
                        className="w-full mt-3 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm font-medium"
                      >
                        View Details
                      </button>
                    </div>
                  </Popup>
                </Marker>
              );
            })}

            {/* Distance Lines */}
            {polylines.map((line, index) => (
              <Polyline 
                key={index}
                positions={line} 
                color="#EF4444" 
                weight={2} 
                opacity={0.6}
                dashArray="5, 10"
              />
            ))}
          </MapContainer>

          {/* Map Legend */}
          <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg p-4 z-10">
            <h3 className="font-semibold text-gray-900 mb-3">Map Legend</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow"></div>
                <span className="text-sm text-gray-700">Your Location</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-red-500 rounded-full border-2 border-white shadow"></div>
                <span className="text-sm text-gray-700">Sports Venues</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-1 bg-red-500 opacity-60" style={{borderStyle: 'dashed'}}></div>
                <span className="text-sm text-gray-700">Distance</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-96 bg-white shadow-xl overflow-y-auto">
          {selectedCourt ? (
            /* Venue Details */
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">Venue Details</h2>
                <button 
                  onClick={() => setSelectedCourt(null)}
                  className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                >
                  ×
                </button>
              </div>
              
              <img 
                src={selectedCourt.image} 
                alt={selectedCourt.name}
                className="w-full h-48 object-cover rounded-xl mb-4"
              />
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{selectedCourt.name}</h3>
                  <div className="flex items-center space-x-3 mb-3">
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                      {selectedCourt.type}
                    </span>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="font-medium text-gray-700">{selectedCourt.rating}</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">Distance</div>
                    <div className="font-semibold text-gray-900">
                      {getDistance(userLocation.lat, userLocation.lng, selectedCourt.lat, selectedCourt.lng)} km
                    </div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">Price</div>
                    <div className="font-semibold text-gray-900">{selectedCourt.price}</div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <Clock className="w-4 h-4 text-gray-600" />
                    <span className="font-medium text-gray-900">Opening Hours</span>
                  </div>
                  <p className="text-gray-700">{selectedCourt.openTime}</p>
                </div>

                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <Phone className="w-4 h-4 text-gray-600" />
                    <span className="font-medium text-gray-900">Contact</span>
                  </div>
                  <p className="text-gray-700">{selectedCourt.phone}</p>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Amenities</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedCourt.amenities.map((amenity, index) => (
                      <span 
                        key={index}
                        className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-3 pt-4">
                  <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium flex items-center justify-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>Book Now</span>
                  </button>
                  <button className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium">
                    Get Directions
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Venue List */
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Nearby Venues</h2>
              <div className="space-y-4">
                {sportCourts.map((court) => {
                  const distance = getDistance(userLocation.lat, userLocation.lng, court.lat, court.lng);
                  return (
                    <div 
                      key={court.id}
                      onClick={() => setSelectedCourt(court)}
                      className="bg-gray-50 rounded-xl p-4 cursor-pointer hover:bg-gray-100 transition-colors duration-200"
                    >
                      <div className="flex space-x-3">
                        <img 
                          src={court.image} 
                          alt={court.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-1">{court.name}</h3>
                          <div className="flex items-center space-x-2 mb-2">
                            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium">
                              {court.type}
                            </span>
                            <div className="flex items-center space-x-1">
                              <Star className="w-3 h-3 text-yellow-400 fill-current" />
                              <span className="text-xs font-medium text-gray-700">{court.rating}</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">{distance} km away</span>
                            <span className="font-semibold text-gray-900">{court.price}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Leaflet;