import { Link } from 'react-router-dom';
import usersData from '../../../seeds.json';
import Avatar from '../ui/Avatar';
import Card from '../ui/Card';

function SuggestedProfils() {
  return (
    <Card size="md" className="sticky top-[80px] flex flex-col gap-4">
      <div className="w-full border-b border-neutral-6 px-2 pb-2">
        <h2 className="font-semibold">Profils suggérés</h2>
      </div>
      {usersData.users.map((user, index) => (
        <Link to={`/profil/user1-id`} key={index} className="flex items-center gap-4">
          <Avatar alt="" size="sm" src={user.profilePhoto} />
          <div className="flex flex-col">
            <h1 className="font-semibold">{user.pseudo}</h1>
            <p className="text-xs text-neutral-11">Suivi(e) par ...</p>
          </div>
        </Link>
      ))}
    </Card>
  );
}
export default SuggestedProfils;
