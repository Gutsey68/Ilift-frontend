import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProfileCard from '../components/profile/ProfileCard';
import SuggestedProfils from '../components/thread/SuggestedProfils';
import Card from '../components/ui/Card';
import { fetchCurrentUser } from '../services/authService';
import { UserDetails } from '../types/userDetail';

function ProfilPage() {
  const { id } = useParams<{ id: string }>();
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserDetails = async () => {
      setLoading(true);
      try {
        const fetchedUser = await fetchCurrentUser();
        setUserDetails(fetchedUser);
      } catch (error) {
        console.error('Erreur lors de la récupération des informations utilisateur:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [id]);

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (!userDetails) {
    return <div>Erreur</div>;
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
