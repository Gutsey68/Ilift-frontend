export const refresh = async () => {
  const refreshToken = localStorage.getItem('refreshToken');

  const response = await fetch('/api/auth/refresh', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${refreshToken}`
    }
  });

  const data = await response.json();

  if (!response.ok) {
    throw { message: data.message || 'Token invalide', status: response.status };
  }

  return data;
};
