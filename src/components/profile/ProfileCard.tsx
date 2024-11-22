import { CalendarDays, Camera, MapPin } from 'lucide-react';
import ProfilPicture from '../../assets/images/profil.png';
import { formatRelativeTime } from '../../lib/formatRelativeTime';
import { UserDetailsType } from '../../types/userDetailsType';
import Avatar from '../ui/Avatar';

type ProfileCardProps = {
  userDetails: UserDetailsType | null;
};

function ProfileCard({ userDetails }: ProfileCardProps) {
  if (!userDetails) {
    return <div>Erreur : Aucun utilisateur trouvé.</div>;
  }

  return (
    <div className="flex items-center gap-4 border-b border-neutral-6 p-6 shadow-sm">
      <div className="relative">
        <Avatar src={userDetails.profilePhoto || ProfilPicture} alt="" className="mr-1" size="xl" />
        <button className="absolute bottom-3 right-1 flex size-7 cursor-pointer items-center justify-center rounded-full border-2 border-neutral-1 bg-green-11 shadow-md">
          <Camera size={20} className="text-neutral-1" />
        </button>
      </div>
      <div>
        <h1 className="text-2xl font-bold">{userDetails.pseudo}</h1>
        <p className="text-neutral-11">{userDetails.bio || ''}</p>
        <div className="mt-2 flex items-center gap-6 text-sm text-neutral-10">
          <p>
            <MapPin size={16} className="mr-1 inline-block" />
            {userDetails.city?.name || 'Localisation non spécifiée'}
          </p>
          <p>
            <CalendarDays size={16} className="mr-1 inline-block" />A rejoint Ilift {userDetails.createdAt ? formatRelativeTime(userDetails.createdAt) : ''}
          </p>
        </div>
        <div className="mt-2 flex items-center gap-6 text-sm text-neutral-10">
          <p className="flex items-center gap-1">
            <span className="text-lg font-semibold text-green-9">{userDetails._count?.followedBy || 0}</span>
            abonnements
          </p>
          <p className="flex items-center gap-1">
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
  );
}

export default ProfileCard;
