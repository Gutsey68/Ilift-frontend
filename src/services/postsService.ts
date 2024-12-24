import { fetchWithToken } from '../lib/fetchWithToken';

export const fetchPostsOfUserAndHisFollowingsHandler = async (id: string, page: number) => {
  return fetchWithToken(`/api/posts/users/${id}/accueil?page=${page}`);
};

export const fetchPostsByUserHandler = async (id: string) => {
  return fetchWithToken(`/api/posts/users/${id}`);
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
