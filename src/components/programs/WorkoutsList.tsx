import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { deleteWorkout, updateWorkout } from '../../services/workoutsService';
import { WorkoutType } from '../../types/workoutsType';
import ConfirmDeleteModal from '../modals/ConfirmDeleteModal';
import EditWorkoutModal from './EditWorkoutModal';
import WorkoutCard from './WorkoutCard';

/**
 * Props du composant WorkoutsList
 * @typedef {object} WorkoutsListProps
 * @property {WorkoutType[]} workouts - Liste des séances à afficher
 */
type WorkoutsListProps = {
  workouts: WorkoutType[];
};

/**
 * Liste des séances d'entraînement avec fonctionnalités de gestion
 * Fonctionnalités :
 * - Affichage des séances
 * - Édition et suppression
 * - Réorganisation par drag & drop
 * - Gestion des confirmations
 * - Mutations optimistes
 *
 * @component
 * @param {WorkoutsListProps} props - Les propriétés du composant
 * @returns {JSX.Element} Liste interactive des séances
 */
function WorkoutsList({ workouts }: WorkoutsListProps) {
  const [workoutToEdit, setWorkoutToEdit] = useState<WorkoutType | null>(null);
  const [workoutToDelete, setWorkoutToDelete] = useState<WorkoutType | null>(null);
  const queryClient = useQueryClient();

  /**
   * Mutation pour la suppression d'une séance
   */
  const deleteWorkoutMutation = useMutation({
    mutationFn: async (id: string) => {
      return await deleteWorkout(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workouts'] });
      toast.success('Séance supprimée avec succès');
      setWorkoutToDelete(null);
    },
    onError: () => {
      toast.error('Erreur lors de la suppression de la séance');
    }
  });

  /**
   * Mutation pour la mise à jour de la position d'une séance
   */
  const updatePositionMutation = useMutation({
    mutationFn: (params: { id: string; position: number }) => updateWorkout(params.id, { position: params.position }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workouts'] });
    }
  });

  /**
   * Gère le déplacement d'une séance dans la liste
   */
  const moveWorkout = (dragIndex: number, hoverIndex: number) => {
    const draggedWorkout = workouts[dragIndex];

    updatePositionMutation.mutate({
      id: draggedWorkout.id,
      position: hoverIndex + 1
    });
  };

  return (
    <>
      <div>
        {workouts.map((workout, index) => (
          <WorkoutCard key={workout.id} workout={workout} index={index} onEdit={setWorkoutToEdit} onDelete={setWorkoutToDelete} moveWorkout={moveWorkout} />
        ))}
      </div>
      {workoutToEdit && <EditWorkoutModal workout={workoutToEdit} closeModal={() => setWorkoutToEdit(null)} />}
      {workoutToDelete && (
        <ConfirmDeleteModal
          title="Supprimer la séance"
          message={`Êtes-vous sûr de vouloir supprimer la séance "${workoutToDelete.name}" ?`}
          onClose={() => setWorkoutToDelete(null)}
          onConfirm={() => deleteWorkoutMutation.mutate(workoutToDelete.id)}
          isLoading={deleteWorkoutMutation.isPending}
        />
      )}
    </>
  );
}

export default WorkoutsList;
