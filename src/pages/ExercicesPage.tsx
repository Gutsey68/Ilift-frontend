import { useQuery } from '@tanstack/react-query';
import { Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BreadCrumb from '../components/layout/BreadCrumb';
import AddExerciceModal from '../components/programs/CreateExerciceModal';
import ExercicesList from '../components/programs/ExercicesList';
import ExercicesSkeletons from '../components/skeletons/ExercicesSkeletons';
import Button from '../components/ui/Button';
import { Spacing } from '../components/ui/Spacing';
import { useProgramContext } from '../context/ProgramContext';
import { fetchExercicesOfWorkout } from '../services/programsService';
import { WorkoutExercisesResponseType } from '../types/exercicesType';

/**
 * Page d'affichage des exercices d'un programme
 * Fonctionnalités :
 * - Affichage des exercices d'un programme
 * - Ajout de nouveaux exercices
 * - Navigation avec fil d'Ariane
 * - Gestion des états de chargement
 *
 * @component
 * @returns {JSX.Element} Page d'affichage des exercices
 */
function ExercicesPage() {
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);
  const { setWorkoutInfo } = useProgramContext();

  /**
   * Requête pour récupérer les exercices d'un programme
   */
  const { isPending: exercicesPending, data: exercices } = useQuery<WorkoutExercisesResponseType>({
    queryKey: ['exercices', id],
    queryFn: () => {
      if (!id) {
        throw new Error('Utilisateur non connecté');
      }
      return fetchExercicesOfWorkout(id);
    },
    enabled: !!id
  });

  useEffect(() => {
    if (exercices?.data) {
      setWorkoutInfo(exercices.data.workout.name, exercices.data.workout.id);
    }
  }, [exercices, setWorkoutInfo]);

  const exercicesData = exercices?.data;

  const breadcrumbItems = [
    { label: 'Accueil', href: '/' },
    { label: 'Programmes', href: '/programmes' },
    {
      label: exercicesData ? exercicesData.workout.program.name : '',
      href: exercicesData ? `/programmes/${exercicesData.workout.program.id}` : ''
    },
    {
      label: exercicesData ? exercicesData.workout.name : '',
      current: true
    }
  ];

  return (
    <>
      <div className="mb-auto mt-4 min-h-96">
        <div className="mx-auto mb-4 flex w-full max-w-6xl justify-start">
          <BreadCrumb items={breadcrumbItems} />
        </div>
        <div className="mx-auto flex min-h-96 w-full max-w-6xl flex-col gap-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl">Exercices</h1>
              <p className="mt-1 text-neutral-11">{exercicesData ? exercicesData.workout.name : ''}</p>
            </div>
            <div>
              <Button onClick={() => setShowModal(true)} className="max-sm:px-2">
                <Plus className="sm:hidden" />
                <span className="max-sm:hidden">Ajouter un exercice</span>
              </Button>
            </div>
          </div>
          {exercicesData && exercicesData.exercices.length === 0 && <hr className="border-neutral-6" />}
          {exercicesPending ? <ExercicesSkeletons /> : exercicesData && <ExercicesList workout={exercicesData.workout} exercices={exercicesData.exercices} />}
        </div>
      </div>
      <Spacing size="xl" />
      {showModal && <AddExerciceModal closeModal={() => setShowModal(false)} currentExercices={exercicesData ? exercicesData.exercices : []} />}
    </>
  );
}

export default ExercicesPage;
