// App.js
import React from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// 🧍‍♂️ Udaipur (User Location)
const userLocation = { lat: 24.525049, lng: 73.677116 };

// 🏟️ Narendra Modi Stadium (Sport Court)
const sportCourts = [
  {
    id: 1,
    name: "Narendra Modi Stadium",
    type: "Cricket",
    lat: 23.0917,
    lng: 72.5975,
  },
];

// 📏 Distance Calculation Function
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
  return (R * c).toFixed(2);
}

// 🔗 Polyline Coordinates
const borderLine = [
  [userLocation.lat, userLocation.lng],
  [sportCourts[0].lat, sportCourts[0].lng],
];

// 🗺️ Main Component
function Header() {
  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <MapContainer center={[24.0, 73.0]} zoom={7} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* 👤 Udaipur Marker */}
        <Marker position={[userLocation.lat, userLocation.lng]}>
          <Popup>You are in Udaipur</Popup>
        </Marker>
        <Circle center={[userLocation.lat, userLocation.lng]} radius={10000} color="blue" />

        {/* 🏟️ Ahmedabad Stadium Marker */}
        {sportCourts.map((court) => {
          const distance = getDistance(userLocation.lat, userLocation.lng, court.lat, court.lng);
          return (
            <Marker key={court.id} position={[court.lat, court.lng]}>
              <Popup>
                <strong>{court.name}</strong><br />
                Type: {court.type}<br />
                Distance from Udaipur: {distance} km
              </Popup>
            </Marker>
          );
        })}

        {/* 🔴 Border Line */}
        <Polyline positions={borderLine} color="red" weight={3} />
      </MapContainer>
    </div>
  );
}

export default Header