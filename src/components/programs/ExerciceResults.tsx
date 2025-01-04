import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Pencil, Trash, X } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { deleteResult } from '../../services/resultsService';
import { ExerciseResult } from '../../types/exerciceResultsType';
import ConfirmDeleteModal from '../modals/ConfirmDeleteModal';
import Badge from '../ui/Badge';
import EditResultModal from './EditResultModal';

type ExerciceResultsProps = {
  results: ExerciseResult[];
};

function ExerciceResults({ results }: ExerciceResultsProps) {
  const [resultToEdit, setResultToEdit] = useState<ExerciseResult | null>(null);
  const [resultToDelete, setResultToDelete] = useState<ExerciseResult | null>(null);
  const queryClient = useQueryClient();

  const deleteResultMutation = useMutation({
    mutationFn: (id: string) => deleteResult(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['results'] });
      toast.success('Résultat supprimé avec succès');
      setResultToDelete(null);
    },
    onError: () => {
      toast.error('Erreur lors de la suppression du résultat');
    }
  });

  return (
    <>
      {results.map(result => (
        <div key={result.id} className="group">
          <hr className="mb-5 border-neutral-6" />
          <div className="flex items-center justify-between">
            <Badge>{new Date(result.createdAt).toLocaleDateString()}</Badge>
            <div className="flex gap-4 opacity-0 transition-opacity group-hover:opacity-100">
              <Pencil size={20} className="cursor-pointer text-neutral-11 transition-colors hover:text-green-11" onClick={() => setResultToEdit(result)} />
              <Trash size={20} className="cursor-pointer text-neutral-11 transition-colors hover:text-red-11" onClick={() => setResultToDelete(result)} />
            </div>
          </div>
          {result.sets.map((set, index) => (
            <div key={set.id} className="my-2 flex items-center gap-8">
              <p className="text-neutral-10">série {index + 1}</p>
              <p className="flex items-center gap-1 text-xl text-neutral-11">
                <span className="text-2xl font-semibold text-green-9">{set.reps}</span> reps <X />{' '}
                <span className="text-2xl font-semibold text-green-9">{set.weight}</span> kilos
              </p>
            </div>
          ))}
        </div>
      ))}
      {resultToEdit && <EditResultModal result={resultToEdit} onClose={() => setResultToEdit(null)} />}
      {resultToDelete && (
        <ConfirmDeleteModal
          title="Supprimer le résultat"
          message="Êtes-vous sûr de vouloir supprimer ce résultat ?"
          onClose={() => setResultToDelete(null)}
          onConfirm={() => deleteResultMutation.mutate(resultToDelete.id)}
          isLoading={deleteResultMutation.isPending}
        />
      )}
    </>
  );
}

export default ExerciceResults;
