import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { LoaderCircle, X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import type { z } from 'zod';
import { createProgram } from '../../services/programsService';
import { createProgramSchema } from '../../validators/programs.validation';
import FormField from '../auth/FormField';
import Card from '../ui/Card';
import Modal from '../ui/Modal';
import TextareaField from '../ui/TextareaField';

type CreateProgramModalProps = {
  closeModal: () => void;
};

type FormData = z.infer<typeof createProgramSchema>['body'];

function CreateProgramModal({ closeModal }: CreateProgramModalProps) {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(createProgramSchema.shape.body),
    defaultValues: {
      name: '',
      description: ''
    }
  });

  const createProgramMutation = useMutation({
    mutationFn: (data: FormData) => {
      const payload = {
        name: data.name,
        ...(data.description && { description: data.description })
      };
      return createProgram({
        ...payload,
        description: payload.description || ''
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['programs'] });
      toast.success('Programme créé avec succès');
      closeModal();
    },
    onError: () => {
      toast.error('Erreur lors de la création du programme');
    }
  });

  const onSubmit = handleSubmit(data => {
    createProgramMutation.mutate(data);
  });

  return (
    <Modal onClose={closeModal}>
      <Card size="sm" className="relative flex flex-col gap-4">
        <div className="relative flex w-full justify-center">
          <h2 className="text-xl font-semibold">Créer un programme</h2>
          <X onClick={closeModal} className="absolute right-0 cursor-pointer text-neutral-11 hover:text-neutral-12" />
        </div>
        <hr className="border-neutral-6" />
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <FormField
            label="Nom du programme"
            name="name"
            type="text"
            register={register}
            errors={errors}
            disabled={createProgramMutation.isPending}
            placeholder="Ex: Programme 4 séances uniquement pecs"
          />
          <TextareaField
            label="Description"
            name="description"
            register={register}
            errors={errors}
            disabled={createProgramMutation.isPending}
            placeholder="Décrivez votre programme..."
          />
          <div className="flex justify-end gap-2">
            <button type="button" onClick={closeModal} className="rounded-md bg-neutral-4 px-4 py-2 text-sm font-medium text-neutral-12 hover:bg-neutral-5">
              Annuler
            </button>
            <button
              type="submit"
              disabled={createProgramMutation.isPending}
              className="rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-neutral-1 hover:bg-green-500"
            >
              {createProgramMutation.isPending ? <LoaderCircle className="animate-spin" size={20} /> : 'Créer'}
            </button>
          </div>
        </form>
      </Card>
    </Modal>
  );
}

export default CreateProgramModal;
