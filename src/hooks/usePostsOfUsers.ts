import { useInfiniteQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { fetchPostsOfUserAndHisFollowingsHandler } from '../services/postsService';
import { PostType } from '../types/postsType';

const usePostsOfUsers = () => {
  const { user } = useContext(AuthContext);

  const {
    data,
    error: postError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status
  } = useInfiniteQuery({
    queryKey: ['posts', user?.id],
    queryFn: ({ pageParam = 1 }) => {
      if (!user?.id) {
        throw new Error("L'id de l'utilisateur est indéfini");
      }
      return fetchPostsOfUserAndHisFollowingsHandler(user.id, pageParam);
    },
    getNextPageParam: (lastPage: { data: PostType[] }, pages) => {
      if (lastPage.data.length === 10) {
        return pages.length + 1;
      } else {
        return undefined;
      }
    },
    initialPageParam: 1,
    enabled: !!user
  });

  const postsData = data?.pages.flatMap(page => page.data) || [];

  return {
    postsData,
    postError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status
  };
};

export default usePostsOfUsers;
