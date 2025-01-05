import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import Header from '../components/layout/Header';
import MobileBottomNav from '../components/layout/navbar/MobileBottomNav';
import SideFooter from '../components/layout/SideFooter';
import PostsThreadSkeleton from '../components/skeletons/PostsThreadSkeletons';
import ProfileThreadSkeleton from '../components/skeletons/ProfileThreadSkeletons';
import TagsThreadSkeleton from '../components/skeletons/TagsThreadSkeleton';
import AllPosts from '../components/thread/AllPosts';
import InputPost from '../components/thread/InputPost';
import ProfileCard from '../components/thread/ProfilCard';
import SuggestedProfiles from '../components/thread/SuggestedProfils';
import Trends from '../components/thread/Trends';
import { AuthContext } from '../context/AuthContext';
import usePostsOfUsers from '../hooks/usePostsOfUsers';
import useSuggestedUsers from '../hooks/useSuggestedUsers';
import { fetchTagsHandler } from '../services/tagsService';

function Thread() {
  const { userPending, user } = useContext(AuthContext);
  const { status, postsData, fetchNextPage, hasNextPage, isFetchingNextPage } = usePostsOfUsers();
  const { suggestedPending, suggestedData } = useSuggestedUsers();

  const { isPending: tagsPending, data: tagsData } = useQuery({
    queryKey: ['tags'],
    queryFn: () => {
      return fetchTagsHandler();
    }
  });

  const tags = tagsData?.data;

  return (
    <main className="flex min-h-screen flex-col justify-between bg-neutral-1 max-lg:px-4">
      <Header />
      <div className="mx-auto mb-auto flex w-full max-w-6xl gap-6">
        <div className="flex w-1/4 flex-col max-lg:hidden">{userPending ? <ProfileThreadSkeleton /> : <>{user && <ProfileCard />}</>}</div>
        {status === 'pending' ? (
          <PostsThreadSkeleton />
        ) : (
          <div className="mb-10 flex flex-col lg:w-2/4">
            <InputPost />
            <div className="mt-4 lg:hidden">
              {suggestedPending ? <ProfileThreadSkeleton /> : <>{suggestedData && <SuggestedProfiles suggestedUsers={suggestedData} />}</>}
            </div>
            {user && <AllPosts posts={postsData} fetchNextPage={fetchNextPage} hasNextPage={hasNextPage} isFetchingNextPage={isFetchingNextPage} />}
          </div>
        )}
        <div className="w-1/4 max-lg:hidden">
          <div className="sticky top-20 flex flex-col gap-4">
            {suggestedPending ? <ProfileThreadSkeleton /> : <>{suggestedData && <SuggestedProfiles suggestedUsers={suggestedData} />}</>}
            {tagsPending ? <TagsThreadSkeleton /> : <>{tagsData && <Trends tags={tags} />}</>}
            <SideFooter />
          </div>
        </div>
      </div>
      <MobileBottomNav />
    </main>
  );
}

export default Thread;
