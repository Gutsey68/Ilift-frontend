import { Bell } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import { useAuthStore } from '../../../stores/authStore';
import ThemeToggle from '../../theme/ThemeToggle';
import Avatar from '../../ui/Avatar';
import Button from '../../ui/Button';
import IconButton from '../../ui/IconButton';

function RightNav() {
  const { isAuthenticated } = useAuthStore();
  const { logoutMutation } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync();
      navigate('/');
    } catch (error) {
      console.error('Erreur lors de la déconnexion', error);
    }
  };

  return (
    <>
      <NavLink to="/profil/1">
        <Avatar
          src="https://images.unsplash.com/photo-1564859228273-274232fdb516?q=80&w=2187&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
