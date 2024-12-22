import { fetchWithToken } from '../lib/fetchWithToken';

export const getComments = async () => {
  try {
    return fetchWithToken(`/api/comments`, {
      method: 'POST'
    });
  } catch {
    throw new Error('Erreur lors de la récupération des commentaires.');
  }
};

export const getCommentsOfAPost = async (id: string) => {
  try {
    return fetchWithToken(`/api/comments/posts/${id}`, {
      method: 'GET'
    });
  } catch {
    throw new Error('Erreur lors de la récupération des commentaires.');
  }
};

export const createComment = async (id: string, content: string) => {
  try {
    return fetchWithToken(`/api/comments/posts/${id}`, {
      method: 'POST',
      body: JSON.stringify({ content })
    });
  } catch {
    throw new Error('Erreur lors de la création du commentaire.');
  }
};

export const deleteComment = async (id: string) => {
  try {
    return fetchWithToken(`/api/comments/${id}`, {
      method: 'DELETE'
    });
  } catch {
    throw new Error('Erreur lors de la suppression du commentaire.');
  }
};

export const updateComment = async (id: string, content: string) => {
  try {
    return fetchWithToken(`/api/comments/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ content })
    });
  } catch {
    throw new Error('Erreur lors de la modification du commentaire.');
  }
};
