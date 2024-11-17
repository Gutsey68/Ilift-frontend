import ProgramsList from '../components/programs/ProgramsList';
import ProgramsSkeletons from '../components/skeletons/ProgramsSkeletons';
import Button from '../components/ui/Button';
import useProgramsOfUser from '../hooks/useProgramsOfUsers';

function ProgramsPage() {
  const { programsPending, programsError, programsData } = useProgramsOfUser();

  if (programsError) {
    return <div className="text-center text-xl text-red-600">{programsError.message}</div>;
  }

  if (programsPending) {
    return <ProgramsSkeletons />;
  }

  return (
    <div className="mx-auto flex min-h-96 w-full max-w-6xl flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl">Mes programmes</h1>
        <Button>Créer un programme</Button>
      </div>
      {programsData.length === 0 && <hr className="border-neutral-6" />}
      {programsPending ? <ProgramsSkeletons /> : <ProgramsList programs={programsData} />}
    </div>
  );
}
export default ProgramsPage;
