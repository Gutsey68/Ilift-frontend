import { useNavigate } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import { useAuthStore } from '../../../stores/authStore';
import Button from '../../ui/Button';

function LogoutButton() {
  const { isAuthenticated } = useAuthStore();
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
  return <>{isAuthenticated && <Button onClick={handleLogout}>Déconnexion</Button>}</>;
}
export default LogoutButton;
