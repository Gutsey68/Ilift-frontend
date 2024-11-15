import { useQuery } from '@tanstack/react-query';
import { fetchPostsOfUserAndHisFollowingsHandler } from '../services/postService';
import useCurrentUser from './useCurrentUser';

const usePostsOfUsers = () => {
  const { userData } = useCurrentUser();

  const {
    isPending: postsPending,
    error: postError,
    data: posts
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

  const postsData = posts?.data;

  return {
    postsPending,
    postError,
    postsData
  };
};

export default usePostsOfUsers;
