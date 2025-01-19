import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import type { z } from 'zod';
import { updateWorkout } from '../../services/workoutsService';
import { WorkoutType } from '../../types/workoutsType';
import { updateWorkoutSchema } from '../../validators/workouts.validation';
import FormField from '../auth/FormField';
import Button from '../ui/Button';
import Card from '../ui/Card';
import Modal from '../ui/Modal';

/**
 * Props du composant EditWorkoutModal
 * @typedef {object} EditWorkoutModalProps
 * @property {WorkoutType} workout - La séance à modifier
 * @property {() => void} closeModal - Fonction de fermeture du modal
 */
type EditWorkoutModalProps = {
  workout: WorkoutType;
  closeModal: () => void;
};

type FormData = z.infer<typeof updateWorkoutSchema>['body'];

/**
 * Modal de modification d'une séance d'entraînement
 * Fonctionnalités :
 * - Formulaire pré-rempli avec les données existantes
 * - Validation Zod des modifications
 * - Gestion des erreurs avec feedback visuel
 * - États de chargement
 * - Mise à jour en temps réel
 *
 * @component
 * @param {EditWorkoutModalProps} props - Les propriétés du composant
 * @returns {JSX.Element} Modal d'édition de séance
 */
function EditWorkoutModal({ workout, closeModal }: EditWorkoutModalProps) {
  const queryClient = useQueryClient();

  /**
   * Configuration du formulaire avec validation Zod
   */
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(updateWorkoutSchema.shape.body),
    defaultValues: {
      name: workout.name
    }
  });

  /**
   * Mutation pour la mise à jour de la séance
   */
  const updateWorkoutMutation = useMutation({
    mutationFn: (data: FormData) => updateWorkout(workout.id, { name: data.name }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workouts'] });
      toast.success('Séance modifiée avec succès');
      closeModal();
    },
    onError: () => {
      toast.error('Erreur lors de la modification de la séance');
    }
  });

  const onSubmit = handleSubmit(data => {
    updateWorkoutMutation.mutate(data);
  });

  return (
    <Modal onClose={closeModal}>
      <Card size="sm" className="relative flex flex-col gap-4">
        <div className="relative flex w-full justify-center">
          <h2 className="text-xl font-semibold">Modifier la séance</h2>
          <X onClick={closeModal} className="absolute right-0 cursor-pointer text-neutral-11 hover:text-neutral-12" />
        </div>
        <hr className="border-neutral-6" />
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <FormField label="Nom de la séance" name="name" type="text" register={register} errors={errors} disabled={updateWorkoutMutation.isPending} />
          <div className="flex justify-end gap-2">
            <Button type="button" onClick={closeModal} disabled={updateWorkoutMutation.isPending} variant="secondary">
              Annuler
            </Button>
            <Button type="submit" isPending={updateWorkoutMutation.isPending}>
              Modifier
            </Button>
          </div>
        </form>
      </Card>
    </Modal>
  );
}

export default EditWorkoutModal;
