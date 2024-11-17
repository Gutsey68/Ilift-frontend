import { ChevronRight } from 'lucide-react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { formatRelativeTime } from '../../lib/formatRelativeTime';
import Card from '../ui/Card';
import ProfilUser from './ProfilUser';
import UserStats from './UserStats';

function ProfilCard() {
  const { user } = useContext(AuthContext);

  return (
    <Card size="md" className="sticky top-[80px] flex flex-col gap-4">
      <ProfilUser />
      <UserStats />
      <div className="mx-2 border-y border-neutral-6 py-4">
        <p className="pb-2 text-xs text-neutral-11">Dernière activité</p>
        <p className="font-semibold text-neutral-12">{user && user.workouts ? user.workouts[0].name : 'Dodo'}</p>
        <p className="text-xs text-neutral-11">{user && user.workouts ? formatRelativeTime(user.workouts[0].createdAt) : '💤'}</p>
      </div>
      <Link to="/activités">
        <div className="group mx-2 flex cursor-pointer items-center justify-between text-xs text-neutral-11">
          <p>Voir le journal d’entraînements</p>
          <ChevronRight className="size-4 transition-transform duration-200 group-hover:translate-x-2" />
        </div>
      </Link>
    </Card>
  );
}

export default ProfilCard;
