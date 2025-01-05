import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CalendarDays, MapPin } from 'lucide-react';
import { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../context/AuthContext';
import { formatRelativeTime } from '../../lib/formatRelativeTime';
import { follow } from '../../services/followersService';

import { UserDetailsType } from '@/types/userDetailsType';
import FollowersModal from '../thread/FollowersModal';
import FollowingsModal from '../thread/FollowingsModal';
import UnfollowModal from '../thread/UnfollowModal';
import Avatar from '../ui/Avatar';
import Button from '../ui/Button';

type ProfileCardProps = {
  userDetails: UserDetailsType | null;
};

function ProfileCardProfile({ userDetails }: ProfileCardProps) {
  const { user } = useContext(AuthContext);
  const [selectedFollowing, setSelectedFollowing] = useState<UserDetailsType | null>(null);
  const [showFollowersModal, setShowFollowersModal] = useState(false);
  const [showFollowingsModal, setShowFollowingsModal] = useState(false);
  const queryClient = useQueryClient();

  if (!userDetails) {
    throw new Error('Le profil est introuvable');
  }

  const mutation = useMutation({
    mutationFn: () => follow(userDetails.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['followings'] });
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });
      queryClient.invalidateQueries({ queryKey: ['userProfile'] });
      queryClient.invalidateQueries({ queryKey: ['suggested'] });
    }
  });

  const handleFollow = () => {
    if (userDetails.amIFollowing) {
      setSelectedFollowing(userDetails);
    }

    if (!userDetails.amIFollowing) {
      try {
        mutation.mutate();
        toast.success(`Vous suivez désormais ${userDetails.pseudo}`);
      } catch {
        toast.error("Une erreur est survenue lors de l'ajout de l'utilisateur");
      }
    }
  };

  return (
    <>
      <div className="relative flex items-center gap-4 border-b border-neutral-6 p-6 shadow-sm max-sm:flex-col max-sm:text-center">
        {user && user.id !== userDetails.id && (
          <Button variant="outline" onClick={handleFollow} className="absolute right-10 top-10">
            {userDetails.amIFollowing ? 'Suivi(e)' : 'Suivre'}
          </Button>
        )}
        <Avatar src={userDetails.profilePhoto || '/uploads/profil.png'} alt={`Photo de ${userDetails.pseudo}`} className="mr-1" size="xl" />
        <div>
          <h1 className="text-2xl font-bold">{userDetails.pseudo}</h1>
          <p className="text-neutral-11">{userDetails.bio || ''}</p>
          <div className="mt-2 flex items-center gap-6 text-sm text-neutral-10 max-sm:flex-col">
            <p>
              <MapPin size={16} className="mr-1 inline-block" />
              {userDetails.city?.name || 'Localisation non spécifiée'}
            </p>
            <p>
              <CalendarDays size={16} className="mr-1 inline-block" />A rejoint Ilift {userDetails.createdAt ? formatRelativeTime(userDetails.createdAt) : ''}
            </p>
          </div>
          <div className="mt-2 flex items-center gap-6 text-sm text-neutral-10">
            <p onClick={() => setShowFollowingsModal(true)} className="flex cursor-pointer items-center gap-1 hover:text-green-9">
              <span className="text-lg font-semibold text-green-9">{userDetails._count?.followedBy || 0}</span>
              abonnements
            </p>
            <p onClick={() => setShowFollowersModal(true)} className="flex cursor-pointer items-center gap-1 hover:text-green-9">
              <span className="text-lg font-semibold text-green-9">{userDetails._count?.following || 0}</span>
              abonnés
            </p>
            <p className="flex items-center gap-1">
              <span className="text-lg font-semibold text-green-9">{userDetails._count?.workouts || 0}</span>
              activités
            </p>
          </div>
        </div>
      </div>
      {selectedFollowing && <UnfollowModal following={selectedFollowing} closeModal={() => setSelectedFollowing(null)} />}
      {showFollowersModal && <FollowersModal userId={userDetails.id} closeModal={() => setShowFollowersModal(false)} />}
      {showFollowingsModal && <FollowingsModal userId={userDetails.id} closeModal={() => setShowFollowingsModal(false)} />}
    </>
  );
}

export default ProfileCardProfile;
