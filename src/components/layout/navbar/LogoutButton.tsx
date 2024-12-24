import { LogOutIcon } from 'lucide-react';
import { useContext } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../context/AuthContext';
import useAuth from '../../../hooks/useAuth';

function LogoutButton() {
  const { user } = useContext(AuthContext);
  const { logoutMutation } = useAuth();

  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync();
      toast('Déconnexion réussie', { icon: '👋' });
    } catch {
      toast.error('Erreur lors de la déconnexion');
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
