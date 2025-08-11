import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from '../pages/Home.jsx';

import VenueDetails from '../pages/VenueDetail.jsx';
import CourtBooking from '../pages/CourtBooking.jsx';
import MyBookings from '../pages/MyBookings.jsx';
import Profile from '../pages/Profile.jsx';
import Signup from '../pages/Signup.jsx';
import Login from '../pages/Login.jsx';
import VenuePage from '../pages/VenuePage.jsx';

function UserRouter() {
  return (
    <div className='min-w-screen bg-white'>

    <BrowserRouter>
    <Routes>
      <Route path="/user" element={<Home />} />
      <Route path="/Signup" element={<Signup />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/VenueDetails" element={<VenueDetails />} />
      <Route path="/VenuePage" element={<VenuePage/>} />
      <Route path="/book/:id" element={<CourtBooking />} />
      <Route path="/my-bookings" element={<MyBookings />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
    </BrowserRouter>
    </div>
  );
}

export default UserRouter;