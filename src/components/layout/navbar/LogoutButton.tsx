import { LogOutIcon } from 'lucide-react';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import useAuth from '../../../hooks/useAuth';
import Button from '../../ui/Button';
import IconButton from '../../ui/IconButton';

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

  return (
    <>
      {user && (
        <>
          <Button className="max-md:hidden" onClick={handleLogout}>
            Déconnexion
          </Button>
          <div onClick={handleLogout}>
            <IconButton className="mr-2 md:hidden" icon={<LogOutIcon />} />
          </div>
        </>
      )}
    </>
  );
}

export default LogoutButton;
