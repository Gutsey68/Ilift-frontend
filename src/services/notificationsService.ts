import { fetchWithToken } from '../lib/fetchWithToken';

/**
 * Récupère les notifications d'un utilisateur
 * @param id - Identifiant de l'utilisateur
 * @returns Les données des notifications
 */
export const getUserNotifications = async (id: string) => {
  const response = await fetchWithToken(`/api/notifications/users/${id}`);
  return response.data;
};

/**
 * Marque toutes les notifications comme lues
 * @returns Statut de l'opération
 */
export const markAllNotificationsAsRead = async () => {
  const response = await fetchWithToken('/api/notifications/read-all', {
    method: 'PATCH'
  });
  return response.data;
};
