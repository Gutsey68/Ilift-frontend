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
  const response = await fetchWithToken('/api/users');
  return response.data;
};

export const updateUser = async (
  id: string,
  data: { pseudo?: string; email?: string; bio?: string; isBan?: boolean; passwordHash?: string; profilePhoto?: string; city?: { name: string } }
) => {
  const response = await fetchWithToken(`/api/users/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  return response.data;
};

export const updateUserPhoto = async (id: string, photo: File) => {
  const formData = new FormData();
  formData.append('photo', photo);

  const response = await fetchWithToken(`/api/users/${id}`, {
    method: 'PUT',
    body: formData
  });
  return response.data;
};

export const removeUserPhoto = async (id: string) => {
  const response = await fetchWithToken(`/api/users/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ profilePhoto: '/uploads/profil.png' })
  });
  return response.data;
};
