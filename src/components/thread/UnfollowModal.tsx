import { X } from 'lucide-react';
import { unfollow } from '../../services/followersService';
import { FollowingsType } from '../../types/followingsType';
import Avatar from '../ui/Avatar';
import Card from '../ui/Card';
import Modal from '../ui/Modal';

type UnfollowModalProps = {
  closeModal: () => void;
  following: FollowingsType;
};

function UnfollowModal({ closeModal, following }: UnfollowModalProps) {
  const handleUnfollow = () => {
    try {
      unfollow(following.id);
      closeModal();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal size="sm" onClose={closeModal}>
      <Card size="lg" className="max-h-[60vh] overflow-y-auto text-center">
        <Avatar className="m-auto" size="lg" src={following.profilePhoto} alt={`Photo de ${following.pseudo}`} />
        <p className="py-2 text-neutral-11">Ne plus suivre {following.pseudo} ?</p>
        <hr className="border-neutral-6" />
        <p onClick={handleUnfollow} className="cursor-pointer py-2 text-red-600 hover:text-red-500">
          Ne plus suivre
        </p>
        <hr className="border-neutral-6" />
        <p className="cursor-pointer pt-2 text-neutral-11 hover:text-neutral-12" onClick={closeModal}>
          Annuler
        </p>
        <X onClick={closeModal} className="absolute right-4 top-4 cursor-pointer text-neutral-11 hover:text-neutral-12" />
      </Card>
    </Modal>
  );
}
export default UnfollowModal;
