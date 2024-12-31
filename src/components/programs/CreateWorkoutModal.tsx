import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { LoaderCircle, X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import type { z } from 'zod';
import { createWorkout } from '../../services/workoutsService';
import { createWorkoutSchema } from '../../validators/workouts.validation';
import FormField from '../auth/FormField';
import Card from '../ui/Card';
import Modal from '../ui/Modal';

type CreateWorkoutModalProps = {
  closeModal: () => void;
};

type FormData = z.infer<typeof createWorkoutSchema>['body'];

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
            <button type="button" onClick={closeModal} className="rounded-md bg-neutral-4 px-4 py-2 text-sm font-medium text-neutral-12 hover:bg-neutral-5">
              Annuler
            </button>
            <button
              type="submit"
              disabled={createWorkoutMutation.isPending}
              className="rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-neutral-1 hover:bg-green-500"
            >
              {createWorkoutMutation.isPending ? <LoaderCircle className="animate-spin" size={20} /> : 'Créer'}
            </button>
          </div>
        </form>
      </Card>
    </Modal>
  );
}

export default CreateWorkoutModal;
