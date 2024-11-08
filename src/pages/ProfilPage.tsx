import { useParams } from 'react-router-dom';
import ProfileCard from '../components/profile/ProfileCard';
import SuggestedProfils from '../components/thread/SuggestedProfils';
import Card from '../components/ui/Card';
import { useAuthStore } from '../stores/useAuthStore';

function ProfilPage() {
  const { id } = useParams<{ id: string }>();
  const currentUser = useAuthStore(state => state.currentUser);
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);

  let userDetails;

  if (!id || id === 'me') {
    if (!isAuthenticated) {
      return <div>Erreur : Vous devez être connecté pour voir cette page.</div>;
    }
    userDetails = currentUser;
  } else {
    userDetails = null; // Placeholder, en cas de besoin de récupération d'un autre utilisateur
  }

  if (!userDetails) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="mx-auto flex w-full max-w-6xl gap-6">
      <div className="flex w-2/3 flex-col">
        <Card size="xxs" className="sticky top-20 flex flex-col">
          <ProfileCard userDetails={userDetails} />
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
