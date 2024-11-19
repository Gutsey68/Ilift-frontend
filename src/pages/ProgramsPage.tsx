import { Plus } from 'lucide-react';
import ProgramsList from '../components/programs/ProgramsList';
import ProgramsSkeletons from '../components/skeletons/ProgramsSkeletons';
import Button from '../components/ui/Button';
import useProgramsOfUser from '../hooks/useProgramsOfUsers';

function ProgramsPage() {
  const { programsPending, programsError, programsData } = useProgramsOfUser();

  return (
    <div className="mx-auto flex min-h-96 w-full max-w-6xl flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl">Mes programmes</h1>
        <Button className="max-sm:px-2">
          <Plus className="sm:hidden" />
          <span className="max-sm:hidden">Créer un programme</span>
        </Button>
      </div>
      {programsData && programsData.length === 0 && <hr className="border-neutral-6" />}
      {programsError && <div className="text-xl text-red-600">Erreur: {programsError.message}</div>}
      {programsPending ? <ProgramsSkeletons /> : <ProgramsList programs={programsData} />}
    </div>
  );
}
export default ProgramsPage;
