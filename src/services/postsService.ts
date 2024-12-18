import { fetchWithToken } from '../lib/fetchWithToken';

export const fetchPostsOfUserAndHisFollowingsHandler = async (id: string, page: number) => {
  return fetchWithToken(`/api/posts/users/${id}/accueil?page=${page}`);
};

export const fetchPostsByUserHandler = async (id: string) => {
  return fetchWithToken(`/api/posts/users/${id}`);
};
