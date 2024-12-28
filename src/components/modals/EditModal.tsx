import { zodResolver } from '@hookform/resolvers/zod';
import { LoaderCircle, X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { updateUserSchema } from '../../validators/users.validation';
import FormField from '../auth/FormField';
import Card from '../ui/Card';
import Modal from '../ui/Modal';

type EditModalProps = {
  onClose: () => void;
  onConfirm: (value: string) => void;
  title: string;
  initialValue: string;
  fieldName: 'bio' | 'city';
  isLoading?: boolean;
};

function EditModal({ onClose, onConfirm, title, initialValue, fieldName, isLoading }: EditModalProps) {
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
            label={fieldName === 'bio' ? 'Biographie' : 'Ville'}
            name="value"
            type="text"
            register={register}
            errors={errors as Record<string, { message?: string }>}
            disabled={isLoading}
          />
          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="rounded-md bg-neutral-4 px-4 py-2 text-sm font-medium text-neutral-12 hover:bg-neutral-5">
              Annuler
            </button>
            <button type="submit" disabled={isLoading} className="rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-neutral-1 hover:bg-green-500">
              {isLoading ? <LoaderCircle className="animate-spin" size={20} /> : 'Sauvegarder'}
            </button>
          </div>
        </form>
      </Card>
    </Modal>
  );
}

export default EditModal;
