import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import Spinner from '../ui/Spinner';

function PrivateRoute() {
  const { user, userPending } = useContext(AuthContext);

  if (userPending) {
    return <Spinner />;
  }

  return user ? <Outlet /> : <Navigate to="/connexion" />;
}

export default PrivateRoute;
