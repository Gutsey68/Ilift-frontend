import { useQuery } from '@tanstack/react-query';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import BreadCrumb from '../components/layout/BreadCrumb';
import ExerciceResults from '../components/programs/ExerciceResults';
import SetInput from '../components/programs/SetInput';
import ExerciceResultsSkeletons from '../components/skeletons/ExerciceResultsSkeletons';
import Button from '../components/ui/Button';
import { useProgramContext } from '../context/ProgramContext';
import { fetchExerciceAndResults } from '../services/exercicesService';

function ExerciceDetailPage() {
  const { id } = useParams();
  const [showSetInput, setShowSetInput] = useState(false);
  const { programName, programId, workoutName, workoutId } = useProgramContext();

  const { isPending: resultsPending, data: results } = useQuery({
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

  const handleAddSetClick = () => {
    setShowSetInput(!showSetInput);
  };

  const breadcrumbItems = [
    { label: 'Accueil', href: '/' },
    { label: 'Programmes', href: '/programmes' },
    {
      label: programName,
      href: `/programmes/${programId}`
    },
    {
      label: workoutName,
      href: `/programmes/${programId}/exercices/${workoutId}`
    },
    { label: resultsData ? resultsData.exercices.name : '', current: true }
  ];

  return (
    <>
      <div className="mb-auto mt-4 min-h-96">
        <div className="mx-auto mb-4 flex w-full max-w-6xl justify-start">
          <BreadCrumb items={breadcrumbItems} />
          <hr className="border-neutral-6" />
        </div>
        <div className="mx-auto flex min-h-96 w-full max-w-6xl flex-col gap-4">
          <div className="flex items-center justify-between">
            <h1 className="sm:text-3xl">{resultsData ? resultsData.exercices.name : 'Développer assis'}</h1>
            {!showSetInput && (
              <Button className="max-sm:px-2" onClick={handleAddSetClick}>
                <Plus className="sm:hidden" />
                <span className="max-sm:hidden">Ajouter une série</span>
              </Button>
            )}
          </div>
          {showSetInput && <SetInput onClose={handleAddSetClick} />}
          {resultsData && resultsData.exercices.results.length === 0 && <hr className="border-neutral-6" />}
          {resultsPending ? <ExerciceResultsSkeletons /> : <ExerciceResults results={resultsData.exercices.results} />}
        </div>
      </div>
    </>
  );
}
export default ExerciceDetailPage;
