import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ThreadSkeleton from '../components/skeletons/ThreadSkeleton';
import AllPosts from '../components/thread/AllPosts';
import InputPost from '../components/thread/InputPost';
import ProfilCard from '../components/thread/ProfilCard';
import SuggestedProfils from '../components/thread/SuggestedProfils';
import { fetchCurrentUser } from '../services/authService';
import { fetchPostsOfUserAndHisFollowingsHandler } from '../services/postService';
import { useAuthStore } from '../stores/useAuthStore';
import { Post } from '../types/postsType';

function Thread() {
  const navigate = useNavigate();
  const currentUser = useAuthStore(state => state.currentUser);
  const setCurrentUser = useAuthStore(state => state.setCurrentUser);
  const isLoading = useAuthStore(state => state.isLoading);
  const setLoading = useAuthStore(state => state.setLoading);

  const [posts, setPosts] = useState<Post[]>([]);
  const [postsLoading, setPostsLoading] = useState<boolean>(true);
  const [postsError, setPostsError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const data = await fetchCurrentUser();
        const user = data.data;
        setCurrentUser(user);

        const fetchedPosts = await fetchPostsOfUserAndHisFollowingsHandler(user.id);
        const postsArray = fetchedPosts.data || [];
        setPosts(postsArray);
      } catch (error) {
        console.error('Erreur lors de la récupération des informations utilisateur:', error);
        setPostsError('Erreur lors du chargement des posts');
        navigate('/login');
      } finally {
        setLoading(false);
        setPostsLoading(false);
      }
    };

    if (!currentUser) {
      fetchUser();
    }
  }, [currentUser, navigate, setCurrentUser, setLoading]);

  if (isLoading || postsLoading) {
    return <ThreadSkeleton />;
  }

  if (postsError) {
    return <div>{postsError}</div>;
  }

  return (
    <div className="mx-auto flex w-full max-w-6xl gap-6">
      <div className="flex w-1/4 flex-col">{currentUser && <ProfilCard usersData={currentUser} />}</div>
      <div className="mb-10 flex w-2/4 flex-col">
        <InputPost />
        {currentUser && <AllPosts posts={posts} />}
      </div>
      <div className="flex w-1/4 flex-col">
        <SuggestedProfils />
      </div>
    </div>
  );
}

export default Thread;
