import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import Spinner from '../ui/Spinner';

function NotAuthenticatedRoute() {
  const { user, userPending } = useContext(AuthContext);

  if (userPending) {
    return <Spinner />;
  }

  return user ? <Navigate to="/accueil" /> : <Outlet />;
}

export default NotAuthenticatedRoute;
