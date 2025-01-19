import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import type { z } from 'zod';
import { createWorkout } from '../../services/workoutsService';
import { createWorkoutSchema } from '../../validators/workouts.validation';
import FormField from '../auth/FormField';
import Button from '../ui/Button';
import Card from '../ui/Card';
import Modal from '../ui/Modal';

/**
 * Props du composant CreateWorkoutModal
 * @typedef {object} CreateWorkoutModalProps
 * @property {() => void} closeModal - Fonction de fermeture du modal
 */
type CreateWorkoutModalProps = {
  closeModal: () => void;
};

type FormData = z.infer<typeof createWorkoutSchema>['body'];

/**
 * Modal de création de séance d'entraînement
 * Fonctionnalités :
 * - Formulaire validé avec Zod
 * - Création de séance dans un programme
 * - Gestion des erreurs de validation
 * - Retours visuels des actions
 * - Association automatique au programme courant
 *
 * @component
 * @param {CreateWorkoutModalProps} props - Les propriétés du composant
 * @returns {JSX.Element} Modal de création de séance
 */
function CreateWorkoutModal({ closeModal }: CreateWorkoutModalProps) {
  const { id: programId } = useParams();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(createWorkoutSchema.shape.body),
    defaultValues: {
      name: '',
      programId: programId
    }
  });

  /**
   * Mutation pour la création de la séance
   */
  const createWorkoutMutation = useMutation({
    mutationFn: (data: FormData) => createWorkout(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workouts'] });
      toast.success('Séance créée avec succès');
      closeModal();
    },
    onError: () => {
      toast.error('Erreur lors de la création de la séance');
    }
  });

  /**
   * Gère la soumission du formulaire
   */
  const onSubmit = handleSubmit(data => {
    createWorkoutMutation.mutate(data);
  });

  return (
    <Modal onClose={closeModal}>
      <Card size="sm" className="relative flex flex-col gap-4">
        <div className="relative flex w-full justify-center">
          <h2 className="text-xl font-semibold">Créer une séance</h2>
          <X onClick={closeModal} className="absolute right-0 cursor-pointer text-neutral-11 hover:text-neutral-12" />
        </div>
        <hr className="border-neutral-6" />
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <FormField
            label="Nom de la séance"
            name="name"
            type="text"
            register={register}
            errors={errors}
            disabled={createWorkoutMutation.isPending}
            placeholder="Ex: Séance pectoraux"
          />
          <div className="flex justify-end gap-2">
            <Button onClick={closeModal} variant="secondary">
              Annuler
            </Button>
            <Button type="submit" isPending={createWorkoutMutation.isPending}>
              Créer
            </Button>
          </div>
        </form>
      </Card>
    </Modal>
  );
}

export default CreateWorkoutModal;
