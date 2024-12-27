import { Moon, Settings, Sun, User, UserCog } from 'lucide-react';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import { ThemeContext } from '../../../context/ThemeContext';
import ThemeSwitch from '../../theme/ThemeSwitch';
import LogoutButton from './LogoutButton';

type UserAvatarModalProps = {
  closeModal: () => void;
  avatarRef: React.RefObject<HTMLDivElement>;
};

function UserAvatarModal({ closeModal, avatarRef }: UserAvatarModalProps) {
  const { user } = useContext(AuthContext);
  const { isDark, toggleTheme } = useContext(ThemeContext);
  const [position, setPosition] = useState({ top: 0, right: 0 });

  useEffect(() => {
    const rect = avatarRef.current?.getBoundingClientRect();
    if (rect) {
      setPosition({
        top: rect.bottom + 4,
        right: window.innerWidth - rect.right - 13
      });
    }
  }, []);

  const onClickHandler = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleTheme();
  };

  return (
    <div onClick={closeModal} className="fixed inset-0 z-30 bg-transparent">
      <div
        onClick={e => e.stopPropagation()}
        className="fixed z-40 flex flex-col gap-2 rounded-md border border-neutral-6 bg-neutral-1 p-3 shadow-lg"
        style={{
          top: position.top,
          right: position.right
        }}
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
