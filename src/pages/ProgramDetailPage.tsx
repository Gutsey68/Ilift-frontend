import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import WorkoutsList from '../components/programs/WorkoutsList';
import ProgramsSkeletons from '../components/skeletons/ProgramsSkeletons';
import Button from '../components/ui/Button';
import { fetchWorkoutsOfProgram } from '../services/programsService';

function ProgramDetailPage() {
  const { id } = useParams();

  const {
    isPending: workoutsPending,
    error: workoutsError,
    data: workouts
  } = useQuery({
    queryKey: ['workouts', id],
    queryFn: () => {
      if (!id) {
        throw new Error('Utilisateur non connecté');
      }
      return fetchWorkoutsOfProgram(id);
    },
    enabled: !!id
  });

  const workoutsData = workouts?.data;

  if (workoutsError) {
    return <div>Erreur: {workoutsError.message}</div>;
  }

  console.log(workoutsData);

  return (
    <div className="mx-auto flex min-h-96 w-full max-w-6xl flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl">Séances</h1>
          <p className="mt-1 text-neutral-11">{workoutsData[0].program.name ?? ''}</p>
        </div>
        <Button>Ajouter une séance</Button>
      </div>
      {workoutsData && workoutsData.length === 0 && <hr className="border-neutral-6" />}
      {workoutsPending ? <ProgramsSkeletons /> : <WorkoutsList workouts={workoutsData} />}
    </div>
  );
}
export default ProgramDetailPage;
