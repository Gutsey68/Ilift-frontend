import { refresh } from '../services/refreshService';

export const fetchWithToken = async (url: string, options: RequestInit = {}) => {
  const token = localStorage.getItem('token');

  if (!token) {
    throw new Error('Token manquant. Veuillez vous reconnecter.');
  }

  let response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  });

  if (response.status === 401) {
    try {
      const responseRefresh = await refresh();

      console.log('responseRefresh', responseRefresh);

      const newToken = responseRefresh.data.token;
      const newRefreshToken = responseRefresh.data.refreshToken;

      localStorage.setItem('token', newToken);
      localStorage.setItem('refreshToken', newRefreshToken);

      response = await fetch(url, {
        ...options,
        headers: {
          ...options.headers,
          'Content-Type': 'application/json',
          Authorization: `Bearer ${newToken}`
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw { message: errorData.error || 'Non autorisé', status: response.status };
      }
    } catch {
      const errorData = await response.json();
      throw { message: errorData.error || 'Échec du rafraîchissement du token.', status: response.status };
    }
  } else if (!response.ok) {
    const errorData = await response.json();
    throw { message: errorData.error || 'Non autorisé', status: response.status };
  }

  return response.json();
};
