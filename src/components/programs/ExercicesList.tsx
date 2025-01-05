import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { updateExercicePosition } from '../../services/exercicesService';
import { updateWorkoutExercices } from '../../services/workoutsService';
import { ExerciseType, WorkoutExerciseType } from '../../types/exercicesType';
import ConfirmDeleteModal from '../modals/ConfirmDeleteModal';
import { ExerciceCard } from './ExerciceCard';

type ExercicesListProps = {
  exercices: WorkoutExerciseType[];
  workout: {
    name: string;
    id: string;
    program: {
      name: string;
      id: string;
    };
  };
};

type QueryData = {
  data: {
    exercices: WorkoutExerciseType[];
    workout: ExercicesListProps['workout'];
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

  const updatePositionMutation = useMutation({
    mutationFn: (params: { exerciceId: string; position: number }) => updateExercicePosition(workout.id, params.exerciceId, params.position),
    onMutate: async ({ exerciceId, position }) => {
      await queryClient.cancelQueries({ queryKey: ['exercices', workout.id] });
      const previousExercices = queryClient.getQueryData<QueryData>(['exercices', workout.id]);

      queryClient.setQueryData<QueryData>(['exercices', workout.id], old => {
        if (!old) return old;
        return {
          ...old,
          data: {
            ...old.data,
            exercices: old.data.exercices.map(e => (e.id === exerciceId ? { ...e, position } : e)).sort((a, b) => a.position - b.position)
          }
        };
      });

      return { previousExercices };
    },
    onError: (_, __, context) => {
      if (context?.previousExercices) {
        queryClient.setQueryData(['exercices', workout.id], context.previousExercices);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['exercices', workout.id] });
    }
  });

  const moveExercice = (dragIndex: number, hoverIndex: number) => {
    const draggedExercice = exercices[dragIndex];

    updatePositionMutation.mutate({
      exerciceId: draggedExercice.id,
      position: hoverIndex + 1
    });
  };

  return (
    <>
      <div>
        {exercices.map((exercice, index) => (
          <ExerciceCard key={exercice.id} exercice={exercice} index={index} workoutId={workout.id} onDelete={setExerciceToDelete} moveExercice={moveExercice} />
        ))}
      </div>
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
