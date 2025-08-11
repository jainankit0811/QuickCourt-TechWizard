import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CourtBooking from '../screen/user/CourtBooking.jsx';
import Home from '../screen/user/Home.jsx';
import Login from '../screen/user/Login.jsx';
import MyBookings from '../screen/user/MyBookings.jsx';
import Profile from '../screen/user/Profile.jsx';
import Signup from '../screen/user/Signup.jsx';
import VenueDetails from '../screen/user/VenueDetail.jsx';
import VenuePage from '../screen/user/VenuePage.jsx';

function UserRouter() {
  return (
    <div className='min-w-screen bg-white'>

      <BrowserRouter>
        <Routes>
          <Route path="/user" element={<Home />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/VenueDetails" element={<VenueDetails />} />
          <Route path="/VenuePage" element={<VenuePage />} />
          <Route path="/book/:id" element={<CourtBooking />} />
          <Route path="/my-bookings" element={<MyBookings />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default UserRouter;