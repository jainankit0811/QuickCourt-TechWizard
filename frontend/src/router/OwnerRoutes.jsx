import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout.jsx";
import BookingOverview from "../screen/owner/BookingOverview.jsx";
import CourtManagement from "../screen/owner/CourtManagement.jsx";
import Dashboard from "../screen/owner/Dashboard.jsx";
import FacilityManagement from "../screen/owner/FacilityManagement.jsx";
import Profile from "../screen/owner/Profile.jsx";
import TimeSlotManagement from "../screen/owner/TimeSlotManagement.jsx";
import ProtectedRoute from '../components/ProctedRoute.jsx';
import CreateFacility from "../screen/owner/CreateFacility.jsx";
import FacilityDetail from "../screen/owner/FacilityDetails.jsx";
import FacilityList from "../screen/owner/FacilityList.jsx";
import CreateCourt from "../screen/owner/CreateCourt.jsx";
import Court from "../screen/owner/Court.jsx";

const OwnerRoutes = () => {
    return (
      <>
      
  <Route path="/owner" element={<DashboardLayout />}>
    {/* Dashboard at /owner */}
    <Route index element={<Dashboard />} />

    {/* Facilities at /owner/facilities */}
    <Route path="facilities" element={<FacilityManagement />} />

    {/* Create Facility at /owner/facilities/create */}
    <Route
      path="facilities/create"
      element={
        <ProtectedRoute roles={['facility_owner']}>
          <CreateFacility />
        </ProtectedRoute>
      }
      />
      <Route path="facilitieslist" element={        <ProtectedRoute roles={['facility_owner']}>
          <FacilityList />
        </ProtectedRoute>
} />
    <Route
      path="facilities/:id"
      element={
        <ProtectedRoute roles={['facility_owner']}>
          <FacilityDetail />
        </ProtectedRoute>
      }
    />
    <Route
      path="court/:facilityId"
      element={
        <ProtectedRoute roles={['facility_owner']}>
          <Court/>
        </ProtectedRoute>
      }
    />

    {/* Courts at /owner/courts */}
    <Route path="courts" element={<CourtManagement />} />

    <Route
      path="courts/create"
      element={
        <ProtectedRoute roles={['facility_owner']}>
          <CreateCourt />
        </ProtectedRoute>
      }
    />


    {/* Time Slots at /owner/time-slots */}
    <Route path="time-slots" element={<TimeSlotManagement />} />

    {/* Bookings at /owner/bookings */}
    <Route path="bookings" element={<BookingOverview />} />

    {/* Profile at /owner/profile */}
    <Route path="profile" element={<Profile />} />
  </Route>
        </>
    );
}

export default OwnerRoutes;

