import { useContext } from 'react';
import ProfilPicture from '../../assets/images/profil.png';
import { AuthContext } from '../../context/AuthContext';
import Avatar from '../ui/Avatar';

function ProfilUser() {
  const { user } = useContext(AuthContext);

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <Avatar alt="" size="md" src={'/' + user?.profilePhoto || ProfilPicture} />
      <h1 className="text-xl font-semibold">{user?.pseudo || 'Utilisateur'}</h1>
    </div>
  );
}

export default ProfilUser;
