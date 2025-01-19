import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import type { z } from 'zod';
import { createProgram } from '../../services/programsService';
import { createProgramSchema } from '../../validators/programs.validation';
import FormField from '../auth/FormField';
import Button from '../ui/Button';
import Card from '../ui/Card';
import Modal from '../ui/Modal';
import TextareaField from '../ui/TextareaField';

/**
 * Props du composant CreateProgramModal
 * @typedef {object} CreateProgramModalProps
 * @property {() => void} closeModal - Fonction de fermeture du modal
 */
type CreateProgramModalProps = {
  closeModal: () => void;
};

type FormData = z.infer<typeof createProgramSchema>['body'];

/**
 * Modal de création de programme d'entraînement
 * Fonctionnalités :
 * - Formulaire validé avec Zod
 * - Gestion des erreurs de validation
 * - Retours visuels des actions
 * - Mutation React Query
 * - Description optionnelle
 *
 * @component
 * @param {CreateProgramModalProps} props - Les propriétés du composant
 * @returns {JSX.Element} Modal de création de programme
 */
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

  /**
   * Mutation pour la création du programme
   * Gère les succès et erreurs avec des notifications
   */
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

  /**
   * Gère la soumission du formulaire
   */
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
            <Button variant="secondary" type="button" onClick={closeModal}>
              Annuler
            </Button>
            <Button type="submit" isPending={createProgramMutation.isPending}>
              Créer
            </Button>
          </div>
        </form>
      </Card>
    </Modal>
  );
}

export default CreateProgramModal;
