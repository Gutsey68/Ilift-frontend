import { LoaderCircle, X } from 'lucide-react';
import Button from '../ui/Button';
import Card from '../ui/Card';
import Modal from '../ui/Modal';

/**
 * Props du composant ConfirmShareModal
 * @typedef {object} ConfirmShareModalProps
 * @property {() => void} onClose - Fonction de fermeture du modal
 * @property {() => void} onConfirm - Fonction appelée lors de la confirmation
 * @property {boolean} [isLoading] - État de chargement du modal
 */
type ConfirmShareModalProps = {
  onClose: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
};

/**
 * Modal de confirmation pour le partage d'une publication
 * Affiche une boîte de dialogue demandant confirmation avant le partage
 * avec gestion de l'état de chargement
 *
 * @component
 * @param {ConfirmShareModalProps} props - Les propriétés du composant
 * @returns {JSX.Element} Modal de confirmation de partage
 */
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
          <Button onClick={onClose} variant="secondary">
            Annuler
          </Button>
          <Button onClick={onConfirm} disabled={isLoading} isPending={isLoading}>
            {isLoading ? <LoaderCircle className="animate-spin" size={20} /> : 'Republier'}
          </Button>
        </div>
      </Card>
    </Modal>
  );
}

export default ConfirmShareModal;
