/**
 * Type définissant la structure des données de token
 */
type TokenData = {
  data: {
    token: string;
    refreshToken: string;
    user: unknown;
  };
};

/**
 * Stocke les tokens d'authentification dans le localStorage
 * @param data - Données contenant les tokens
 */
export const storeTokens = (data: TokenData) => {
  const { token, refreshToken } = data.data;
  localStorage.setItem('token', token);
  localStorage.setItem('refreshToken', refreshToken);
};
