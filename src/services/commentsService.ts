import { fetchWithToken } from '../lib/fetchWithToken';

export const getComments = async () => {
  return fetchWithToken(`/api/comments`, {
    method: 'POST'
  });
};

export const getCommentsOfAPost = async (id: string) => {
  return fetchWithToken(`/api/comments/posts/${id}`, {
    method: 'GET'
  });
};

export const createComment = async (id: string, content: string) => {
  return fetchWithToken(`/api/comments/posts/${id}`, {
    method: 'POST',
    body: JSON.stringify({ content })
  });
};

export const deleteComment = async (id: string) => {
  return fetchWithToken(`/api/comments/${id}`, {
    method: 'DELETE'
  });
};

export const updateComment = async (id: string, content: string) => {
  return fetchWithToken(`/api/comments/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ content })
  });
};
