import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
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

  if (resultsPending) {
    return <div>Chargement...</div>;
  }

  if (resultsError) {
    return <div>Erreur: {resultsError.message}</div>;
  }

  return (
    <div className="mx-auto flex min-h-96 w-full max-w-6xl flex-col gap-4">
      <h1 className="text-3xl">{resultsData.name}</h1>
      <hr className="border-neutral-6" />
    </div>
  );
}
export default ExerciceDetailPage;
