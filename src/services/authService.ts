import { getRefreshHeader } from '../lib/getHeaders';

interface TokenData {
  data: {
    token: string;
    refreshToken: string;
    user: unknown;
  };
}

const storeTokens = (data: TokenData) => {
  const { token, refreshToken } = data.data;
  localStorage.setItem('token', token);
  localStorage.setItem('refreshToken', refreshToken);
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

export const refresh = async () => {
  const refreshHeader = getRefreshHeader();

  if (!refreshHeader) {
    throw new Error('Pas de refresh token');
  }

  const response = await fetch('/api/auth/refresh', {
    method: 'POST',
    headers: {
      Authorization: refreshHeader
    }
  });

  if (!response.ok) {
    throw new Error('Refresh token invalide');
  }

  const data = await response.json();
  return data;
};
