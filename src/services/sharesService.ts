import { fetchWithToken } from '../lib/fetchWithToken';

export const getSharedPostsOfUser = async (id: string, page: number) => {
  return fetchWithToken(`/api/shares/users/${id}?page=${page}`);
};

export const sharePost = async (id: string) => {
  return fetchWithToken(`/api/shares/posts/${id}`, {
    method: 'POST'
  });
};

export const unsharePost = async (id: string) => {
  return fetchWithToken(`/api/shares/posts/${id}`, {
    method: 'DELETE'
  });
};
