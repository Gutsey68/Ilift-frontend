import { ChevronRight } from 'lucide-react';
import { UserDetails } from '../../types/userDetail';
import Card from '../ui/Card';
import ProfilUser from './ProfilUser';
import UserStats from './UserStats';

type ProfilCardProps = {
  usersData: UserDetails;
};

function ProfilCard({ usersData }: ProfilCardProps) {
  return (
    <Card size="md" className="sticky top-[80px] flex flex-col gap-4">
      <ProfilUser user={usersData} />
      <UserStats user={usersData} />
      <div className="mx-2 border-y border-neutral-6 py-4">
        <p className="pb-2 text-xs text-neutral-11">Dernière activité</p>
        <p className="font-semibold text-neutral-12">Séance push</p>
        <p className="text-xs text-neutral-11">18 octobre 2024</p>
      </div>
      <div className="group mx-2 flex cursor-pointer items-center justify-between text-xs text-neutral-11">
        <p>Voir le journal d’entraînements</p>
        <ChevronRight className="size-4 transition-transform duration-200 group-hover:translate-x-2" />
      </div>
    </Card>
  );
}

export default ProfilCard;
