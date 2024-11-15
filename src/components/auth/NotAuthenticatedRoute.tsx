import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

function NorAuthenticatedRoute() {
  const { user } = useContext(AuthContext);

  return user ? <Navigate to="/tableau-de-bord" /> : <Outlet />;
}

export default NorAuthenticatedRoute;
