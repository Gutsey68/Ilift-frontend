import { SortingState } from '@tanstack/react-table';
import { fetchWithToken } from '../lib/fetchWithToken';

export const fetchPostsOfUserAndHisFollowingsHandler = async (id: string, page: number) => {
  return fetchWithToken(`/api/posts/users/${id}/accueil?page=${page}`);
};

export const fetchPostsByUserHandler = async (id: string, page: number) => {
  return fetchWithToken(`/api/posts/users/${id}?page=${page}`);
};

export const createPostHandler = async (formData: FormData) => {
  return fetchWithToken('/api/posts', {
    method: 'POST',
    body: formData
  });
};

export const updatePost = async (id: string, formData: FormData) => {
  return fetchWithToken(`/api/posts/${id}`, {
    method: 'PUT',
    body: formData
  });
};

export const deletePost = async (id: string) => {
  return fetchWithToken(`/api/posts/${id}`, {
    method: 'DELETE'
  });
};

export const getPosts = async (page: number) => {
  return fetchWithToken(`/api/posts?page=${page}`);
};

export const fetchPosts = async (start: number, size: number, sorting: SortingState) => {
  const page = Math.floor(start / size) + 1;
  console.log('Fetching page:', page);

  let sortParam = '';
  if (sorting.length) {
    const sort = {
      field: sorting[0].id, // Utilise l'ID complet (ex: "author.pseudo")
      order: sorting[0].desc ? 'desc' : 'asc'
    };
    sortParam = `&sort=${encodeURIComponent(JSON.stringify(sort))}`;
  }

  try {
    const response = await fetchWithToken(`/api/posts?page=${page}&size=${size}${sortParam}`);
    if (!response.data) {
      throw new Error('Réponse invalide du serveur');
    }
    return response;
  } catch (error) {
    console.error('Erreur dans fetchPosts:', error);
    throw error;
  }
};
