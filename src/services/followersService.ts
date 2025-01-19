import { fetchWithToken } from '../lib/fetchWithToken';

/**
 * Récupère les followers d'un utilisateur
 * @param id - Identifiant de l'utilisateur
 */
export const fetchFollowers = async (id: string) => {
  return fetchWithToken(`/api/users/${id}/followers`);
};

/**
 * Récupère les utilisateurs suivis par un utilisateur
 * @param id - Identifiant de l'utilisateur
 */
export const fetchFollowings = async (id: string) => {
  return fetchWithToken(`/api/users/${id}/followings`);
};

/**
 * Suit un utilisateur
 * @param id - Identifiant de l'utilisateur à suivre
 */
export const follow = async (id: string) => {
  return fetchWithToken(`/api/follows/${id}`, {
    method: 'POST'
  });
};

/**
 * Arrête de suivre un utilisateur
 * @param id - Identifiant de l'utilisateur à ne plus suivre
 */
export const unfollow = async (id: string) => {
  return fetchWithToken(`/api/follows/${id}`, {
    method: 'DELETE'
  });
};

/**
 * Supprime un follower
 * @param id - Identifiant du follower à supprimer
 */
export const deleteFollower = async (id: string) => {
  return fetchWithToken(`/api/follows/users/${id}`, {
    method: 'DELETE'
  });
};
