import { LogOutIcon } from 'lucide-react';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import useAuth from '../../../hooks/useAuth';

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
          <div className="w-full cursor-pointer hover:text-green-11" onClick={handleLogout}>
            <button className="flex min-w-max items-center gap-2">
              <LogOutIcon size={18} />
              <span>Se déconnecter</span>
            </button>
          </div>
        </>
      )}
    </>
  );
}

export default LogoutButton;
