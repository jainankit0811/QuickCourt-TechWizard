import { Route } from 'react-router-dom';
import Layout from '../components/Layout/Layout.jsx';
import Dashboard from '../screen/admin/Dashbord.jsx';
import FacilityApproval from '../screen/admin/FacilityApproval.jsx';
import Profile from '../screen/admin/Profile.jsx';
import ReportsModeration from '../screen/admin/ReportsModeration.jsx';
import UserManagement from '../screen/admin/UserManagement.jsx';

const AdminRoutes = () => (
  <>
    <Route path="/admin" element={<Layout />}>
      <Route index element={<Dashboard />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="facilities" element={<FacilityApproval />} />
      <Route path="users" element={<UserManagement />} />
      <Route path="reports" element={<ReportsModeration />} />
      <Route path="profile" element={<Profile />} />
    </Route>
  </>
);

export default AdminRoutes;