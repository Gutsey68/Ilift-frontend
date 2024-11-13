import { useQuery } from '@tanstack/react-query';
import ThreadSkeleton from '../components/skeletons/ThreadSkeleton';
import AllPosts from '../components/thread/AllPosts';
import InputPost from '../components/thread/InputPost';
import ProfilCard from '../components/thread/ProfilCard';
import SuggestedProfils from '../components/thread/SuggestedProfils';
import { fetchCurrentUser } from '../services/authService';
import { fetchPostsOfUserAndHisFollowingsHandler } from '../services/postService';

function Thread() {
  const {
    isPending: userPending,
    error: userError,
    data: userData
  } = useQuery({
    queryKey: ['users'],
    queryFn: () => fetchCurrentUser()
  });

  const user = userData?.data;

  const {
    isPending: postsPending,
    error: postError,
    data: postsData
  } = useQuery({
    queryKey: ['posts', user?.id],
    queryFn: () => {
      if (!user) {
        throw new Error('Utilisateur non connecté');
      }
      return fetchPostsOfUserAndHisFollowingsHandler(user.id);
    },
    enabled: !!user
  });

  const posts = postsData?.data;

  if (postsPending) {
    return <ThreadSkeleton />;
  }

  if (postError) {
    return <div>{postError.message}</div>;
  }

  if (userPending) {
    return <ThreadSkeleton />;
  }

  if (userError) {
    return <div>{userError.message}</div>;
  }

  return (
    <div className="mx-auto flex w-full max-w-6xl gap-6">
      <div className="flex w-1/4 flex-col">{user && <ProfilCard usersData={user} />}</div>
      <div className="mb-10 flex w-2/4 flex-col">
        <InputPost usersData={user} />
        {user && <AllPosts posts={posts} />}
      </div>
      <div className="flex w-1/4 flex-col">
        <SuggestedProfils />
      </div>
    </div>
  );
}

export default Thread;
