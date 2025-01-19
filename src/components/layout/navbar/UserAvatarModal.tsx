import { Moon, Settings, Sun, User, UserCog } from 'lucide-react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import { ThemeContext } from '../../../context/ThemeContext';
import useFloatingModal from '../../../hooks/useFloatingModal';
import ThemeSwitch from '../../theme/ThemeSwitch';
import LogoutButton from './LogoutButton';

/**
 * Props du composant UserAvatarModal
 * @typedef {object} UserAvatarModalProps
 * @property {() => void} closeModal - Fonction de fermeture du modal
 * @property {React.RefObject<HTMLDivElement>} avatarRef - Référence vers l'avatar déclencheur
 */
type UserAvatarModalProps = {
  closeModal: () => void;
  avatarRef: React.RefObject<HTMLDivElement>;
};

/**
 * Modal flottant avec les options utilisateur
 * Fonctionnalités :
 * - Navigation vers profil et paramètres
 * - Accès administration si roleId approprié
 * - Gestion du thème avec switch
 * - Déconnexion
 * - Positionnement automatique relatif à l'avatar
 *
 * @component
 * @param {UserAvatarModalProps} props - Les propriétés du composant
 * @returns {JSX.Element} Modal des options utilisateur
 */
function UserAvatarModal({ closeModal, avatarRef }: UserAvatarModalProps) {
  const { user } = useContext(AuthContext);
  const { isDark, toggleTheme } = useContext(ThemeContext);
  const position = useFloatingModal(avatarRef, closeModal);

  const onClickHandler = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleTheme();
  };

  return (
    <div onClick={closeModal} className="fixed inset-0 z-30 bg-transparent">
      <div
        onClick={e => e.stopPropagation()}
        className="fixed z-40 flex flex-col gap-2 rounded-md border border-neutral-6 bg-neutral-1 p-3 shadow-lg"
        style={{ top: position.top, right: position.right }}
      >
        <Link className="flex items-center gap-2 hover:text-green-11" to={`/profil/${user?.id}`}>
          <User size={18} />
          Voir le profil
        </Link>
        <Link className="flex items-center gap-2 hover:text-green-11" to={`/parametres/${user?.id}`}>
          <Settings size={18} />
          Paramètres
        </Link>
        {user?.roleId === 'role2' && (
          <Link className="flex items-center gap-2 hover:text-green-11" to="/admin">
            <UserCog size={18} />
            Administration
          </Link>
        )}
        <div onClick={onClickHandler} className="flex cursor-pointer items-center gap-2 hover:text-green-11">
          {isDark ? <Sun size={18} /> : <Moon size={18} />} Changer de thème
          <ThemeSwitch />
        </div>
        <LogoutButton />
      </div>
    </div>
  );
}

export default UserAvatarModal;
