import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import type { z } from 'zod';
import { updateProgram } from '../../services/programsService';
import { ProgramType } from '../../types/programsType';
import { updateProgramSchema } from '../../validators/programs.validation';
import FormField from '../auth/FormField';
import Button from '../ui/Button';
import Card from '../ui/Card';
import Modal from '../ui/Modal';
import TextareaField from '../ui/TextareaField';

/**
 * Props du composant EditProgramModal
 * @typedef {object} EditProgramModalProps
 * @property {ProgramType} program - Le programme à modifier
 * @property {() => void} onClose - Fonction de fermeture du modal
 */
type EditProgramModalProps = {
  program: ProgramType;
  onClose: () => void;
};

type FormData = z.infer<typeof updateProgramSchema>['body'];

/**
 * Modal de modification de programme d'entraînement
 * Fonctionnalités :
 * - Formulaire pré-rempli avec les données existantes
 * - Validation Zod des modifications
 * - Gestion des erreurs de validation
 * - Mutation React Query avec retours visuels
 * - Champs optionnels (description)
 *
 * @component
 * @param {EditProgramModalProps} props - Les propriétés du composant
 * @returns {JSX.Element} Modal d'édition de programme
 */
function EditProgramModal({ program, onClose }: EditProgramModalProps) {
  const queryClient = useQueryClient();

  /**
   * Configuration du formulaire avec valeurs initiales
   */
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(updateProgramSchema.shape.body),
    defaultValues: {
      name: program.name,
      description: program.description || ''
    }
  });

  /**
   * Mutation pour la mise à jour du programme
   */
  const updateProgramMutation = useMutation({
    mutationFn: (data: FormData) => updateProgram(program.id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['programs'] });
      toast.success('Programme modifié avec succès');
      onClose();
    },
    onError: () => {
      toast.error('Erreur lors de la modification du programme');
    }
  });

  /**
   * Gère la soumission du formulaire
   */
  const onSubmit = handleSubmit(data => {
    updateProgramMutation.mutate(data);
  });

  return (
    <Modal onClose={onClose}>
      <Card size="sm" className="relative flex flex-col gap-4">
        <div className="relative flex w-full justify-center">
          <h2 className="text-xl font-semibold">Modifier le programme</h2>
          <X onClick={onClose} className="absolute right-0 cursor-pointer text-neutral-11 hover:text-neutral-12" />
        </div>
        <hr className="border-neutral-6" />
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <FormField label="Nom du programme" name="name" type="text" register={register} errors={errors} disabled={updateProgramMutation.isPending} />
          <TextareaField label="Description" name="description" register={register} errors={errors} disabled={updateProgramMutation.isPending} />
          <div className="flex justify-end gap-2">
            <Button disabled={updateProgramMutation.isPending} type="button" onClick={onClose} variant="secondary">
              Annuler
            </Button>
            <Button type="submit" isPending={updateProgramMutation.isPending}>
              Modifier
            </Button>
          </div>
        </form>
      </Card>
    </Modal>
  );
}

export default EditProgramModal;
