import { useNavigate } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import { useAuthStore } from '../../../stores/useAuthStore';
import Button from '../../ui/Button';

function LogoutButton() {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
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

  return <>{isAuthenticated && <Button onClick={handleLogout}>Déconnexion</Button>}</>;
}

export default LogoutButton;
