import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import StatItem from './StatItem';

function UserStats() {
  const { user } = useContext(AuthContext);

  return (
    <div className="flex h-fit w-full items-center justify-center gap-2">
      <StatItem label="Abonnés" value={user?._count?.followedBy || 0} border="border-r border-neutral-6" />
      <StatItem label="Abonnements" value={user?._count?.following || 0} />
      <StatItem label="Activités" value={user?._count?.workouts || 0} border="border-l border-neutral-6" />
    </div>
  );
}

export default UserStats;
