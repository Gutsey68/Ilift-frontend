export const fetchCurrentUser = async () => {
  const token = localStorage.getItem('token');

  if (!token) {
    throw new Error('Token manquant. Veuillez vous reconnecter.');
  }

  const response = await fetch('http://localhost:3000/api/users/me', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  });

  if (!response.ok) {
    throw new Error('Non autorisé');
  }

  return response.json();
};

export const login = async ({ pseudo, password }: { pseudo: string; password: string }): Promise<{ token: string }> => {
  const response = await fetch('http://localhost:3000/api/users/login', {
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

export const register = async ({ pseudo, email, password }: { pseudo: string; email: string; password: string }): Promise<void> => {
  const response = await fetch('http://localhost:3000/api/users/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ pseudo, email, password })
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw { message: errorData.error || 'Erreur lors de l’inscription', status: response.status };
  }
};
