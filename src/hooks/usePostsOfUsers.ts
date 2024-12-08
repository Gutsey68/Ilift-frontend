import { useSuspenseQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { fetchPostsOfUserAndHisFollowingsHandler } from '../services/postsService';

const usePostsOfUsers = () => {
  const { user } = useContext(AuthContext);

  const {
    isPending: postsPending,
    error: postError,
    data: posts
  } = useSuspenseQuery({
    queryKey: ['posts', user?.id],
    queryFn: () => {
      if (!user) {
        throw new Error('Utilisateur non connecté');
      }
      return fetchPostsOfUserAndHisFollowingsHandler(user.id);
    }
  });

  const postsData = posts?.data;

  return {
    postsPending,
    postError,
    postsData
  };
};

export default usePostsOfUsers;
