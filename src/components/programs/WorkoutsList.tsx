import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Pencil, Trash } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { deleteWorkout } from '../../services/workoutsService';
import { WorkoutType } from '../../types/workoutsType';
import ConfirmDeleteModal from '../modals/ConfirmDeleteModal';
import EditWorkoutModal from './EditWorkoutModal';

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

  return (
    <>
      {workouts.map(workout => (
        <div key={workout.id}>
          <hr className="mb-4 border-neutral-6" />
          <div className="group flex items-center justify-between gap-8">
            <Link className="w-full" to={`/programmes/${workout.id}/exercices`}>
              <div className="group cursor-pointer">
                <h2 className="font-semibold group-hover:text-green-9">{workout.name}</h2>
              </div>
            </Link>
            <div className="flex gap-4">
              <Pencil
                onClick={e => {
                  e.preventDefault();
                  setWorkoutToEdit(workout);
                }}
                className="ml-2 inline-block cursor-pointer opacity-0 hover:text-green-11 group-hover:opacity-100"
              />
              <Trash
                onClick={e => {
                  e.preventDefault();
                  setWorkoutToDelete(workout);
                }}
                className="inline-block cursor-pointer opacity-0 hover:text-red-11 group-hover:opacity-100"
              />
            </div>
          </div>
        </div>
      ))}
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
