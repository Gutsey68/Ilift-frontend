import { fetchWithToken } from '../lib/fetchWithToken';

export const fetchFollowers = async (id: string) => {
  return fetchWithToken(`/api/users/${id}/followers`);
};

export const fetchFollowings = async (id: string) => {
  return fetchWithToken(`/api/users/${id}/followings`);
};

export const follow = async (id: string) => {
  return fetchWithToken(`/api/follows/${id}`, {
    method: 'POST'
  });
};

export const unfollow = async (id: string) => {
  return fetchWithToken(`/api/follows/${id}`, {
    method: 'DELETE'
  });
};

export const deleteFollower = async (id: string) => {
  return fetchWithToken(`/api/follows/users/${id}`, {
    method: 'DELETE'
  });
};
