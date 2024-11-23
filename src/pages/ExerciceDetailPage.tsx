import { useQuery } from '@tanstack/react-query';
import { Plus } from 'lucide-react';
import { useParams } from 'react-router-dom';
import ErrorPage from '../components/error/ErrorPage';
import BreadCrumb from '../components/layout/BreadCrumb';
import ExerciceResults from '../components/programs/ExerciceResults';
import ExerciceResultsSkeletons from '../components/skeletons/ExerciceResultsSkeletons';
import Button from '../components/ui/Button';
import { Spacing } from '../components/ui/Spacing';
import { fetchExerciceAndResults } from '../services/exercicesService';

function ExerciceDetailPage() {
  const { id } = useParams();

  const {
    isPending: resultsPending,
    error: resultsError,
    data: results
  } = useQuery({
    queryKey: ['results', id],
    queryFn: () => {
      if (!id) {
        throw new Error('Utilisateur non connecté');
      }
      return fetchExerciceAndResults(id);
    },
    enabled: !!id
  });

  const resultsData = results?.data;

  if (resultsError) {
    return <ErrorPage />;
  }

  const breadcrumbItems = [
    { label: 'Accueil', href: '/' },
    { label: 'Programmes', href: '/programmes' },
    {
      label: resultsData ? resultsData.workout.workouts[0].workout.program.name : '',
      href: resultsData ? `/programmes/${resultsData.workout.workouts[0].workout.program.id}` : ''
    },
    {
      label: resultsData ? resultsData.workout.workouts[0].workout.name : '',
      href: resultsData ? `/programmes/${resultsData.workout.workouts[0].workout.id}/exercices` : ''
    },
    { label: resultsData ? resultsData.exercices.name : '', current: true }
  ];

  return (
    <>
      <div className="mt-4 min-h-96">
        <div className="mx-auto mb-4 flex w-full max-w-6xl justify-start">
          <BreadCrumb items={breadcrumbItems} />
          <hr className="border-neutral-6" />
        </div>
        <div className="mx-auto flex min-h-96 w-full max-w-6xl flex-col gap-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl">{resultsData ? resultsData.exercices.name : 'Développer assis'}</h1>
            <Button className="max-sm:px-2">
              <Plus className="sm:hidden" />
              <span className="max-sm:hidden">Ajouter une série</span>
            </Button>
          </div>
          {resultsData && resultsData.exercices.results.length === 0 && <hr className="border-neutral-6" />}
          {resultsPending ? <ExerciceResultsSkeletons /> : <ExerciceResults results={resultsData.exercices.results} />}
        </div>
      </div>
      <Spacing size="xl" />
    </>
  );
}
export default ExerciceDetailPage;
