import { Outlet } from 'react-router-dom';
import { useAuthStore } from '../../stores/useAuthStore';

function PrivateRoute() {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);

  return isAuthenticated ? <Outlet /> : <Outlet />;
  //<Navigate to="/connexion" />
}

export default PrivateRoute;
