import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { deleteWorkout, updateWorkout } from '../../services/workoutsService';
import { WorkoutType } from '../../types/workoutsType';
import ConfirmDeleteModal from '../modals/ConfirmDeleteModal';
import EditWorkoutModal from './EditWorkoutModal';
import WorkoutCard from './WorkoutCard';

type WorkoutsListProps = {
  workouts: WorkoutType[];
};

function WorkoutsList({ workouts }: WorkoutsListProps) {
  const [workoutToEdit, setWorkoutToEdit] = useState<WorkoutType | null>(null);
  const [workoutToDelete, setWorkoutToDelete] = useState<WorkoutType | null>(null);
  const queryClient = useQueryClient();

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

  const updatePositionMutation = useMutation({
    mutationFn: (params: { id: string; position: number }) => updateWorkout(params.id, { position: params.position }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workouts'] });
    }
  });

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
      {workoutToEdit && <EditWorkoutModal workout={workoutToEdit} onClose={() => setWorkoutToEdit(null)} />}
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
