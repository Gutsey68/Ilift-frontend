import { LogOutIcon } from 'lucide-react';
import { useContext } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../context/AuthContext';
import useAuth from '../../../hooks/useAuth';

/**
 * Bouton de déconnexion conditionnel
 * Fonctionnalités :
 * - Affichage uniquement si un utilisateur est connecté
 * - Gestion de la déconnexion avec feedback
 * - Animation de l'icône au survol
 * - Notification de confirmation/erreur
 *
 * @component
 * @returns {JSX.Element | null} Bouton de déconnexion ou null si aucun utilisateur
 */
function LogoutButton() {
  const { user } = useContext(AuthContext);
  const { logoutMutation } = useAuth();

  /**
   * Gère la déconnexion de l'utilisateur avec retour visuel
   */
  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync();
      toast('Bon entraînement', { icon: '👋' });
    } catch {
      toast.error('Erreur lors de la déconnexion');
    }
  };

  return user ? (
    <div className="w-full cursor-pointer hover:text-green-11" onClick={handleLogout}>
      <button className="flex min-w-max items-center gap-2">
        <LogOutIcon size={18} />
        <span>Se déconnecter</span>
      </button>
    </div>
  ) : null;
}

export default LogoutButton;
