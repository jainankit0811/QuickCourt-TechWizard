// src/App.js
import React, { useRef } from 'react';
import Navbar from '../components/Navbar';
import searchloc from "../assets/searchloc.png"
import { Link } from 'react-router-dom';

function Home() {
  const venueRef = useRef(null);
  const sportRef = useRef(null);
0
  const venues = [
    { name: 'SBR Badminton', rating: 4.5, location: 'City Center' },
    { name: 'Elite Tennis Hub', rating: 4.7, location: 'Downtown' },
    { name: 'Pro Cricket Arena', rating: 4.3, location: 'Suburbs' },
    { name: 'Skyline Football Ground', rating: 4.8, location: 'North City' },
    { name: 'Royal Squash Court', rating: 4.2, location: 'West End' },
    { name: 'Urban Basketball Court', rating: 4.6, location: 'East Side' },
    { name: 'Premier Volleyball Arena', rating: 4.4, location: 'South Park' },
    { name: 'Elite Golf Range', rating: 4.9, location: 'Countryside' },
  ];
const sportImages = {
  Football: 'https://cdn.britannica.com/63/211663-050-A674D74C/Jonny-Bairstow-batting-semifinal-match-England-Australia-2019.jpg',
  Basketball: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT25vDT9TCBHDRKO6gsqfy4cHCK124wa3ulx3ykwsvcEfScwhn9mKXSaUEK5RytuCUs4WI&usqp=CAU',
};
  const sports = [
    'Badminton',
    'Tennis',
    'Cricket',
    'Football',
    'Squash',
    'Basketball',
    'Volleyball',
    'Golf',
    'Table Tennis',
    'Swimming',
  ];

  const scrollLeft = (ref) => {
    if (ref.current) {
      ref.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = (ref) => {
    if (ref.current) {
      ref.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans px-10">
      {/* Header */}

        <Navbar/>

      {/* Main Section */}
      <main className="flex flex-col md:flex-row items-center justify-between px-10 py-12 bg-white gap-8">
<div className="md:w-1/2 mb-8 md:mb-0">
  {/* Search Input with Icon */}
  <div className="relative mb-6">
    <input
      type="text"
      placeholder="Search location..."
      className="w-1/2 pl-12 pr-4 py-2 text-2xl border-b-2 text-left border-gray-500 focus:outline-none focus:border-blue-500"
    />
    <img
      src={searchloc}
      alt="Search Icon"
      className="absolute left-2 top-1/2 transform -translate-y-1/2 w-8 h-8"
    />
  </div>

  {/* Headings */}
  <h1 className="text-4xl font-bold mb-2">FIND PLAYERS AND VENUES</h1>
  <h1 className="text-4xl font-bold mb-2">Nearby</h1>

  {/* Description */}
  <p className="text-lg mt-4 text-gray-600 mb-4 w-1/2">
    Discover the best sports venues and connect with players in your area. Book your spot easily and start playing today!
  </p>
</div>       
 <div className="md:w-1/2">
          <img
            src="https://img.freepik.com/free-vector/sport-text-banner-poster-design_1308-132612.jpg?semt=ais_hybrid&w=740&q=80"
            alt="Sports Arena"
            className="w-full object-contain h-auto rounded-lg "
          />
        </div>
      </main>

      {/* Book Venues Section */}

      <Link to="/VenueDetails">
      
      <section className="py-12  px-10">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Book Venues</h2>
          <button className="text-blue-600 hover:underline"><Link to="/VenuePage"><h2>See All venues</h2></Link></button>
        </div>
        <div className="relative">
          <div
            ref={venueRef}
            className="flex overflow-x-auto gap-6 pb-4 scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }} // Hide scrollbar for Firefox and IE
          >
            {venues.map((venue, index) => (
              <div
              key={index}
  className="bg-white rounded-xl shadow-md overflow-hidden w-[280px] min-h-60 flex-shrink-0 transform transition duration-300 hover:scale-105 hover:shadow-xl"
>
  {/* Image */}
  <img
    src="https://www.meetingstoday.com/sites/default/files/styles/mt_default/public/2022-12/Petco%20Park%202_RESIZEDHEROjpg.jpg?itok=yp6AajZG"
    alt={venue.name}
    className="w-full h-48 object-cover"
  />

  {/* Content */}
  <div className="p-4 space-y-3">
    {/* Title & Rating */}
    <div className="flex justify-between items-center">
      <h3 className="text-xl font-semibold">{venue.name}</h3>
      <div className="flex ">
        <span className="text-yellow-500">★★★★★</span>
        <span className="ml-1 text-sm text-gray-700">{venue.rating}</span>
      </div>
    </div>

    {/* Location */}
    <p className="text-gray-600 text-sm">Location: {venue.location}</p>

    {/* Tags */}
    <div className="flex flex-wrap gap-2">
      <button className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">
        {venue.name.split(' ')[1]}
      </button>
      <button className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">
        Outdoor
      </button>
      <button className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">
        Top Rated
      </button>
      <button className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">
        Budget
      </button>
    </div>
  </div>
</div>

            ))}
          </div>
          <div className="flex justify-between mt-6">
            <button
              onClick={() => scrollLeft(venueRef)}
              className="bg-blue-600 text-black px-4 py-2 rounded-md"
            >
              Left
            </button>
            <button
              onClick={() => scrollRight(venueRef)}
              className="bg-blue-600 text-black px-4 py-2 rounded-md"
              >
              Right
            </button>
          </div>
        </div>
      </section>
              </Link>

      {/* Popular Sports Section */}
     <section className="py-12 bg-white px-10">
  <h2 className="text-3xl font-bold mb-8">Popular Sports</h2>
  <div className="relative">
    <div
      ref={sportRef}
      className="flex overflow-x-auto gap-6 pb-4 scrollbar-hide"
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
    >
      {sports.map((sport, index) => (
        <div
          key={index}
          className="relative rounded-lg overflow-hidden min-w-[250px] flex-shrink-0"
        >
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT25vDT9TCBHDRKO6gsqfy4cHCK124wa3ulx3ykwsvcEfScwhn9mKXSaUEK5RytuCUs4WI&usqp=CAU"
            alt={sport}
            className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
          />
          <div className="absolute inset-0  bg-opacity-40 flex items-center justify-center">
            <h3 className="text-white text-2xl font-bold">{sport}</h3>
          </div>
        </div>
      ))}
    </div>
    <div className="flex justify-between mt-6">
      <button
        onClick={() => scrollLeft(sportRef)}
        className="bg-blue-600 text-white px-4 py-2 rounded-md"
      >
        Left
      </button>
      <button
        onClick={() => scrollRight(sportRef)}
        className="bg-blue-600 text-white px-4 py-2 rounded-md"
      >
        Right
      </button>
    </div>
  </div>
</section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6 px-10 text-center">
        <p>&copy; 2025 QuickCourt. All rights reserved.</p>
        <div className="mt-2">
          <a href="#" className="text-gray-400 hover:text-white mx-2">Privacy Policy</a>
          <a href="#" className="text-gray-400 hover:text-white mx-2">Terms of Service</a>
        </div>
      </footer>
    </div>
  );
}

export default Home;