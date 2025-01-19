import { fetchWithToken } from '../lib/fetchWithToken';

/**
 * Récupère tous les commentaires
 * @returns Promise avec la liste des commentaires
 */
export const getComments = async () => {
  return fetchWithToken(`/api/comments`, {
    method: 'POST'
  });
};

/**
 * Récupère les commentaires d'une publication spécifique
 * @param id - Identifiant de la publication
 */
export const getCommentsOfAPost = async (id: string) => {
  return fetchWithToken(`/api/comments/posts/${id}`, {
    method: 'GET'
  });
};

/**
 * Crée un nouveau commentaire sur une publication
 * @param id - Identifiant de la publication
 * @param content - Contenu du commentaire
 */
export const createComment = async (id: string, content: string) => {
  return fetchWithToken(`/api/comments/posts/${id}`, {
    method: 'POST',
    body: JSON.stringify({ content })
  });
};

/**
 * Supprime un commentaire
 * @param id - Identifiant du commentaire
 */
export const deleteComment = async (id: string) => {
  return fetchWithToken(`/api/comments/${id}`, {
    method: 'DELETE'
  });
};

/**
 * Met à jour un commentaire
 * @param id - Identifiant du commentaire
 * @param content - Nouveau contenu du commentaire
 */
export const updateComment = async (id: string, content: string) => {
  return fetchWithToken(`/api/comments/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ content })
  });
};
