import { Link } from 'react-router-dom';
import { SuggestedUserType } from '../../types/SuggestedUserType';
import Avatar from '../ui/Avatar';
import Card from '../ui/Card';

/**
 * Props du composant SuggestedProfils
 * @typedef {object} SuggestedProfilsProps
 * @property {SuggestedUserType[]} suggestedUsers - Liste des utilisateurs suggérés
 */
type SuggestedProfilsProps = {
  suggestedUsers: SuggestedUserType[];
};

/**
 * Composant d'affichage des profils suggérés
 * Fonctionnalités :
 * - Affichage des avatars et pseudos des utilisateurs suggérés
 * - Affichage des informations de suivi commun
 * - Navigation vers les profils des utilisateurs
 *
 * @component
 * @param {SuggestedProfilsProps} props - Les propriétés du composant
 * @returns {JSX.Element} Liste des profils suggérés
 */
function SuggestedProfils({ suggestedUsers }: SuggestedProfilsProps) {
  return (
    <Card size="md" className="flex w-full flex-col gap-4">
      <div className="w-full border-b border-neutral-6 px-2 pb-2">
        <h2 className="font-semibold">Profils suggérés</h2>
      </div>
      {suggestedUsers.map((user, index) => (
        <Link to={`/profil/${user.id}`} key={index} className="flex items-center gap-4">
          <Avatar alt="" size="sm" src={user.profilePhoto || '/uploads/profil.webp'} />
          <div className="flex flex-col">
            <h1 className="font-semibold">{user.pseudo}</h1>
            <p className="text-xs text-neutral-11">
              {user.commonFollowersCount > 0 ? (
                <span>
                  Suivi(e) par {user.commonFollowers[0].pseudo}
                  {user.commonFollowersCount > 1 ? ` et ${user.commonFollowersCount - 1} autre${user.commonFollowersCount > 2 ? 's' : ''}` : ''}
                </span>
              ) : (
                <span>Suggestions</span>
              )}
            </p>
          </div>
        </Link>
      ))}
    </Card>
  );
}

export default SuggestedProfils;
