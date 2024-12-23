import { fetchWithToken } from '../lib/fetchWithToken';

export const fetchUserById = async (id: string) => {
  return fetchWithToken(`/api/users/${id}`);
};

export const fetchCurrentUser = async () => {
  return fetchWithToken('/api/users/me');
};

export const fetchSuggestedUsers = async () => {
  return fetchWithToken('/api/users/suggested');
};

export const fetchUsers = async () => {
  return await fetchWithToken('/api/users');
};

export const updateUser = async (
  id: string,
  data: { pseudo?: string; email?: string; bio?: string; isBan?: boolean; passwordHash?: string; profilePhoto?: string; city?: { name: string } }
) => {
  return await fetchWithToken(`/api/users/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
};

export const updateUserPhoto = async (id: string, formData: FormData) => {
  return await fetchWithToken(`/api/users/${id}`, {
    method: 'PUT',
    body: formData
  });
};

export const removeUserPhoto = async (id: string) => {
  return await fetchWithToken(`/api/users/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ profilePhoto: '/uploads/profil.png' })
  });
};
