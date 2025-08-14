import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CourtBooking from '../screen/user/CourtBooking.jsx';
import Home from '../screen/user/Home.jsx';
import Login from '../screen/user/Login.jsx';
import MyBookings from '../screen/user/MyBookings.jsx';
import Profile from '../screen/user/Profile.jsx';
import Signup from '../screen/user/Signup.jsx';
import VenueDetails from '../screen/user/VenueDetail.jsx';
import VenuePage from '../screen/user/VenuePage.jsx';
import Facility from '../screen/user/FacilityList.jsx';
import FacilityDetail from '../screen/user/FacilityDetails.jsx';
import CreateFacility from '../screen/user/CreateFacility.jsx';
import UpdateFacility from '../screen/user/UpdateFacility.jsx';
import CreateCourt from '../screen/user/CreateCourt.jsx';
import UpdateCourt from '../screen/user/UpdateCourt.jsx';
import BlockTimeSlot from '../screen/user/BlockTimeSlot.jsx';
import ApproveFacility from '../screen/user/ApproveFacility.jsx'; // Make sure this is imported
import ProtectedRoute from '../components/ProctedRoute.jsx';
import Header from '../screen/user/Leaflet.jsx';
import LandingPage from '../screen/LandingPage.jsx';
import Leaflet from '../screen/user/Leaflet.jsx';


function UserRouter() {
  return (
    <div className='min-w-screen bg-white'>
      <BrowserRouter>
        {/* <Routes>
          <Route path="/user" element={<Home />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Login" element={<Login />} />

          <Route path="/facilities" element={<Facility />} />
          <Route path="/facilities/:id" element={<FacilityDetail />} />
<Route path="/facilities/create" element={<CreateFacility />} />
          <Route path="/facilities/:id/update" element={<UpdateFacility />} />
          <Route path="/facilities/approve/:id" element={<ApproveFacility />} />
          <Route path="/courts/create" element={<CreateCourt />} />
          <Route path="/courts/:id/update" element={<UpdateCourt />} />
          <Route path="/courts/:courtId/block-slot" element={<BlockTimeSlot />} />

          <Route path="/venueDetails" element={<VenueDetails />} />
          <Route path="/venuePage" element={<VenuePage />} />
          <Route path="/book/:id" element={<CourtBooking />} />
          <Route path="/my-bookings" element={<MyBookings />} />
          <Route path="/profile" element={<Profile />} />
        </Routes> */}

              <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/user" element={<Home />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/facilities" element={<Facility />} />
        <Route path="/facilities/:id" element={<FacilityDetail />} />
        <Route path="/venueDetails" element={<VenueDetails />} />
        <Route path="/venuePage" element={<VenuePage />} />
        <Route path="/Leaflet" element={<Leaflet/>} />

        <Route
          path="/book/:id"
          element={
            <ProtectedRoute roles={['user', 'facility_owner', 'admin']}>
              <CourtBooking />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-bookings"
          element={
            <ProtectedRoute roles={['user', 'facility_owner', 'admin']}>
              <MyBookings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute roles={['user', 'facility_owner', 'admin']}>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/facilities/create"
          element={
            <ProtectedRoute roles={['facility_owner']}>
              <CreateFacility />
            </ProtectedRoute>
          }
        />
        <Route
          path="/facilities/:id/update"
          element={
            <ProtectedRoute roles={['facility_owner']}>
              <UpdateFacility />
            </ProtectedRoute>
          }
        />
        <Route
          path="/courts/create"
          element={
            <ProtectedRoute roles={['facility_owner']}>
              <CreateCourt />
            </ProtectedRoute>
          }
        />
        <Route
          path="/courts/:id/update"
          element={
            <ProtectedRoute roles={['facility_owner']}>
              <UpdateCourt />
            </ProtectedRoute>
          }
        />
        <Route
          path="/courts/:courtId/block-slot"
          element={
            <ProtectedRoute roles={['facility_owner']}>
              <BlockTimeSlot />
            </ProtectedRoute>
          }
        />
        <Route
          path="/facilities/approve/:id"
          element={
            <ProtectedRoute roles={['admin']}>
              <ApproveFacility />
            </ProtectedRoute>
          }
        />
      </Routes>

      </BrowserRouter>
    </div>
  );
}

export default UserRouter;
