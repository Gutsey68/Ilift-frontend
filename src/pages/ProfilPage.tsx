import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import ProfileCard from '../components/profile/ProfileCard';
import SuggestedProfils from '../components/thread/SuggestedProfils';
import Card from '../components/ui/Card';
import { fetchCurrentUser, fetchUserById } from '../services/userService';

function ProfilPage() {
  const { id } = useParams();

  const {
    isPending: userLoading,
    error: userError,
    data: userData
  } = useQuery({
    queryKey: ['userProfile', id],
    queryFn: () => (id ? fetchUserById(id) : fetchCurrentUser())
  });

  const user = userData?.data;

  if (userLoading) {
    return <p>Chargement...</p>;
  }

  if (userError) {
    return <div>Erreur.</div>;
  }

  return (
    <div className="mx-auto flex w-full max-w-6xl gap-6">
      <div className="flex w-2/3 flex-col">
        <Card size="xxs" className="sticky top-20 flex flex-col">
          <ProfileCard userDetails={user} />
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
