import { refresh } from '../services/refreshService';

let isRefreshingToken = false;
let refreshSubscribers: ((token: string) => void)[] = [];

const onTokenRefreshed = (token: string) => {
  refreshSubscribers.forEach(callback => callback(token));
  refreshSubscribers = [];
};

export const fetchWithToken = async (url: string, options: RequestInit = {}) => {
  const token = localStorage.getItem('token');

  if (!token) {
    throw new Error('Token manquant. Veuillez vous reconnecter.');
  }

  const makeRequest = async (token: string) => {
    const headers: HeadersInit = {
      Authorization: `Bearer ${token}`
    };

    if (!(options.body instanceof FormData)) {
      headers['Content-Type'] = 'application/json';
    }

    const response = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        ...headers
      }
    });
    return response;
  };

  const response = await makeRequest(token);

  if (response.status === 401) {
    if (!isRefreshingToken) {
      isRefreshingToken = true;
      try {
        const responseRefresh = await refresh();

        const newToken = responseRefresh.data.token;
        const newRefreshToken = responseRefresh.data.refreshToken;

        localStorage.setItem('token', newToken);
        localStorage.setItem('refreshToken', newRefreshToken);

        isRefreshingToken = false;
        onTokenRefreshed(newToken);
      } catch {
        isRefreshingToken = false;
        onTokenRefreshed('');
        const errorData = await response.json();
        throw { message: errorData.error || 'Échec du rafraîchissement du token.', status: response.status };
      }
    }

    return new Promise((resolve, reject) => {
      refreshSubscribers.push(async newToken => {
        if (!newToken) {
          return reject('Échec du rafraîchissement du token.');
        }
        try {
          const retryResponse = await makeRequest(newToken);
          if (!retryResponse.ok) {
            const errorData = await retryResponse.json();
            return reject({ message: errorData.error || 'Non autorisé', status: retryResponse.status });
          }
          const data = await retryResponse.json();
          resolve(data);
        } catch (err) {
          reject(err);
        }
      });
    });
  } else if (!response.ok) {
    const errorData = await response.json();
    throw { message: errorData.error || 'Non autorisé', status: response.status };
  }

  return response.json();
};
