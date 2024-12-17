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
    const responseRefresh = await refresh();

    console.log(responseRefresh);

    localStorage.setItem('token', responseRefresh.data.token);
    localStorage.setItem('refreshToken', responseRefresh.Data.refreshToken);

    if (responseRefresh.ok) {
      response = await fetch(url, {
        ...options,
        headers: {
          ...options.headers,
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });
    } else {
      throw new Error('Échec du rafraîchissement du token.');
    }
  } else if (!response.ok) {
    const errorData = await response.json();
    throw { message: errorData.error || 'Non autorisé', status: response.status };
  }

  return response.json();
};
