import { useQuery } from '@tanstack/react-query';
import { Plus } from 'lucide-react';
import { useParams } from 'react-router-dom';
import ErrorPage from '../components/error/ErrorPage';
import WorkoutsList from '../components/programs/WorkoutsList';
import ExercicesSkeletons from '../components/skeletons/ExercicesSkeletons';
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
    return <ErrorPage />;
  }

  return (
    <div className="mx-auto flex min-h-96 w-full max-w-6xl flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl">Séances</h1>
          <p className="mt-1 text-neutral-11">{workoutsData ? workoutsData[0].program.name : ''}</p>
        </div>
        <Button className="max-sm:px-2">
          <Plus className="sm:hidden" />
          <span className="max-sm:hidden">Ajouter une séance</span>
        </Button>
      </div>
      {workoutsData && workoutsData.length === 0 && <hr className="border-neutral-6" />}
      {workoutsPending ? <ExercicesSkeletons /> : <WorkoutsList workouts={workoutsData} />}
    </div>
  );
}
export default ProgramDetailPage;
