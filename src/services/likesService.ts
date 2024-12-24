import { fetchWithToken } from '../lib/fetchWithToken';

export const like = async (id: string) => {
  return fetchWithToken(`/api/likes/posts/${id}`, {
    method: 'POST'
  });
};

export const unLike = async (id: string) => {
  return fetchWithToken(`/api/likes/posts/${id}`, {
    method: 'DELETE'
  });
};

export const getLikedPostOfAUser = async (id: string, page: number) => {
  return fetchWithToken(`/api/likes/users/${id}?page=${page}`);
};
