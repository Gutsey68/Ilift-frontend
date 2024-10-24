import { ChevronRight } from 'lucide-react';
import ProfilUser from './ProfilUser';
import UserStats from './UserStats';

function ProfilCard() {
    return (
        <section className="sticky top-[80px] flex flex-col gap-4 rounded-lg border border-neutral-6 bg-gradient-to-tl from-neutral-1 to-neutral-2 p-4 shadow-sm">
            <ProfilUser />
            <UserStats />
            <div className="mx-2 border-y border-neutral-6 py-4">
                <p className="pb-2 text-xs text-neutral-11">Dernière activité</p>
                <p className="font-semibold text-neutral-12">Séance push</p>
                <p className="text-xs text-neutral-11">18 octobre 2024</p>
            </div>
            <div className="group mx-2 flex cursor-pointer items-center justify-between text-xs text-neutral-11">
                <p>Voir le journal d’entraînements</p>
                <ChevronRight className="size-4 transition-transform duration-200 group-hover:translate-x-2" />
            </div>
        </section>
    );
}
export default ProfilCard;
