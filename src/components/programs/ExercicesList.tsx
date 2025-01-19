import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { updateExercicePosition } from '../../services/exercicesService';
import { updateWorkoutExercices } from '../../services/workoutsService';
import { ExerciseType, WorkoutExerciseType } from '../../types/exercicesType';
import ConfirmDeleteModal from '../modals/ConfirmDeleteModal';
import ExerciceCard from './ExerciceCard';

/**
 * Props du composant ExercicesList
 * @typedef {object} ExercicesListProps
 * @property {WorkoutExerciseType[]} exercices - Liste des exercices de la séance
 * @property {{ name: string; id: string; program: { name: string; id: string } }} workout - Informations sur la séance
 */
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

/**
 * Type pour la structure des données de la requête
 */
type QueryData = {
  data: {
    exercices: WorkoutExerciseType[];
    workout: ExercicesListProps['workout'];
  };
};

/**
 * Liste des exercices d'une séance avec fonctionnalités de gestion
 * Fonctionnalités :
 * - Affichage des exercices
 * - Réorganisation par drag & drop
 * - Suppression d'exercices
 * - Mise à jour optimiste du cache
 * - Gestion des erreurs
 *
 * @component
 * @param {ExercicesListProps} props - Les propriétés du composant
 * @returns {JSX.Element} Liste interactive des exercices
 */
function ExercicesList({ exercices, workout }: ExercicesListProps) {
  const [exerciceToDelete, setExerciceToDelete] = useState<ExerciseType | null>(null);
  const queryClient = useQueryClient();

  /**
   * Mutation pour la suppression d'un exercice
   */
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

  /**
   * Mutation pour la mise à jour de la position d'un exercice
   * avec gestion optimiste du cache
   */
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

  /**
   * Gère le déplacement d'un exercice dans la liste
   */
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
