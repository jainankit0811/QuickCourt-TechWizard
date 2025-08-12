import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout.jsx";
import BookingOverview from "../screen/owner/BookingOverview.jsx";
import CourtManagement from "../screen/owner/CourtManagement.jsx";
import Dashboard from "../screen/owner/Dashboard.jsx";
import FacilityManagement from "../screen/owner/FacilityManagement.jsx";
import Profile from "../screen/owner/Profile.jsx";
import TimeSlotManagement from "../screen/owner/TimeSlotManagement.jsx";
import ProtectedRoute from '../components/ProctedRoute.jsx';

const OwnerRoutes = () => {
    return (
        <div>
            <Router>
                <div className="App">
                    <Routes>
                        <Route path="/owner" element={<DashboardLayout />}>
                            <Route index element={<Dashboard />} />
                            <Route path="/owner/facilities" element={<FacilityManagement />} />
                            <Route path="/owner/courts" element={<CourtManagement />} />
                            <Route path="/owner/time-slots" element={<TimeSlotManagement />} />
                            <Route path="/owner/bookings" element={<BookingOverview />} />
                            <Route path="/owner/profile" element={<Profile />} />
                        </Route>
                    </Routes>
                </div>
            </Router>
        </div>
    );
}

export default OwnerRoutes;

