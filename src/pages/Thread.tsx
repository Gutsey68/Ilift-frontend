import { useContext } from 'react';
import ErrorPage from '../components/error/ErrorPage';
import PostsThreadSkeleton from '../components/skeletons/PostsThreadSkeletons';
import ProfileThreadSkeleton from '../components/skeletons/ProfileThreadSkeletons';
import AllPosts from '../components/thread/AllPosts';
import InputPost from '../components/thread/InputPost';
import ProfilCard from '../components/thread/ProfilCard';
import SuggestedProfils from '../components/thread/SuggestedProfils';
import { AuthContext } from '../context/AuthContext';
import usePostsOfUsers from '../hooks/usePostsOfUsers';
import useSuggestedUsers from '../hooks/useSuggestedUsers';

function Thread() {
  const { userPending, userError, user } = useContext(AuthContext);
  const { postsPending, postError, postsData } = usePostsOfUsers();
  const { suggestedPending, suggestedError, suggestedData } = useSuggestedUsers();

  if (userError || postError || suggestedError) {
    return <ErrorPage />;
  }

  return (
    <div className="mx-auto flex w-full max-w-6xl gap-6">
      {userPending ? <ProfileThreadSkeleton /> : <div className="flex w-1/4 flex-col max-md:hidden">{user && <ProfilCard />}</div>}
      {postsPending ? (
        <PostsThreadSkeleton />
      ) : (
        <div className="mb-10 flex flex-col md:w-2/4">
          <InputPost />
          {user && <AllPosts posts={postsData} />}
        </div>
      )}
      {suggestedPending ? (
        <ProfileThreadSkeleton />
      ) : (
        <div className="flex w-1/4 flex-col max-md:hidden">{suggestedData && <SuggestedProfils suggestedUsers={suggestedData} />}</div>
      )}
    </div>
  );
}

export default Thread;
