import { fetchWithToken } from '../lib/fetchWithToken';

export const getUserNotifications = async (id: string) => {
  const response = await fetchWithToken(`/api/notifications/users/${id}`);
  return response.data;
};

export const markAllNotificationsAsRead = async () => {
  const response = await fetchWithToken('/api/notifications/read-all', {
    method: 'PATCH'
  });
  return response.data;
};
