import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Trash } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { updateWorkoutExercices } from '../../services/workoutsService';
import { ExerciseType } from '../../types/exercicesType';
import ConfirmDeleteModal from '../modals/ConfirmDeleteModal';

type ExercicesListProps = {
  exercices: ExerciseType[];
  workout: {
    name: string;
    id: string;
    program: {
      name: string;
      id: string;
    };
  };
};

function ExercicesList({ exercices, workout }: ExercicesListProps) {
  const [exerciceToDelete, setExerciceToDelete] = useState<ExerciseType | null>(null);
  const queryClient = useQueryClient();

  const removeExerciceMutation = useMutation({
    mutationFn: (exerciceId: string) => {
      const updatedExerciceIds = exercices.filter(e => e.id !== exerciceId).map(e => e.id);
      return updateWorkoutExercices(workout.id, updatedExerciceIds);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['exercices'] });
      toast.success('Exercice retiré de la séance avec succès');
      setExerciceToDelete(null);
    }
  });

  return (
    <>
      {exercices.map(exercice => (
        <div key={exercice.id}>
          <hr className="mb-4 border-neutral-6" />
          <div className="group flex items-center justify-between gap-8">
            <Link className="w-full" to={`/programmes/${workout.program.id}/exercices/${exercice.id}`}>
              <div className="group cursor-pointer">
                <h2 className="font-semibold group-hover:text-green-9">{exercice.name}</h2>
              </div>
            </Link>
            <Trash
              onClick={e => {
                e.preventDefault();
                setExerciceToDelete(exercice);
              }}
              className="inline-block cursor-pointer opacity-0 hover:text-red-11 group-hover:opacity-100"
            />
          </div>
        </div>
      ))}

      {exerciceToDelete && (
        <ConfirmDeleteModal
          title="Retirer l'exercice"
          message={`Êtes-vous sûr de vouloir retirer l'exercice "${exerciceToDelete.name}" de cette séance ?`}
          onClose={() => setExerciceToDelete(null)}
          onConfirm={() => removeExerciceMutation.mutate(exerciceToDelete.id)}
          isLoading={removeExerciceMutation.isPending}
        />
      )}
    </>
  );
}

export default ExercicesList;
