import { useNavigate } from 'react-router-dom';
import { authService } from '../../src/services/auth.service.js';

function Navbar() {
  const navigate = useNavigate();
  const user = authService.getCurrentUser();

  const handleLogout = async () => {
    try {
      await authService.logout();
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-xl font-bold">QuickCourt</div>
        <div className="space-x-4">
          {user ? (
            <>
              <span className="text-white">Welcome, {user.fullName} ({user.role})</span>
              <a href="/facilities" className="text-white hover:underline">Venues</a>
              {user.role === 'user' && (
                <a href="/user" className="text-white hover:underline">User Dashboard</a>
              )}
              {user.role === 'facility_owner' && (
                <>
                  <a href="/owner" className="text-white hover:underline">Owner Dashboard</a>
                  <a href="/facilities/create" className="text-white hover:underline">Create Facility</a>
                  <a href="/courts/create" className="text-white hover:underline">Create Court</a>
                </>
              )}
              {user.role === 'admin' && (
                <a href="/admin" className="text-white hover:underline">Admin Dashboard</a>
              )}
              <button onClick={handleLogout} className="text-white hover:underline">Logout</button>
            </>
          ) : (
            <>
              <a href="/login" className="text-white hover:underline">Login</a>
              <a href="/signup" className="text-white hover:underline">Signup</a>
              <a href="/facilities" className="text-white hover:underline">Venues</a>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
