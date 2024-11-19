import { Activity, HomeIcon, Plus, User2Icon } from 'lucide-react';

function MobileBottomNav() {
  return (
    <div className="fixed bottom-0 left-0 z-50 h-16 w-full border-t border-neutral-6 bg-neutral-1 sm:hidden">
      <div className="mx-auto grid h-full max-w-lg grid-cols-4 font-medium">
        <button type="button" className="group inline-flex flex-col items-center justify-center border-x border-neutral-6 px-5 hover:bg-neutral-3">
          <HomeIcon className="group-hover:text-green-9" />
          <span className="text-sm text-neutral-11 group-hover:text-green-9">Accueil</span>
        </button>
        <button type="button" className="group inline-flex flex-col items-center justify-center border-x border-neutral-6 px-5 hover:bg-neutral-3">
          <Activity className="group-hover:text-green-9" />
          <span className="text-sm text-neutral-11 group-hover:text-green-9">Activités</span>
        </button>
        <button type="button" className="group inline-flex flex-col items-center justify-center border-x border-neutral-6 px-5 hover:bg-neutral-3">
          <Plus className="group-hover:text-green-9" />
          <span className="text-sm text-neutral-11 group-hover:text-green-9">Poster</span>
        </button>
        <button type="button" className="group inline-flex flex-col items-center justify-center border-x border-neutral-6 px-5 hover:bg-neutral-3">
          <User2Icon className="group-hover:text-green-9" />
          <span className="text-sm text-neutral-11 group-hover:text-green-9">Profil</span>
        </button>
      </div>
    </div>
  );
}
export default MobileBottomNav;
