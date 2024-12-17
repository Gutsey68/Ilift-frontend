import { Circle } from 'lucide-react';
import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

function NotAuthenticatedRoute() {
  const { user, userPending } = useContext(AuthContext);

  if (userPending) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-neutral-1">
        <Circle size={40} className="animate-spin" />
      </div>
    );
  }

  return user ? <Navigate to="/accueil" /> : <Outlet />;
}

export default NotAuthenticatedRoute;
