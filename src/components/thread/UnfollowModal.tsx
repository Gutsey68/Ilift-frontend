import { useMutation, useQueryClient } from '@tanstack/react-query';
import { X } from 'lucide-react';
import toast from 'react-hot-toast';
import { unfollow } from '../../services/followersService';
import { FollowingsType } from '../../types/followingsType';
import { UserDetailsType } from '../../types/UserDetailsType';
import Avatar from '../ui/Avatar';
import Card from '../ui/Card';
import Modal from '../ui/Modal';

/**
 * Props du composant UnfollowModal
 * @typedef {object} UnfollowModalProps
 * @property {() => void} closeModal - Fonction de fermeture du modal
 * @property {FollowingsType | UserDetailsType} following - Informations sur l'utilisateur à ne plus suivre
 */
type UnfollowModalProps = {
  closeModal: () => void;
  following: FollowingsType | UserDetailsType;
};

/**
 * Modal de confirmation pour arrêter de suivre un utilisateur
 * Fonctionnalités :
 * - Affichage des informations de l'utilisateur
 * - Confirmation de l'action de ne plus suivre
 * - Gestion des états de chargement
 * - Notifications de succès/erreur
 * - Mise à jour automatique des données
 *
 * @component
 * @param {UnfollowModalProps} props - Les propriétés du composant
 * @returns {JSX.Element} Modal de confirmation pour arrêter de suivre un utilisateur
 */
function UnfollowModal({ closeModal, following }: UnfollowModalProps) {
  const queryClient = useQueryClient();

  /**
   * Mutation pour arrêter de suivre l'utilisateur
   */
  const mutation = useMutation({
    mutationFn: () => unfollow(following.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['followings'] });
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });
      queryClient.invalidateQueries({ queryKey: ['suggested'] });
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });
      queryClient.invalidateQueries({ queryKey: ['userProfile'] });
      closeModal();
    }
  });

  /**
   * Gère l'action de ne plus suivre avec retour visuel
   */
  const handleUnfollow = () => {
    try {
      mutation.mutate();
      toast.success(`Vous ne suivez plus ${following.pseudo}`);
    } catch {
      toast.error("Une erreur est survenue lors de l'arrêt du suivi de l'utilisateur");
    }
  };

  return (
    <Modal size="sm" onClose={closeModal}>
      <Card size="lg" className="max-h-[60vh] overflow-y-auto text-center">
        <Avatar className="m-auto" size="lg" src={following.profilePhoto || '/uploads/profil.png'} alt={`Photo de ${following.pseudo}`} />
        <p className="py-2 text-neutral-11">Ne plus suivre {following.pseudo} ?</p>
        <hr className="border-neutral-6" />
        <button disabled={mutation.status === 'pending'} onClick={handleUnfollow} className="cursor-pointer py-2 text-red-11 hover:text-red-10">
          {mutation.status === 'pending' ? 'Suppression en cours...' : 'Ne plus suivre'}
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
export default UnfollowModal;
