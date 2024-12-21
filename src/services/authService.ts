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

  return response.json();
};

export const logout = async () => {
  const refreshToken = localStorage.getItem('refreshToken');

  const response = await fetch(`/api/auth/unvalidate/${refreshToken}`, {
    method: 'PUT'
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
