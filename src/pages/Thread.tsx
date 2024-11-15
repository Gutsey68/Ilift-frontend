import PostsThreadSkeleton from '../components/skeletons/PostsThreadSkeletons';
import ProfileThreadSkeleton from '../components/skeletons/ProfileThreadSkeletons';
import AllPosts from '../components/thread/AllPosts';
import InputPost from '../components/thread/InputPost';
import ProfilCard from '../components/thread/ProfilCard';
import SuggestedProfils from '../components/thread/SuggestedProfils';
import useCurrentUser from '../hooks/useCurrentUser';
import usePostsOfUsers from '../hooks/usePostsOfUsers';

function Thread() {
  const { userPending, userError, userData } = useCurrentUser();
  const { postsPending, postError, postsData } = usePostsOfUsers();

  if (postError) {
    return <div className="text-center text-xl text-red-600">{postError.message}</div>;
  }

  if (userError) {
    return <div className="text-center text-xl text-red-600">{userError.message}</div>;
  }

  return (
    <div className="mx-auto flex w-full max-w-6xl gap-6">
      {userPending ? <ProfileThreadSkeleton /> : <div className="flex w-1/4 flex-col">{userData && <ProfilCard usersData={userData} />}</div>}
      {postsPending ? (
        <PostsThreadSkeleton />
      ) : (
        <div className="mb-10 flex w-2/4 flex-col">
          <InputPost usersData={userData} />
          {userData && <AllPosts posts={postsData} />}
        </div>
      )}
      <div className="flex w-1/4 flex-col">
        <SuggestedProfils />
      </div>
    </div>
  );
}

export default Thread;
