import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import ExerciceResults from '../components/programs/ExerciceResults';
import ExerciceResultsSkeletons from '../components/skeletons/ExerciceResultsSkeletons';
import Button from '../components/ui/Button';
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

  return (
    <div className="mx-auto flex min-h-96 w-full max-w-6xl flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl">{resultsData ? resultsData.name : 'Développer assis'}</h1>
        <Button>Ajouter une série</Button>
      </div>
      {resultsData && resultsData.results.length === 0 && <hr className="border-neutral-6" />}
      {resultsError && <div className="text-xl text-red-600">Erreur: {resultsError.message}</div>}
      {resultsPending ? <ExerciceResultsSkeletons /> : <ExerciceResults results={resultsData.results} />}
    </div>
  );
}
export default ExerciceDetailPage;
