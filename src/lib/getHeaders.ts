export const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? `Bearer ${token}` : '';
};

export const getRefreshHeader = () => {
  const refreshToken = localStorage.getItem('refreshToken');
  return refreshToken ? `Bearer ${refreshToken}` : '';
};
