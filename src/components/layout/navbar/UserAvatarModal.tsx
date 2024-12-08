import { Moon, Settings, Sun, User } from 'lucide-react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import { ThemeContext } from '../../../context/ThemeContext';
import ThemeSwitch from '../../theme/ThemeSwitch';
import LogoutButton from './LogoutButton';

type UserAvatarModalProps = {
  closeModal: () => void;
};

function UserAvatarModal({ closeModal }: UserAvatarModalProps) {
  const { user } = useContext(AuthContext);
  const { isDark, toggleTheme } = useContext(ThemeContext);

  const onClickHandler = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleTheme();
  };

  return (
    <div onClick={closeModal} className="fixed inset-0 z-30 flex items-center justify-center bg-transparent text-neutral-11">
      <div onClick={e => e.stopPropagation()} className="relative mb-[10vh] w-full max-sm:px-4 sm:w-1/3"></div>
      <div className="absolute right-4 top-12 mt-2 flex flex-col gap-2 rounded-md border border-neutral-6 bg-neutral-1 p-3 shadow-lg lg:right-32">
        <Link className="flex items-center gap-2 hover:text-green-11" to={`/profil/${user?.id}`}>
          <User size={18} />
          Voir le profil
        </Link>
        <Link className="flex items-center gap-2 hover:text-green-11" to={`/parametres/${user?.id}`}>
          <Settings size={18} />
          Paramètres
        </Link>
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
