import { SortingState } from '@tanstack/react-table';
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

export const updateUser = async (id: string, data: { isBan?: boolean }) => {
  const response = await fetchWithToken(`/api/users/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  if (!response) {
    throw new Error("Erreur lors de la mise à jour de l'utilisateur");
  }

  return response;
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

export const fetchUsersAdmin = async (start: number, size: number, sorting: SortingState) => {
  const page = Math.floor(start / size) + 1;

  let sortParam = '';

  if (sorting.length) {
    const sort = {
      field: sorting[0].id,
      order: sorting[0].desc ? 'desc' : 'asc'
    };
    sortParam = `&sort=${encodeURIComponent(JSON.stringify(sort))}`;
  }

  return await fetchWithToken(`/api/users/admin?page=${page}&size=${size}${sortParam}`);
};
