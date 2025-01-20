import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import FollowersModal from './FollowersModal';
import FollowingsModal from './FollowingsModal';
import StatItem from './StatItem';

/**
 * Composant d'affichage des statistiques utilisateur
 * Fonctionnalités :
 * - Affichage des statistiques d'abonnés, abonnements et activités
 * - Ouverture des modals pour voir les abonnés et abonnements
 *
 * @component
 * @returns {JSX.Element} Statistiques utilisateur avec interactions
 */
function UserStats() {
  const { user } = useContext(AuthContext);
  const [showFollowersModal, setShowFollowersModal] = useState(false);
  const [showFollowingsModal, setShowFollowingsModal] = useState(false);

  return (
    <>
      <div className="flex h-fit w-full items-center justify-center gap-2">
        <StatItem label="Abonnés" value={user?._count?.following || 0} border="border-r border-neutral-6" onClick={() => setShowFollowersModal(true)} />
        <StatItem label="Abonnements" value={user?._count?.followedBy || 0} onClick={() => setShowFollowingsModal(true)} />
        <StatItem label="Activités" value={user?._count?.workouts || 0} border="border-l border-neutral-6" />
      </div>
      {showFollowersModal && <FollowersModal closeModal={() => setShowFollowersModal(false)} />}
      {showFollowingsModal && <FollowingsModal closeModal={() => setShowFollowingsModal(false)} />}
    </>
  );
}

export default UserStats;
