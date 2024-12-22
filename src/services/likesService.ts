import { fetchWithToken } from '../lib/fetchWithToken';

export const like = async (id: string) => {
  try {
    return fetchWithToken(`/api/likes/posts/${id}`, {
      method: 'POST'
    });
  } catch {
    throw new Error("Erreur lors de l'ajout du j'aime.");
  }
};

export const unLike = async (id: string) => {
  try {
    return fetchWithToken(`/api/likes/posts/${id}`, {
      method: 'DELETE'
    });
  } catch {
    throw new Error("Erreur lors de la suppréssion du j'aime.");
  }
};
