import { useQuery } from '@tanstack/react-query';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import { useParams } from 'react-router-dom';
import ErrorPage from '../components/error/ErrorPage';
import BreadCrumb from '../components/layout/BreadCrumb';
import CreateWorkoutModal from '../components/programs/CreateWorkoutModal';
import WorkoutsList from '../components/programs/WorkoutsList';
import ExercicesSkeletons from '../components/skeletons/ExercicesSkeletons';
import Button from '../components/ui/Button';
import { Spacing } from '../components/ui/Spacing';
import { fetchWorkoutsOfProgram } from '../services/programsService';

function ProgramDetailPage() {
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);

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

  console.log(workoutsData);

  if (workoutsError) {
    return <ErrorPage />;
  }

  const breadcrumbItems = [
    { label: 'Accueil', href: '/' },
    { label: 'Programmes', href: '/programmes' },
    { label: workoutsData ? workoutsData.program.name : '', current: true }
  ];

  return (
    <>
      <div className="mt-4 min-h-96">
        <div className="mx-auto mb-4 flex w-full max-w-6xl justify-start">
          <BreadCrumb items={breadcrumbItems} />
        </div>
        <div className="mx-auto flex min-h-96 w-full max-w-6xl flex-col gap-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl">Séances</h1>
              <p className="mt-1 text-neutral-11">{workoutsData ? workoutsData.program.name : ''}</p>
            </div>
            <Button onClick={() => setShowModal(true)} className="max-sm:px-2">
              <Plus className="sm:hidden" />
              <span className="max-sm:hidden">Ajouter une séance</span>
            </Button>
          </div>
          {workoutsData && workoutsData.workouts.length === 0 && <hr className="border-neutral-6" />}
          {workoutsPending ? <ExercicesSkeletons /> : <WorkoutsList workouts={workoutsData.workouts} />}
        </div>
      </div>
      {showModal && createPortal(<CreateWorkoutModal closeModal={() => setShowModal(false)} />, document.body)}
      <Spacing size="xl" />
    </>
  );
}
export default ProgramDetailPage;
