import { zodResolver } from '@hookform/resolvers/zod';
import { X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { updateUserSchema } from '../../validators/users.validation';
import FormField from '../auth/FormField';
import Button from '../ui/Button';
import Card from '../ui/Card';
import Modal from '../ui/Modal';

/**
 * Props du composant EditModal
 * @typedef {object} EditModalProps
 * @property {() => void} onClose - Fonction de fermeture du modal
 * @property {(value: string) => void} onConfirm - Fonction appelée à la validation du formulaire
 * @property {string} title - Titre du modal
 * @property {string} initialValue - Valeur initiale du champ
 * @property {'bio' | 'city'} fieldName - Type de champ à éditer
 * @property {boolean} [isLoading] - État de chargement du formulaire
 */
type EditModalProps = {
  onClose: () => void;
  onConfirm: (value: string) => void;
  title: string;
  initialValue: string;
  fieldName: 'bio' | 'city';
  isLoading?: boolean;
};

/**
 * Modal d'édition générique pour les champs bio et ville
 * Fonctionnalités :
 * - Validation des données avec Zod
 * - Gestion des erreurs de formulaire
 * - États de chargement
 * - Formulaire pré-rempli
 *
 * @component
 * @param {EditModalProps} props - Les propriétés du composant
 * @returns {JSX.Element} Modal avec formulaire d'édition
 */
function EditModal({ onClose, onConfirm, title, initialValue, fieldName, isLoading }: EditModalProps) {
  /**
   * Construit le schéma de validation en fonction du champ
   */
  const getSchema = () => {
    const baseSchema = updateUserSchema.shape.body;

    if (fieldName === 'bio') {
      return z.object({
        value: baseSchema.shape.bio
      });
    }

    return z.object({
      value: baseSchema.shape.city
    });
  };

  type FormData = { value: string };

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(getSchema()),
    defaultValues: {
      value: initialValue
    }
  });

  /**
   * Gère la soumission du formulaire
   */
  const onSubmit = handleSubmit((data: FormData) => {
    onConfirm(data.value);
  });

  return (
    <Modal onClose={onClose}>
      <Card size="sm" className="relative flex flex-col gap-4">
        <div className="relative flex w-full justify-center">
          <h2 className="text-xl font-semibold">{title}</h2>
          <X onClick={onClose} className="absolute right-0 cursor-pointer text-neutral-11 hover:text-neutral-12" />
        </div>
        <hr className="border-neutral-6" />
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <FormField
            label={fieldName === 'bio' ? 'Bio' : 'Ville'}
            name="value"
            type="text"
            register={register}
            errors={errors as Record<string, { message?: string }>}
            disabled={isLoading}
          />
          <div className="flex justify-end gap-2">
            <Button type="button" onClick={onClose} variant="secondary">
              Annuler
            </Button>
            <Button>Sauvegarder</Button>
          </div>
        </form>
      </Card>
    </Modal>
  );
}

export default EditModal;
