import { fetchWithToken } from '../lib/fetchWithToken';

export const fetchUserById = async (id: string) => {
  return fetchWithToken(`/api/users/${id}`);
};

export const fetchCurrentUser = async () => {
  return fetchWithToken('/api/users/me');
};

export const fetchSuggestedUsers = async () => {
  return fetchWithToken('/api/users/suggested');
};
