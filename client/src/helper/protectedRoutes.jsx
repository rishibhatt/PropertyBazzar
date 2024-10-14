import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function ProtectedRoute({ children }) {
  const { token } = useAuth();

  if (token && window.location.pathname === '/login') {
    // If the user is logged in, redirect them to the homepage (or any other page)
    return <Navigate to="/" />;
  }
  if (!token && window.location.pathname === '/profile')
  {
    return <Navigate to="/login" />;
  }

  if (!token && window.location.pathname === '/myproperty')
    {
      return <Navigate to="/login" />;
    }

  // If not logged in, render the requested component (e.g., Login)
  return children;
}

export default ProtectedRoute;
