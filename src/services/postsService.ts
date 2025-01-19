import { SortingState } from '@tanstack/react-table';
import { fetchWithToken } from '../lib/fetchWithToken';

/**
 * Récupère les publications d'un utilisateur et de ses suivis
 * @param id - Identifiant de l'utilisateur
 * @param page - Numéro de la page
 */
export const fetchPostsOfUserAndHisFollowingsHandler = async (id: string, page: number) => {
  return fetchWithToken(`/api/posts/users/${id}/accueil?page=${page}`);
};

/**
 * Récupère les publications d'un utilisateur spécifique
 * @param id - Identifiant de l'utilisateur
 * @param page - Numéro de la page
 */
export const fetchPostsByUserHandler = async (id: string, page: number) => {
  return fetchWithToken(`/api/posts/users/${id}?page=${page}`);
};

/**
 * Crée une nouvelle publication
 * @param formData - Données du formulaire contenant les informations de la publication
 */
export const createPostHandler = async (formData: FormData) => {
  return fetchWithToken('/api/posts', {
    method: 'POST',
    body: formData
  });
};

/**
 * Met à jour une publication existante
 * @param id - Identifiant de la publication
 * @param data - Données de mise à jour (validation ou FormData)
 */
export const updatePost = async (id: string, data: { isValid?: boolean } | FormData) => {
  const headers: HeadersInit = {};
  if (!(data instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }

  return await fetchWithToken(`/api/posts/${id}`, {
    method: 'PUT',
    headers,
    body: data instanceof FormData ? data : JSON.stringify(data)
  });
};

/**
 * Supprime une publication
 * @param id - Identifiant de la publication à supprimer
 */
export const deletePost = async (id: string) => {
  return fetchWithToken(`/api/posts/${id}`, {
    method: 'DELETE'
  });
};

/**
 * Récupère les publications paginées
 * @param page - Numéro de la page
 */
export const getPosts = async (page: number) => {
  return fetchWithToken(`/api/posts?page=${page}`);
};

/**
 * Récupère les publications avec pagination et tri
 * @param start - Index de début
 * @param size - Nombre d'éléments par page
 * @param sorting - État du tri
 */
export const fetchPosts = async (start: number, size: number, sorting: SortingState) => {
  const page = Math.floor(start / size) + 1;

  let sortParam = '';

  if (sorting.length) {
    const sort = {
      field: sorting[0].id,
      order: sorting[0].desc ? 'desc' : 'asc'
    };
    sortParam = `&sort=${encodeURIComponent(JSON.stringify(sort))}`;
  }

  return await fetchWithToken(`/api/posts?page=${page}&size=${size}${sortParam}`);
};
