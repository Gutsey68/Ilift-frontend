import { useQuery } from '@tanstack/react-query';
import { X } from 'lucide-react';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { fetchFollowers } from '../../services/followersService';
import { FollowingsType } from '../../types/followingsType';
import FollowingsSkeletons from '../skeletons/FollowingsSkeletons';
import Avatar from '../ui/Avatar';
import Button from '../ui/Button';
import Card from '../ui/Card';
import { Input } from '../ui/Input';
import Modal from '../ui/Modal';
import DeleteFollowerModal from './DeleteFollowerModal';

type FollowersModalProps = {
  closeModal: () => void;
};

function FollowersModal({ closeModal }: FollowersModalProps) {
  const { user } = useContext(AuthContext);
  const [selectedFollower, setSelectedFollower] = useState<FollowingsType | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const id = user?.id;

  const { isPending: followersPending, data: followers } = useQuery({
    queryKey: ['followers', id],
    queryFn: () => {
      if (!id) {
        throw new Error('Utilisateur non connecté');
      }
      return fetchFollowers(id);
    },
    enabled: !!id
  });

  const followersData = followers?.data;

  const filteredFollowers = followersData?.filter((follower: FollowingsType) => follower.pseudo.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <>
      <Modal size="lg" onClose={closeModal}>
        <Card size="lg" className="modal-content max-h-[60vh] overflow-y-auto">
          <div className="relative flex w-full justify-center">
            <h2 className="mb-4 text-xl font-semibold">Abonnés</h2>
            <X onClick={closeModal} className="absolute right-4 cursor-pointer text-neutral-11 hover:text-neutral-12" />
          </div>
          <hr className="mb-6 border-neutral-6" />
          <Input className="mb-8" placeholder="Rechercher un abonné" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
          {followersPending ? (
            <FollowingsSkeletons />
          ) : (
            <div className="flex flex-col gap-4">
              {filteredFollowers.map((follower: FollowingsType) => (
                <div key={follower.id} className="flex items-center justify-between">
                  <Link to={`/profil/${follower.id}`} className="group flex w-full cursor-pointer items-center gap-2">
                    <Avatar size="sm" src={follower.profilePhoto} alt={`Photo de ${follower.pseudo}`} />
                    <p className="text-sm text-neutral-11 group-hover:text-green-11">{follower.pseudo}</p>
                  </Link>
                  <Button
                    onClick={() => setSelectedFollower(follower)}
                    className="w-fit border border-neutral-6 bg-neutral-1 text-neutral-11 shadow-sm hover:bg-neutral-2"
                  >
                    Supprimer
                  </Button>
                </div>
              ))}
            </div>
          )}
        </Card>
      </Modal>
      {selectedFollower && <DeleteFollowerModal follower={selectedFollower} closeModal={() => setSelectedFollower(null)} />}
    </>
  );
}

export default FollowersModal;
