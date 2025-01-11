interface TokenData {
  data: {
    token: string;
    refreshToken: string;
  };
}

const storeTokens = (data: TokenData) => {
  const { token, refreshToken } = data.data;

  if (token) {
    const tokenWithBearer = token.startsWith('Bearer ') ? token : `Bearer ${token}`;
    localStorage.setItem('token', tokenWithBearer);
  }
  if (refreshToken) {
    const refreshWithBearer = refreshToken.startsWith('Bearer ') ? refreshToken : `Bearer ${refreshToken}`;
    localStorage.setItem('refreshToken', refreshWithBearer);
  }
};

export const login = async ({ pseudo, password }: { pseudo: string; password: string }) => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ pseudo, password })
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw { message: errorData.error || 'Pseudo ou mot de passe incorrect', status: response.status };
  }

  const data = await response.json();
  storeTokens(data);
  return data;
};

export const logout = async () => {
  const refreshToken = localStorage.getItem('refreshToken');
  if (!refreshToken) return;

  const cleanToken = refreshToken.replace('Bearer ', '').trim();

  const response = await fetch(`/api/auth/unvalidate/${cleanToken}`, {
    method: 'PUT',
    headers: {
      Authorization: refreshToken
    }
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw { message: errorData.error || "Erreur lors de l'invalidation du jeton", status: response.status };
  }
};

export const register = async ({ pseudo, email, password, confirmPassword }: { pseudo: string; email: string; password: string; confirmPassword: string }) => {
  const response = await fetch('/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ pseudo, email, password, confirmPassword })
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw { message: errorData.error || "Erreur lors de l'inscription", status: response.status };
  }
};

export const checkTokenExpiration = (token: string) => {
  const { exp } = JSON.parse(atob(token.split('.')[1]));
  if (Date.now() >= exp * 1000) {
    throw new Error('Le jeton a expiré. Veuillez vous reconnecter.');
  }
};

export const requestPasswordReset = async (email: string) => {
  const response = await fetch('/api/auth/reset-password', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email })
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw { message: errorData.error || 'Erreur lors de la demande de réinitialisation', status: response.status };
  }

  return response.json();
};

export const resetPassword = async ({ token, newPassword }: { token: string; newPassword: string }) => {
  const response = await fetch('/api/auth/update-password', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token, newPassword })
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw { message: errorData.error || 'Erreur lors de la réinitialisation du mot de passe', status: response.status };
  }

  return response.json();
};

export const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  if (!token) return '';
  return token.startsWith('Bearer ') ? token : `Bearer ${token}`;
};

export const getRefreshHeader = () => {
  const refreshToken = localStorage.getItem('refreshToken');
  if (!refreshToken) return '';
  return refreshToken.startsWith('Bearer ') ? refreshToken : `Bearer ${refreshToken}`;
};
