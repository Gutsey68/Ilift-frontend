import { useQuery } from '@tanstack/react-query';
import ThreadSkeleton from '../components/skeletons/ThreadSkeleton';
import AllPosts from '../components/thread/AllPosts';
import InputPost from '../components/thread/InputPost';
import ProfilCard from '../components/thread/ProfilCard';
import SuggestedProfils from '../components/thread/SuggestedProfils';
import useUser from '../hooks/useUser';
import { fetchPostsOfUserAndHisFollowingsHandler } from '../services/postService';

function Thread() {
  const { userPending, userError, userData } = useUser();

  const {
    isPending: postsPending,
    error: postError,
    data: postsData
  } = useQuery({
    queryKey: ['posts', userData?.id],
    queryFn: () => {
      if (!userData) {
        throw new Error('Utilisateur non connecté');
      }
      return fetchPostsOfUserAndHisFollowingsHandler(userData.id);
    },
    enabled: !!userData
  });

  const posts = postsData?.data;

  if (postsPending) {
    return <ThreadSkeleton />;
  }

  if (postError) {
    return <div className="text-center text-xl text-red-600">{postError.message}</div>;
  }

  if (userPending) {
    return <ThreadSkeleton />;
  }

  if (userError) {
    return <div className="text-center text-xl text-red-600">{userError.message}</div>;
  }

  return (
    <div className="mx-auto flex w-full max-w-6xl gap-6">
      <div className="flex w-1/4 flex-col">{userData && <ProfilCard usersData={userData} />}</div>
      <div className="mb-10 flex w-2/4 flex-col">
        <InputPost usersData={userData} />
        {userData && <AllPosts posts={posts} />}
      </div>
      <div className="flex w-1/4 flex-col">
        <SuggestedProfils />
      </div>
    </div>
  );
}

export default Thread;
