import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Pencil, Share, Trash, X } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { deleteResult } from '../../services/resultsService';
import { ExerciseResult } from '../../types/exerciceResultsType';
import ConfirmDeleteModal from '../modals/ConfirmDeleteModal';
import PostForm from '../thread/PostForm';
import Badge from '../ui/Badge';
import EditResultModal from './EditResultModal';

type ExerciceResultsProps = {
  results: ExerciseResult[];
};

type GroupedResults = {
  date: string;
  results: ExerciseResult[];
};

function ExerciceResults({ results }: ExerciceResultsProps) {
  const [resultGroupToEdit, setResultGroupToEdit] = useState<ExerciseResult[] | null>(null);
  const [resultToDelete, setResultToDelete] = useState<ExerciseResult | null>(null);
  const [showPostForm, setShowPostForm] = useState(false);
  const [selectedResultsGroup, setSelectedResultsGroup] = useState<ExerciseResult[]>([]);
  const queryClient = useQueryClient();

  const groupedResults: GroupedResults[] = results.reduce((groups: GroupedResults[], result) => {
    const date = new Date(result.createdAt).toLocaleDateString();
    const existingGroup = groups.find(group => group.date === date);

    if (existingGroup) {
      existingGroup.results.push(result);
    } else {
      groups.push({ date, results: [result] });
    }

    return groups;
  }, []);

  const deleteResultMutation = useMutation({
    mutationFn: (id: string) => deleteResult(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['results'] });
      setResultToDelete(null);
    },
    onError: () => {
      toast.error('Erreur lors de la suppression du résultat');
    }
  });

  return (
    <>
      {groupedResults.map(({ date, results: dayResults }) => (
        <div key={date} className="group">
          <hr className="mb-5 border-neutral-6" />
          <div className="flex items-center justify-between">
            <Badge>{date}</Badge>
            <div className="flex gap-4 opacity-0 transition-opacity group-hover:opacity-100">
              <Share
                size={20}
                className="cursor-pointer text-neutral-11 transition-colors hover:text-green-11"
                onClick={() => {
                  setSelectedResultsGroup(dayResults);
                  setShowPostForm(true);
                }}
              />
              <Pencil
                size={20}
                className="cursor-pointer text-neutral-11 transition-colors hover:text-green-11"
                onClick={() => setResultGroupToEdit(dayResults)}
              />
              <Trash
                size={20}
                className="cursor-pointer text-neutral-11 transition-colors hover:text-red-11"
                onClick={() => dayResults.forEach(result => setResultToDelete(result))}
              />
            </div>
          </div>
          {dayResults.map(result =>
            result.sets.map((set, index) => (
              <div key={set.id} className="my-2 flex items-center gap-8">
                <p className="text-neutral-10">série {index + 1}</p>
                <p className="flex items-center gap-1 text-xl text-neutral-11">
                  <span className="text-2xl font-semibold text-green-9">{set.reps}</span> reps <X />{' '}
                  <span className="text-2xl font-semibold text-green-9">{set.weight}</span> kilos
                </p>
              </div>
            ))
          )}
        </div>
      ))}
      {resultGroupToEdit && <EditResultModal results={resultGroupToEdit} onClose={() => setResultGroupToEdit(null)} />}
      {resultToDelete && (
        <ConfirmDeleteModal
          title="Supprimer le résultat"
          message="Êtes-vous sûr de vouloir supprimer ce résultat ?"
          onClose={() => setResultToDelete(null)}
          onConfirm={() => deleteResultMutation.mutate(resultToDelete.id)}
          isLoading={deleteResultMutation.isPending}
        />
      )}
      {showPostForm && (
        <PostForm
          closeModal={() => {
            setShowPostForm(false);
            setSelectedResultsGroup([]);
          }}
          selectedResults={selectedResultsGroup}
        />
      )}
    </>
  );
}

export default ExerciceResults;
