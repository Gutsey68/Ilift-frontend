import { fetchWithToken } from '../lib/fetchWithToken';

export const getSharedPostsOfUser = async (userId: string) => {
  return fetchWithToken(`/api/shares/user/${userId}`, {
    method: 'GET'
  });
};

export const sharePost = async (postId: string) => {
  return fetchWithToken(`/api/shares/post/${postId}`, {
    method: 'POST'
  });
};

export const unsharePost = async (postId: string) => {
  return fetchWithToken(`/api/shares/post/${postId}`, {
    method: 'DELETE'
  });
};
