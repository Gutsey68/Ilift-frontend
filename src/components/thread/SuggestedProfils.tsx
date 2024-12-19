import { Link } from 'react-router-dom';
import ProfilPicture from '../../assets/images/profil.png';
import Avatar from '../ui/Avatar';
import Card from '../ui/Card';
import { SuggestedUserType } from '../../types/suggestedUserType';

type SuggestedProfilsProps = {
  suggestedUsers: SuggestedUserType[];
};

function SuggestedProfils({ suggestedUsers }: SuggestedProfilsProps) {
  return (
    <Card size="md" className="flex w-full flex-col gap-4">
      <div className="w-full border-b border-neutral-6 px-2 pb-2">
        <h2 className="font-semibold">Profils suggérés</h2>
      </div>
      {suggestedUsers.map((user, index) => (
        <Link to={`/profil/${user.id}`} key={index} className="flex items-center gap-4">
          <Avatar alt="" size="sm" src={user.profilePhoto || ProfilPicture} />
          <div className="flex flex-col">
            <h1 className="font-semibold">{user.pseudo}</h1>
            <p className="text-xs text-neutral-11">
              {user.commonFollowersCount > 0 ? (
                <span>
                  Suivi(e) par {user.commonFollowers[0].pseudo}
                  {user.commonFollowersCount > 1 ? ` et ${user.commonFollowersCount - 1} autres` : ''}
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
