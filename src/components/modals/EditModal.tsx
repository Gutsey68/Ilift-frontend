import { LoaderCircle, X } from 'lucide-react';
import { useState } from 'react';
import Card from '../ui/Card';
import { Input } from '../ui/Input';
import Modal from '../ui/Modal';

type EditModalProps = {
  onClose: () => void;
  onConfirm: (value: string) => void;
  title: string;
  initialValue: string;
  fieldName: string;
  isLoading?: boolean;
};

function EditModal({ onClose, onConfirm, title, initialValue, fieldName, isLoading }: EditModalProps) {
  const [value, setValue] = useState(initialValue);

  return (
    <Modal onClose={onClose}>
      <Card size="sm" className="relative flex flex-col gap-4">
        <div className="relative flex w-full justify-center">
          <h2 className="text-xl font-semibold">{title}</h2>
          <X onClick={onClose} className="absolute right-0 cursor-pointer text-neutral-11 hover:text-neutral-12" />
        </div>
        <hr className="border-neutral-6" />
        <Input value={value} onChange={e => setValue(e.target.value)} placeholder={`Votre ${fieldName}`} />
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="rounded-md bg-neutral-4 px-4 py-2 text-sm font-medium text-neutral-12 hover:bg-neutral-5">
            Annuler
          </button>
          <button
            onClick={() => onConfirm(value)}
            disabled={isLoading}
            className="rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-neutral-1 hover:bg-green-500"
          >
            {isLoading ? <LoaderCircle className="animate-spin" size={20} /> : 'Sauvegarder'}
          </button>
        </div>
      </Card>
    </Modal>
  );
}

export default EditModal;
