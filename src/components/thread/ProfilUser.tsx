import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import Avatar from '../ui/Avatar';

/**
 * Composant d'affichage des informations de l'utilisateur dans le profil
 * Fonctionnalités :
 * - Affichage de l'avatar de l'utilisateur
 * - Affichage du pseudo de l'utilisateur
 *
 * @component
 * @returns {JSX.Element} Informations de l'utilisateur dans le profil
 */
function ProfilUser() {
  const { user } = useContext(AuthContext);

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <Avatar alt="" size="md" src={user?.profilePhoto || '/uploads/profil.webp'} />
      <h1 className="text-xl font-semibold">{user?.pseudo || 'Utilisateur'}</h1>
    </div>
  );
}

export default ProfilUser;
