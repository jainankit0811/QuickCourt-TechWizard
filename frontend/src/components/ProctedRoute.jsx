import { Navigate } from 'react-router-dom';
import { authService } from '../services/auth.service';

function ProtectedRoute({ children, roles }) {
  const user = authService.getCurrentUser();
  const isAuthenticated = authService.isAuthenticated();

  if (!isAuthenticated) {
    console.log('ProtectedRoute: Redirecting to /login - Not authenticated');
    return <Navigate to="/login" />;
  }

  if (roles && !roles.includes(user?.role)) {
    console.log(`ProtectedRoute: Redirecting to /user - Role mismatch (user role: ${user?.role}, required: ${roles})`);
    return <Navigate to="/user" />;
  }

  return children;
}

export default ProtectedRoute;
