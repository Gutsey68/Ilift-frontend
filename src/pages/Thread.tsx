import { useContext } from 'react';
import ErrorPage from '../components/error/ErrorPage';
import PostsThreadSkeleton from '../components/skeletons/PostsThreadSkeletons';
import ProfileThreadSkeleton from '../components/skeletons/ProfileThreadSkeletons';
import AllPosts from '../components/thread/AllPosts';
import InputPost from '../components/thread/InputPost';
import ProfilCard from '../components/thread/ProfilCard';
import SuggestedProfils from '../components/thread/SuggestedProfils';
import Trends from '../components/thread/Trends';
import { AuthContext } from '../context/AuthContext';
import usePostsOfUsers from '../hooks/usePostsOfUsers';
import useSuggestedUsers from '../hooks/useSuggestedUsers';
import {useQuery} from "@tanstack/react-query";
import {fetchTagsHandler} from "../services/tagsService.ts";

function Thread() {
  const { userPending, userError, user } = useContext(AuthContext);
  const { postsPending, postError, postsData } = usePostsOfUsers();
  const { suggestedPending, suggestedError, suggestedData } = useSuggestedUsers();

    const {
        isPending: tagsPending,
        error: tagsError,
        data : tagsData
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
    <div className="mx-auto flex w-full max-w-6xl gap-6">
      <div className="flex w-1/4 flex-col max-md:hidden">{userPending ? <ProfileThreadSkeleton /> : <>{user && <ProfilCard />}</>}</div>
      {postsPending ? (
        <PostsThreadSkeleton />
      ) : (
        <div className="mb-10 flex flex-col md:w-2/4">
          <InputPost />
          {user && <AllPosts posts={postsData} />}
        </div>
      )}
      <div className="flex w-1/4 flex-col gap-4 max-md:hidden">
        {suggestedPending ? <ProfileThreadSkeleton /> : <>{suggestedData && <SuggestedProfils suggestedUsers={suggestedData} />}</>}
        {tagsPending ? <ProfileThreadSkeleton /> : <>{tagsData && <Trends tags={tags} />}</>}
      </div>
    </div>
  );
}

export default Thread;
