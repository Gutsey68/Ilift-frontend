import { Plus } from 'lucide-react';
import ErrorPage from '../components/error/ErrorPage';
import ProgramsList from '../components/programs/ProgramsList';
import ProgramsSkeletons from '../components/skeletons/ProgramsSkeletons';
import Button from '../components/ui/Button';
import useProgramsOfUser from '../hooks/useProgramsOfUsers';

function ProgramsPage() {
  const { programsPending, programsError, programsData } = useProgramsOfUser();

  if (programsError) {
    return <ErrorPage />;
  }

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
      {programsPending ? <ProgramsSkeletons /> : <ProgramsList programs={programsData} />}
    </div>
  );
}
export default ProgramsPage;
