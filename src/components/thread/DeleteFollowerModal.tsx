import { useMutation, useQueryClient } from '@tanstack/react-query';
import { X } from 'lucide-react';
import toast from 'react-hot-toast';
import { deleteFollower } from '../../services/followersService';
import { FollowingsType } from '../../types/followingsType';
import Avatar from '../ui/Avatar';
import Card from '../ui/Card';
import Modal from '../ui/Modal';

/**
 * Props du composant DeleteFollowerModal
 * @typedef {object} DeleteFollowerModalProps
 * @property {() => void} closeModal - Fonction de fermeture du modal
 * @property {FollowingsType} follower - Informations sur l'abonné à supprimer
 */
type DeleteFollowerModalProps = {
  closeModal: () => void;
  follower: FollowingsType;
};

/**
 * Modal de confirmation pour la suppression d'un abonné
 * Fonctionnalités :
 * - Affichage des informations de l'abonné
 * - Confirmation de suppression
 * - Gestion des états de chargement
 * - Notifications de succès/erreur
 * - Mise à jour automatique des données
 *
 * @component
 * @param {DeleteFollowerModalProps} props - Les propriétés du composant
 * @returns {JSX.Element} Modal de suppression d'abonné
 */
function DeleteFollowerModal({ closeModal, follower }: DeleteFollowerModalProps) {
  const queryClient = useQueryClient();

  /**
   * Mutation pour la suppression de l'abonné
   */
  const mutation = useMutation({
    mutationFn: () => deleteFollower(follower.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['followers'] });
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });
      closeModal();
    }
  });

  /**
   * Gère la suppression avec retour visuel
   */
  const handleDelete = () => {
    try {
      mutation.mutate();
      toast.success('Abonné supprimé avec succès');
    } catch {
      toast.error("Une erreur est survenue lors de la suppression de l'abonné");
    }
  };

  return (
    <Modal size="sm" onClose={closeModal}>
      <Card size="lg" className="max-h-[60vh] overflow-y-auto text-center">
        <Avatar className="m-auto" size="lg" src={follower.profilePhoto || '/uploads/profil.png'} alt={`Photo de ${follower.pseudo}`} />
        <p className="mt-4">Supprimer le follower ?</p>
        <p className="py-2 text-xs text-neutral-11">
          Nous n'informerons pas <span className="text-neutral-12">{follower.pseudo}</span> que vous avez supprimé son compte de vos followers.
        </p>
        <hr className="border-neutral-6" />
        <button onClick={handleDelete} className="cursor-pointer py-2 text-red-11 hover:text-red-10">
          {mutation.status === 'pending' ? 'Suppression en cours...' : 'Supprimer'}
        </button>
        <hr className="border-neutral-6" />
        <button className="cursor-pointer pt-2 text-neutral-11 hover:text-neutral-12" onClick={closeModal}>
          Annuler
        </button>
        <X onClick={closeModal} className="absolute right-4 top-4 cursor-pointer text-neutral-11 hover:text-neutral-12" />
      </Card>
    </Modal>
  );
}

export default DeleteFollowerModal;
