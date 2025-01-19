/**
 * Récupère l'en-tête d'autorisation avec le token d'accès
 *
 * @returns Une chaîne au format 'Bearer <token>' ou une chaîne vide si aucun token n'est présent
 */
export const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? `Bearer ${token}` : '';
};

/**
 * Récupère l'en-tête d'autorisation avec le token de rafraîchissement
 *
 * @returns Une chaîne au format 'Bearer <refreshToken>' ou une chaîne vide si aucun token n'est présent
 */
export const getRefreshHeader = () => {
  const refreshToken = localStorage.getItem('refreshToken');
  return refreshToken ? `Bearer ${refreshToken}` : '';
};
