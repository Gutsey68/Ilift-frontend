import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/layout/Header.tsx';
import MobileBottomNav from '../components/layout/navbar/MobileBottomNav.tsx';
import SideFooter from '../components/layout/SideFooter.tsx';
import AllPostsProfile from '../components/profile/AllPostsProfile.tsx';
import ProfileCardProfile from '../components/profile/ProfileCardProfile.tsx';
import AllPostsProfileSkeletons from '../components/skeletons/AllPostsProfileSkeletons.tsx';
import ProfileCardProfileSkeletons from '../components/skeletons/ProfileCardProfileSkeletons.tsx';
import ProfileThreadSkeleton from '../components/skeletons/ProfileThreadSkeletons.tsx';
import SuggestedProfiles from '../components/thread/SuggestedProfils.tsx';
import Trends from '../components/thread/Trends';
import Card from '../components/ui/Card';
import { Spacing } from '../components/ui/Spacing.tsx';
import useSuggestedUsers from '../hooks/useSuggestedUsers';
import { getLikedPostOfAUser } from '../services/likesService';
import { fetchPostsByUserHandler } from '../services/postsService.ts';
import { getSharedPostsOfUser } from '../services/sharesService';
import { fetchTagsHandler } from '../services/tagsService.ts';
import { fetchCurrentUser, fetchUserById } from '../services/usersService';

function ProfilePage() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState<'posts' | 'likes' | 'shares'>('posts');

  const { isPending: userPending, data: userData } = useQuery({
    queryKey: ['userProfile', id],
    queryFn: () => (id ? fetchUserById(id) : fetchCurrentUser())
  });

  const { suggestedData, suggestedPending } = useSuggestedUsers();

  const user = userData?.data;

  const { isPending: tagsPending, data: tagsData } = useQuery({
    queryKey: ['tags'],
    queryFn: () => {
      return fetchTagsHandler();
    }
  });

  const tags = tagsData?.data;

  const {
    data: userPostsData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status: userPostsStatus
  } = useInfiniteQuery({
    queryKey: ['userPosts', id],
    queryFn: ({ pageParam = 1 }) => {
      if (id) {
        return fetchPostsByUserHandler(id, pageParam);
      }
    },
    getNextPageParam: lastPage => {
      if (lastPage?.data.length === 10) {
        return lastPage.pageParam + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
    enabled: activeTab === 'posts'
  });

  const userPosts = userPostsData?.pages.flatMap(page => page.data) || [];

  const {
    data: likedPostsData,
    fetchNextPage: fetchNextLikePage,
    hasNextPage: hasNextLikePage,
    isFetchingNextPage: isFetchingNextLikePage,
    status: likedPostsStatus
  } = useInfiniteQuery({
    queryKey: ['likedPosts', id],
    queryFn: ({ pageParam = 1 }) => {
      if (id) {
        return getLikedPostOfAUser(id, pageParam);
      }
    },
    getNextPageParam: lastPage => {
      if (lastPage?.data.length === 10) {
        return lastPage.pageParam + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
    enabled: activeTab === 'likes'
  });

  const {
    data: sharedPostsData,
    fetchNextPage: fetchNextSharedPage,
    hasNextPage: hasNextSharedPage,
    isFetchingNextPage: isFetchingNextSharedPage,
    status: sharedPostsStatus
  } = useInfiniteQuery({
    queryKey: ['sharedPosts', id],
    queryFn: ({ pageParam = 1 }) => {
      if (id) {
        return getSharedPostsOfUser(id, pageParam);
      }
    },
    getNextPageParam: lastPage => {
      if (lastPage?.data.length === 10) {
        return lastPage.pageParam + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
    enabled: activeTab === 'shares'
  });

  return (
    <main className="flex min-h-screen flex-col justify-between bg-neutral-1 max-lg:px-4">
      <Header />
      <div className="mx-auto flex w-full max-w-6xl gap-6 max-sm:flex-col">
        <div className=" flex min-h-96 flex-col lg:w-2/3">
          <Card size="xxs" className="flex flex-col">
            {userPending ? <ProfileCardProfileSkeletons /> : <ProfileCardProfile userDetails={user} />}
            <div className="flex cursor-pointer items-center justify-center text-center text-neutral-11">
              <div
                onClick={() => setActiveTab('posts')}
                className={`w-1/3 py-2 hover:text-green-9 ${activeTab === 'posts' ? 'border-b-2 border-green-9 text-green-9' : 'border-b border-neutral-6'}`}
              >
                Publications
              </div>
              <div
                onClick={() => setActiveTab('likes')}
                className={`w-1/3 py-2 hover:text-green-9 ${activeTab === 'likes' ? 'border-b-2 border-green-9 text-green-9' : 'border-b border-neutral-6'}`}
              >
                J'aime
              </div>
              <div
                onClick={() => setActiveTab('shares')}
                className={`w-1/3 py-2 hover:text-green-9 ${activeTab === 'shares' ? 'border-b-2 border-green-9 text-green-9' : 'border-b border-neutral-6'}`}
              >
                Republications
              </div>
            </div>
            {activeTab === 'likes' ? (
              likedPostsStatus === 'pending' ? (
                <AllPostsProfileSkeletons />
              ) : (
                <AllPostsProfile
                  posts={likedPostsData?.pages.flatMap(page => page.data) || []}
                  fetchNextPage={fetchNextLikePage}
                  hasNextPage={hasNextLikePage}
                  isFetchingNextPage={isFetchingNextLikePage}
                />
              )
            ) : activeTab === 'shares' ? (
              sharedPostsStatus === 'pending' ? (
                <AllPostsProfileSkeletons />
              ) : (
                <AllPostsProfile
                  posts={sharedPostsData?.pages.flatMap(page => page.data) || []}
                  fetchNextPage={fetchNextSharedPage}
                  hasNextPage={hasNextSharedPage}
                  isFetchingNextPage={isFetchingNextSharedPage}
                />
              )
            ) : userPostsStatus === 'pending' ? (
              <AllPostsProfileSkeletons />
            ) : (
              <AllPostsProfile posts={userPosts} fetchNextPage={fetchNextPage} hasNextPage={hasNextPage} isFetchingNextPage={isFetchingNextPage} />
            )}
          </Card>
        </div>
        <div className="w-1/3 max-lg:hidden">
          <div className="sticky top-20 flex flex-col gap-4">
            {suggestedPending ? <ProfileThreadSkeleton /> : <>{suggestedData && <SuggestedProfiles suggestedUsers={suggestedData} />}</>}
            {tagsPending ? <ProfileThreadSkeleton /> : <>{tagsData && <Trends tags={tags} />}</>}
            <SideFooter />
          </div>
        </div>
      </div>
      <Spacing size="lg" />
      <MobileBottomNav />
    </main>
  );
}

export default ProfilePage;
