import { fetchWithToken } from '../lib/fetchWithToken';

/**
 * Ajoute un like à une publication
 * @param id - Identifiant de la publication
 */
export const like = async (id: string) => {
  return fetchWithToken(`/api/likes/posts/${id}`, {
    method: 'POST'
  });
};

/**
 * Retire le like d'une publication
 * @param id - Identifiant de la publication
 */
export const unLike = async (id: string) => {
  return fetchWithToken(`/api/likes/posts/${id}`, {
    method: 'DELETE'
  });
};

/**
 * Récupère les publications likées par un utilisateur
 * @param id - Identifiant de l'utilisateur
 * @param page - Numéro de la page à récupérer
 */
export const getLikedPostOfAUser = async (id: string, page: number) => {
  return fetchWithToken(`/api/likes/users/${id}?page=${page}`);
};
