import { SortingState } from '@tanstack/react-table';
import { fetchWithToken } from '../lib/fetchWithToken';

/**
 * Récupère un utilisateur par son ID
 * @param id - Identifiant de l'utilisateur
 */
export const fetchUserById = async (id: string) => {
  return fetchWithToken(`/api/users/${id}`);
};

/**
 * Récupère les informations de l'utilisateur connecté
 * @returns Les données de l'utilisateur courant
 */
export const fetchCurrentUser = async () => {
  return fetchWithToken('/api/users/me');
};

/**
 * Récupère une liste d'utilisateurs suggérés
 * @returns Liste des utilisateurs suggérés
 */
export const fetchSuggestedUsers = async () => {
  return fetchWithToken('/api/users/suggested');
};

/**
 * Récupère tous les utilisateurs
 * @returns Liste complète des utilisateurs
 */
export const fetchUsers = async () => {
  return await fetchWithToken('/api/users');
};

/**
 * Met à jour les informations d'un utilisateur
 * @param id - Identifiant de l'utilisateur
 * @param data - Données à mettre à jour (statut de ban, ville, biographie)
 */
export const updateUser = async (id: string, data: { isBan?: boolean; city?: string; bio?: string }) => {
  return await fetchWithToken(`/api/users/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
};

/**
 * Met à jour la photo de profil d'un utilisateur
 * @param id - Identifiant de l'utilisateur
 * @param formData - Données du formulaire contenant la nouvelle photo
 */
export const updateUserPhoto = async (id: string, formData: FormData) => {
  return await fetchWithToken(`/api/users/${id}`, {
    method: 'PUT',
    body: formData
  });
};

/**
 * Supprime la photo de profil d'un utilisateur
 * @param id - Identifiant de l'utilisateur
 * @returns Réponse avec la photo de profil par défaut
 */
export const removeUserPhoto = async (id: string) => {
  return await fetchWithToken(`/api/users/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ profilePhoto: '/uploads/profil.png' })
  });
};

/**
 * Récupère les utilisateurs pour l'administration avec pagination et tri
 * @param start - Index de début
 * @param size - Nombre d'éléments par page
 * @param sorting - Configuration du tri
 */
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
