import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts';

export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
};

export function PublicRoute({ children }) {
  const { isAuthenticated, user } = useAuth();
  console.log('🚀 ~ PublicRoute ~ user:', user);
  console.log('🚀 ~ PublicRoute ~ isAuthenticated:', isAuthenticated);
  const location = useLocation();
  if (isAuthenticated) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }
  return children;
}
