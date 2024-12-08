import { fetchWithToken } from '../lib/fetchWithToken';

export const fetchPostsOfUserAndHisFollowingsHandler = async (id: string) => {
  return fetchWithToken(`/api/posts/users/${id}/accueil`);
};

export const fetchPostsByUserHandler = async (id: string) => {
  return fetchWithToken(`/api/posts/users/${id}`);
};
