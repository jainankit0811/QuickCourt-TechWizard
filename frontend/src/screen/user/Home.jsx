// src/App.js
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import searchloc from "../../assets/searchloc.png";

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
    <div>

    <div className="min-h-screen bg-white font-sans px-10">      {/* Main Section */}

{/* Main Section */}
<main className="flex flex-col md:flex-row items-center justify-between px-10 py-12 bg-white gap-8">
  <div className="md:w-1/2 mb-8 md:mb-0">
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
    <h1 className="text-4xl font-bold mb-2">FIND PLAYERS AND VENUES</h1>
    <h1 className="text-4xl font-bold mb-2">Nearby</h1>
    <p className="text-lg mt-4 text-gray-600 mb-4 w-1/2">
      Discover the best sports venues and connect with players in your area. Book your spot easily and start playing today!
    </p>
  </div>
  <div className="md:w-1/2">
    <img
      src="https://blackandmcdonald.com/wp-content/uploads/Blog_Post-DSM-program-en-690x414.jpg"
      alt="Sports Arena"
      className="w-full object-contain h-auto rounded-lg"
    />
  </div>
</main>

{/* First Testimonial Section */}
<section className="py-12 px-10">
  <h2 className="text-3xl font-bold mb-8">Top Multi-Sport Venues</h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {[
      'https://4.imimg.com/data4/NY/QH/MY-14059388/multisport-court.jpg',
      'https://labonteconstructionllc.com/wp-content/uploads/2023/09/1Court1NoName.jpg',
      'https://sportcourt.com/nitropack_static/ovdGdIejWPhggxcBWEqbxrtlSwxDrgAC/assets/images/optimized/rev-7aee42b/sportcourt.com/wp-content/uploads/2024/09/SportCourtTennessee-2.24.25-3.webp',
      'https://www.sportcourtmn.com/portals/0/residentialIndoor_25.jpg',
      'https://media.creativehomes.com/255/2020/9/1/108_1970_Paris_Ave_N_Stillwater_MN_low_res_copy.jpg?width=1500&height=1000&fit=bounds&ois=cac32a5',
    ].map((url, index) => (
      <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300">
        <img src={url} alt={`Venue ${index + 1}`} className="w-full h-48 object-cover" />
        <div className="p-4">
          <h3 className="text-xl font-semibold">Venue {index + 1}</h3>
          <p className="text-gray-600 text-sm">Multi-sport facility</p>
        </div>
      </div>
    ))}
  </div>
</section>

{/* Second Testimonial Section */}
<section className="py-12 px-10 bg-gray-50">
  <h2 className="text-3xl font-bold mb-8">Popular Sports</h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {[
      {
        name: 'Cricket',
        url: 'https://plus.unsplash.com/premium_photo-1722351690065-210079a0a82c?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y3JpY2tldGVyc3xlbnwwfHwwfHx8MA%3D%3D',
      },
      {
        name: 'Table Tennis',
        url: 'https://media.gettyimages.com/id/603146146/photo/chinas-shuo-yan-wins-3-1-against-spains-jordi-morales-garcia-in-the-mens-singles-class-7.jpg?s=612x612&w=gi&k=20&c=GZMn0hj43bIIcKZsgkl13p7kExVUx8ZqBs5FzsabPPI=',
      },
      {
        name: 'Badminton',
        url: 'https://thegodofsports.com/wp-content/uploads/2024/10/players-playing-badminton-scaled-1.jpg',
      },
    ].map((sport, index) => (
      <div key={index} className="relative rounded-lg overflow-hidden shadow-md hover:shadow-xl transition duration-300">
        <img src={sport.url} alt={sport.name} className="w-full h-48 object-cover" />
        <div className="absolute inset-0 bg-opacity-40 flex items-center justify-center">
          <h3 className="text-white text-2xl font-bold">{sport.name}</h3>
        </div>
      </div>
    ))}
  </div>
</section>
    </div>

      {/* Footer */}
<footer className="bg-gray-900 text-white py-10 px-10">
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
    {/* Row 1: About */}
    <div>
      <h3 className="text-xl font-bold mb-4">QuickCourt</h3>
      <p className="text-gray-400 text-sm">
        QuickCourt is your go-to platform for discovering and booking sports venues across the city. Whether you're into tennis, cricket, or swimming — we've got you covered.
      </p>
    </div>

    {/* Row 2: Navigation */}
    <div>
      <h3 className="text-xl font-bold mb-4">Explore</h3>
      <ul className="space-y-2 text-gray-400 text-sm">
        <li><a href="/facilities" className="hover:text-white">Venues</a></li>
        <li><a href="/sports" className="hover:text-white">Popular Sports</a></li>
        <li><a href="/login" className="hover:text-white">Login</a></li>
        <li><a href="/signup" className="hover:text-white">Sign Up</a></li>
      </ul>
    </div>

    {/* Row 3: Contact */}
    <div>
      <h3 className="text-xl font-bold mb-4">Contact Us</h3>
      <p className="text-gray-400 text-sm">Email: support@quickcourt.com</p>
      <p className="text-gray-400 text-sm">Phone: +91 98765 43210</p>
      <div className="flex mt-4 space-x-4">
        <a href="#" className="text-gray-400 hover:text-white">Facebook</a>
        <a href="#" className="text-gray-400 hover:text-white">Instagram</a>
        <a href="#" className="text-gray-400 hover:text-white">Twitter</a>
      </div>
    </div>
  </div>

  {/* Bottom Section */}
  <div className="border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
    &copy; 2025 QuickCourt. All rights reserved.
    <div className="mt-2">
      <a href="#" className="hover:text-white mx-2">Privacy Policy</a>
      <a href="#" className="hover:text-white mx-2">Terms of Service</a>
    </div>

    {/* Map Link */}
    <div className="mt-4">
      <a
        href="/Header"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition"
      >
        <h2 className='text-white text-sm'>View Map</h2>
      </a>
    </div>
  </div>
</footer>
        </div>

  );
}

export default Home;