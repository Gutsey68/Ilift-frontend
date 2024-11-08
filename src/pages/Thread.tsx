import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ThreadSkeleton from '../components/skeletons/ThreadSkeleton';
import AllPosts from '../components/thread/AllPosts';
import InputPost from '../components/thread/InputPost';
import ProfilCard from '../components/thread/ProfilCard';
import SuggestedProfils from '../components/thread/SuggestedProfils';
import { fetchCurrentUser } from '../services/authService';
import { useAuthStore } from '../stores/useAuthStore';

function Thread() {
  const navigate = useNavigate();
  const currentUser = useAuthStore(state => state.currentUser);
  const setCurrentUser = useAuthStore(state => state.setCurrentUser);
  const isLoading = useAuthStore(state => state.isLoading);
  const setLoading = useAuthStore(state => state.setLoading);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const user = await fetchCurrentUser();
        setCurrentUser(user);
      } catch (error) {
        console.error('Erreur lors de la récupération des informations utilisateur:', error);
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    if (!currentUser) {
      fetchUser();
    }
  }, [currentUser, navigate, setCurrentUser, setLoading]);

  if (isLoading) {
    return <ThreadSkeleton />;
  }

  return (
    <div className="mx-auto flex w-full max-w-6xl gap-6">
      <div className="flex w-1/4 flex-col">{currentUser && <ProfilCard usersData={currentUser} />}</div>
      <div className="mb-10 flex w-2/4 flex-col">
        <InputPost />
        <AllPosts />
      </div>
      <div className="flex w-1/4 flex-col">
        <SuggestedProfils />
      </div>
    </div>
  );
}

export default Thread;
