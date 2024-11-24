import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import ErrorPage from '../components/error/ErrorPage';
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
import { fetchPostsByUserHandler } from '../services/postsService.ts';
import { fetchTagsHandler } from '../services/tagsService.ts';
import { fetchCurrentUser, fetchUserById } from '../services/usersService';

function ProfilePage() {
  const { id } = useParams();

  const {
    isPending: userPending,
    error: userError,
    data: userData
  } = useQuery({
    queryKey: ['userProfile', id],
    queryFn: () => (id ? fetchUserById(id) : fetchCurrentUser())
  });

  const { suggestedData, suggestedPending, suggestedError } = useSuggestedUsers();

  const user = userData?.data;

  const {
    isPending: tagsPending,
    error: tagsError,
    data: tagsData
  } = useQuery({
    queryKey: ['tags'],
    queryFn: () => {
      return fetchTagsHandler();
    }
  });

  const tags = tagsData?.data;

  const {
    isPending: userPostsPending,
    error: userPostsError,
    data: userPostsData
  } = useQuery({
    queryKey: ['userPosts', id],
    queryFn: () => {
      if (id) {
        return fetchPostsByUserHandler(id);
      }
    }
  });

  const userPosts = userPostsData?.data;

  if (userError || tagsError || suggestedError || userPostsError) {
    return <ErrorPage />;
  }

  return (
    <>
      <div className="mx-auto flex w-full max-w-6xl gap-6">
        <div className="flex w-2/3 flex-col">
          <Card size="xxs" className="sticky top-20 flex flex-col">
            {userPending ? <ProfileCardProfileSkeletons /> : <ProfileCardProfile userDetails={user} />}
            <div className="flex cursor-pointer items-center justify-center text-center text-neutral-11">
              <div className="w-1/3 border-b-2 border-green-9 py-2 hover:text-green-9 ">Publications</div>
              <div className="w-1/3 border-b border-neutral-6 py-2 hover:text-green-9">J'aime</div>
              <div className="w-1/3 border-b border-neutral-6 py-2 hover:text-green-9">Partages</div>
            </div>
            {userPostsPending ? <AllPostsProfileSkeletons /> : <AllPostsProfile posts={userPosts} />}
          </Card>
        </div>
        <div className="flex w-1/3 flex-col gap-4">
          {suggestedPending ? <ProfileThreadSkeleton /> : <>{suggestedData && <SuggestedProfiles suggestedUsers={suggestedData} />}</>}
          {tagsPending ? <ProfileThreadSkeleton /> : <>{tagsData && <Trends tags={tags} />}</>}
        </div>
      </div>
      <Spacing />
    </>
  );
}

export default ProfilePage;
