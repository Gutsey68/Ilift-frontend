import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';

function PrivateRoute() {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);

  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
}

export default PrivateRoute;
