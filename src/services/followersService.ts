import { fetchWithToken } from '../lib/fetchWithToken';

export const fetchFollowers = async (id: string) => {
  try {
    return fetchWithToken(`/api/users/${id}/followers`);
  } catch {
    throw new Error('Erreur lors de la récupération des données.');
  }
};

export const fetchFollowings = async (id: string) => {
  try {
    return fetchWithToken(`/api/users/${id}/followings`);
  } catch {
    throw new Error('Erreur lors de la récupération des données.');
  }
};

export const follow = async (id: string) => {
  try {
    return fetchWithToken(`/api/follows/${id}`, {
      method: 'POST'
    });
  } catch {
    throw new Error('Erreur lors de la récupération des données.');
  }
};

export const unfollow = async (id: string) => {
  try {
    return fetchWithToken(`/api/follows/${id}`, {
      method: 'DELETE'
    });
  } catch {
    throw new Error('Erreur lors de la récupération des données.');
  }
};

export const deleteFollower = async (id: string) => {
  try {
    return fetchWithToken(`/api/follows/users/${id}`, {
      method: 'DELETE'
    });
  } catch {
    throw new Error('Erreur lors de la récupération des données.');
  }
};
