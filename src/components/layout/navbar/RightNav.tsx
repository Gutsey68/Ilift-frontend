import { Bell } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import { useAuthStore } from '../../../stores/authStore';
import ThemeToggle from '../../theme/ThemeToggle';
import Avatar from '../../ui/Avatar';
import Button from '../../ui/Button';
import IconButton from '../../ui/IconButton';

function RightNav() {
  const { isAuthenticated, userDetails } = useAuthStore();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    try {
      logout();
      navigate('/');
    } catch (error) {
      console.error('Erreur lors de la déconnexion', error);
    }
  };

  return (
    <>
      <NavLink to="/profil/1">
        <Avatar
          src={userDetails?.profilePhoto || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'}
          alt=""
          className="mr-1"
          size="sm"
        />
      </NavLink>
      <div className="relative">
        <IconButton icon={<Bell className="size-5" />} />
        <div className="absolute right-0.5 top-0.5 flex size-4 items-center justify-center rounded-full bg-red-600">
          <span className="text-xs text-white">8</span>
        </div>
      </div>
      <ThemeToggle />
      {isAuthenticated && (
        <Button onClick={handleLogout} className="ml-2">
          Déconnexion
        </Button>
      )}
    </>
  );
}

export default RightNav;
