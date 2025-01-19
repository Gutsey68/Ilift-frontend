import { fetchWithToken } from '../lib/fetchWithToken';

/**
 * Récupère les publications partagées par un utilisateur
 * @param id - Identifiant de l'utilisateur
 * @param page - Numéro de la page
 */
export const getSharedPostsOfUser = async (id: string, page: number) => {
  return fetchWithToken(`/api/shares/users/${id}?page=${page}`);
};

/**
 * Partage une publication
 * @param id - Identifiant de la publication à partager
 */
export const sharePost = async (id: string) => {
  return fetchWithToken(`/api/shares/posts/${id}`, {
    method: 'POST'
  });
};

/**
 * Annule le partage d'une publication
 * @param id - Identifiant de la publication
 */
export const unsharePost = async (id: string) => {
  return fetchWithToken(`/api/shares/posts/${id}`, {
    method: 'DELETE'
  });
};
