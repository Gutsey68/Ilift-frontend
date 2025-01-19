import { Activity, HomeIcon, Plus, User2Icon } from 'lucide-react';
import { useContext, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import PostForm from '../../thread/PostForm';

/**
 * Barre de navigation mobile fixée en bas de l'écran
 * Fonctionnalités :
 * - Navigation principale de l'application sur mobile
 * - Accès rapide aux fonctionnalités clés (accueil, programmes, poster, profil)
 * - Modal de création de post intégré
 * - Affichage conditionnel selon l'authentification
 * - Styles interactifs au survol
 *
 * @component
 * @returns {JSX.Element | null} Barre de navigation mobile ou null si non authentifié
 */
function MobileBottomNav() {
  const { user } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);

  return user ? (
    <>
      <div className="h-16 sm:hidden"></div>
      <div className="fixed bottom-0 left-0 z-20 h-16 w-full border-t border-neutral-6 bg-neutral-1 sm:hidden">
        <div className="mx-auto grid h-full max-w-lg grid-cols-4 font-medium">
          <Link to="/accueil" className="group inline-flex flex-col items-center justify-center border-x border-neutral-6 px-5 hover:bg-neutral-3">
            <HomeIcon className="group-hover:text-green-9" />
            <span className="text-sm text-neutral-11 group-hover:text-green-9">Accueil</span>
          </Link>
          <Link to="/programmes" className="group inline-flex flex-col items-center justify-center border-x border-neutral-6 px-5 hover:bg-neutral-3">
            <Activity className="group-hover:text-green-9" />
            <span className="text-sm text-neutral-11 group-hover:text-green-9">Programmes</span>
          </Link>
          <div
            onClick={() => setShowModal(true)}
            className="group inline-flex flex-col items-center justify-center border-x border-neutral-6 px-5 hover:bg-neutral-3"
          >
            <Plus className="group-hover:text-green-9" />
            <span className="text-sm text-neutral-11 group-hover:text-green-9">Poster</span>
          </div>
          <Link to={`/profil/${user?.id}`} className="group inline-flex flex-col items-center justify-center border-x border-neutral-6 px-5 hover:bg-neutral-3">
            <User2Icon className="group-hover:text-green-9" />
            <span className="text-sm text-neutral-11 group-hover:text-green-9">Profil</span>
          </Link>
        </div>
      </div>
      {showModal && createPortal(<PostForm selectedResults={[]} closeModal={() => setShowModal(false)} />, document.body)}
    </>
  ) : null;
}

export default MobileBottomNav;
