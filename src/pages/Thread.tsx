import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import ErrorPage from '../components/error/ErrorPage';
import Header from '../components/layout/Header.tsx';
import MobileBottomNav from '../components/layout/navbar/MobileBottomNav.tsx';
import SideFooter from '../components/layout/SideFooter.tsx';
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
  } = useQuery({
    queryKey: ['results'],
    queryFn: () => {
      return fetchTagsHandler();
    }
  });

  const tags = tagsData?.data;

  if (userError || postError || suggestedError || tagsError) {
    return <ErrorPage />;
  }

  return (
    <main className="flex min-h-screen flex-col justify-between bg-neutral-1 max-lg:px-4">
      <Header />
      <div className="mx-auto flex w-full max-w-6xl gap-6">
        <div className="flex w-1/4 flex-col max-lg:hidden">{userPending ? <ProfileThreadSkeleton /> : <>{user && <ProfileCard />}</>}</div>
        {postsPending ? (
          <PostsThreadSkeleton />
        ) : (
          <div className="mb-10 flex flex-col lg:w-2/4">
            <InputPost />
            {user && <AllPosts posts={postsData} />}
          </div>
        )}
        <div className="w-1/4 max-lg:hidden">
          <div className="sticky top-20 flex flex-col gap-4">
            {suggestedPending ? <ProfileThreadSkeleton /> : <>{suggestedData && <SuggestedProfiles suggestedUsers={suggestedData} />}</>}
            {tagsPending ? <ProfileThreadSkeleton /> : <>{tagsData && <Trends tags={tags} />}</>}
            <SideFooter />
          </div>
        </div>
      </div>
      <MobileBottomNav />
    </main>
  );
}

export default Thread;
