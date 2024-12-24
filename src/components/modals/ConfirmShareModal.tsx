import { LoaderCircle, X } from 'lucide-react';
import Card from '../ui/Card';
import Modal from '../ui/Modal';

type ConfirmShareModalProps = {
  onClose: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
};

function ConfirmShareModal({ onClose, onConfirm, isLoading }: ConfirmShareModalProps) {
  return (
    <Modal onClose={onClose}>
      <Card size="sm" className="relative flex flex-col gap-4">
        <div className="relative flex w-full justify-center">
          <h2 className="text-xl font-semibold">Republier</h2>
          <X onClick={onClose} className="absolute right-0 cursor-pointer text-neutral-11 hover:text-neutral-12" />
        </div>
        <hr className="border-neutral-6" />
        <p className="text-center text-neutral-11">Voulez-vous republier cette publication ?</p>
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="rounded-md bg-neutral-4 px-4 py-2 text-sm font-medium text-neutral-12 hover:bg-neutral-5">
            Annuler
          </button>
          <button onClick={onConfirm} disabled={isLoading} className="rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-500">
            {isLoading ? <LoaderCircle className="animate-spin" size={20} /> : 'Republier'}
          </button>
        </div>
      </Card>
    </Modal>
  );
}

export default ConfirmShareModal;
