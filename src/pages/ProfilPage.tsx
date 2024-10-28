import { useParams } from 'react-router-dom';
import data from '../../seeds.json';
import ProfileCard from '../components/profile/ProfileCard';
import SuggestedProfils from '../components/thread/SuggestedProfils';
import Card from '../components/ui/Card';

function ProfilPage() {
  const { id } = useParams();
  const { users } = data;
  const user = users.find(user => user.id === Number(id));

  return (
    <div className="mx-auto flex w-full max-w-6xl gap-6">
      <div className="flex w-2/3 flex-col">
        <Card size="xxs" className="sticky top-20 flex flex-col">
          {user && <ProfileCard usersData={user} />}
          <div className="flex cursor-pointer items-center justify-center text-center text-neutral-11">
            <div className="w-1/3 border-b border-neutral-6 py-2 hover:border-green-9">Publications</div>
            <div className="w-1/3 border-b border-neutral-6 py-2 hover:border-green-9">J'aime</div>
            <div className="w-1/3 border-b border-neutral-6 py-2 hover:border-green-9">Partages</div>
          </div>
        </Card>
      </div>
      <div className="w-1/3">
        <SuggestedProfils />
      </div>
    </div>
  );
}
export default ProfilPage;
