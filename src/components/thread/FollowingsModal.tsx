import { useQuery } from '@tanstack/react-query';
import { X } from 'lucide-react';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { fetchFollowings } from '../../services/followersService';
import { FollowingsType } from '../../types/followingsType';
import FollowingsSkeletons from '../skeletons/FollowingsSkeletons';
import Avatar from '../ui/Avatar';
import Button from '../ui/Button';
import Card from '../ui/Card';
import { Input } from '../ui/Input';
import Modal from '../ui/Modal';
import UnfollowModal from './UnfollowModal';

type FollowingsModalProps = {
  closeModal: () => void;
};

function FollowingsModal({ closeModal }: FollowingsModalProps) {
  const { user } = useContext(AuthContext);
  const [selectedFollowing, setSelectedFollowing] = useState<FollowingsType | null>(null);
  const id = user?.id;

  const { isPending: followingsPending, data: followings } = useQuery({
    queryKey: ['followings', id],
    queryFn: () => {
      if (!id) {
        throw new Error('Utilisateur non connecté');
      }
      return fetchFollowings(id);
    },
    enabled: !!id
  });

  const followingsData = followings?.data;

  return (
    <>
      <Modal size="md" onClose={closeModal}>
        <Card size="md" className="modal-content max-h-[60vh] overflow-y-auto">
          <div className="flex w-full justify-center">
            <h2 className="mb-4 text-xl font-semibold">Abonnements</h2>
            <X onClick={closeModal} className="absolute right-4 cursor-pointer text-neutral-11 hover:text-neutral-12" />
          </div>
          <hr className="mb-6 border-neutral-6" />
          <Input className="mb-6" placeholder="Rechercher un abonnement" />
          {followingsPending ? (
            <FollowingsSkeletons />
          ) : (
            <div className="flex flex-col gap-4">
              {followingsData.map((following: FollowingsType) => (
                <div key={following.id} className="flex items-center justify-between">
                  <Link to={`/profil/${following.id}`} className="group flex w-full cursor-pointer items-center gap-2">
                    <Avatar size="sm" src={following.profilePhoto} alt={`Photo de ${following.pseudo}`} />
                    <p className="text-sm text-neutral-11 group-hover:text-green-11">{following.pseudo}</p>
                  </Link>
                  <Button
                    onClick={() => setSelectedFollowing(following)}
                    className="w-fit border border-neutral-6 bg-neutral-1 text-neutral-11 shadow-sm hover:bg-neutral-2"
                  >
                    Suivie(e)
                  </Button>
                </div>
              ))}
            </div>
          )}
        </Card>
      </Modal>
      {selectedFollowing && <UnfollowModal following={selectedFollowing} closeModal={() => setSelectedFollowing(null)} />}
    </>
  );
}

export default FollowingsModal;
