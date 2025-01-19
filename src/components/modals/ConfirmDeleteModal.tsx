import { X } from 'lucide-react';
import Button from '../ui/Button';
import Card from '../ui/Card';
import Modal from '../ui/Modal';

/**
 * Props du composant ConfirmDeleteModal
 * @typedef {object} ConfirmDeleteModalProps
 * @property {() => void} onClose - Fonction de fermeture du modal
 * @property {() => void} onConfirm - Fonction appelée lors de la confirmation
 * @property {string} title - Titre du modal
 * @property {string} message - Message de confirmation
 * @property {boolean} [isLoading] - État de chargement du modal
 */
type ConfirmDeleteModalProps = {
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  isLoading?: boolean;
};

/**
 * Modal générique de confirmation de suppression
 * Affiche une boîte de dialogue demandant confirmation avant une suppression
 * avec gestion de l'état de chargement et messages personnalisables
 *
 * @component
 * @param {ConfirmDeleteModalProps} props - Les propriétés du composant
 * @returns {JSX.Element} Modal de confirmation de suppression
 */
function ConfirmDeleteModal({ onClose, onConfirm, title, message, isLoading }: ConfirmDeleteModalProps) {
  return (
    <Modal onClose={onClose}>
      <Card size="sm" className="relative flex flex-col gap-4">
        <div className="relative flex w-full justify-center">
          <h2 className="text-xl font-semibold">{title}</h2>
          <X onClick={onClose} className="absolute right-0 cursor-pointer text-neutral-11 hover:text-neutral-12" />
        </div>
        <hr className="border-neutral-6" />
        <p className="text-center text-neutral-11">{message}</p>
        <div className="flex justify-end gap-2">
          <Button onClick={onClose} variant="secondary">
            Annuler
          </Button>
          <Button variant="destructive" onClick={onConfirm} disabled={isLoading} isPending={isLoading}>
            Supprimer
          </Button>
        </div>
      </Card>
    </Modal>
  );
}

export default ConfirmDeleteModal;
