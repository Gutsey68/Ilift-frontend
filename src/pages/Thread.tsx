import { useSuspenseQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import ErrorPage from '../components/error/ErrorPage';
import PostsThreadSkeleton from '../components/skeletons/PostsThreadSkeletons';
import ProfileThreadSkeleton from '../components/skeletons/ProfileThreadSkeletons';
import AllPosts from '../components/thread/AllPosts';
import InputPost from '../components/thread/InputPost';
import ProfileCard from '../components/thread/ProfilCard';
import SuggestedProfiles from '../components/thread/SuggestedProfils';
import Trends from '../components/thread/Trends';
import { AuthContext } from '../context/AuthContext';
import usePostsOfUsers from '../hooks/usePostsOfUsers';
import useSuggestedUsers from '../hooks/useSuggestedUsers';
import { fetchTagsHandler } from '../services/tagsService.ts';

function Thread() {
  const { userPending, userError, user } = useContext(AuthContext);
  const { postsPending, postError, postsData } = usePostsOfUsers();
  const { suggestedPending, suggestedError, suggestedData } = useSuggestedUsers();

  const {
    isPending: tagsPending,
    error: tagsError,
    data: tagsData
  } = useSuspenseQuery({
    queryKey: ['results'],
    queryFn: () => {
      return fetchTagsHandler();
    }
  });

  const tags = tagsData.data;

  if (userError || postError || suggestedError || tagsError) {
    return <ErrorPage />;
  }

  return (
    <div className="mx-auto flex w-full max-w-6xl gap-6">
      <div className="flex w-1/4 flex-col max-md:hidden">{userPending ? <ProfileThreadSkeleton /> : <>{user && <ProfileCard />}</>}</div>
      {postsPending ? (
        <PostsThreadSkeleton />
      ) : (
        <div className="mb-10 flex flex-col md:w-2/4">
          <InputPost />
          {user && <AllPosts posts={postsData} />}
        </div>
      )}
      <div className="top-20 w-1/4 max-md:hidden sm:sticky">
        <div className="fixed flex w-[19.44%] flex-col gap-4">
          {suggestedPending ? <ProfileThreadSkeleton /> : <>{suggestedData && <SuggestedProfiles suggestedUsers={suggestedData} />}</>}
          {tagsPending ? <ProfileThreadSkeleton /> : <>{tagsData && <Trends tags={tags} />}</>}
        </div>
      </div>
    </div>
  );
}

export default Thread;
