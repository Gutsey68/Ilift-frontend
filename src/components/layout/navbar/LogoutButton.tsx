import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import useAuth from '../../../hooks/useAuth';
import Button from '../../ui/Button';
import { AuthContext } from '../../../context/AuthContext';

function LogoutButton() {
  const { user } = useContext(AuthContext);
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

  return <>{user && <Button onClick={handleLogout}>Déconnexion</Button>}</>;
}

export default LogoutButton;
