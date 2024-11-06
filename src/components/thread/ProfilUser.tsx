import { UserDetails } from '../../types/userDetail';
import Avatar from '../ui/Avatar';

type ProfilUserProps = {
  user: UserDetails;
};

function ProfilUser({ user }: ProfilUserProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <Avatar alt="" size="md" src={user?.profilePhoto || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'} />
      <h1 className="text-xl font-semibold">{user?.pseudo || 'Utilisateur'}</h1>
    </div>
  );
}

export default ProfilUser;
