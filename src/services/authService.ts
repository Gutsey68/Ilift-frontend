export const login = async ({ pseudo, password }: { pseudo: string; password: string }) => {
  const response = await fetch('http://localhost:3000/api/auth/login', {
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

export const register = async ({ pseudo, email, password }: { pseudo: string; email: string; password: string }) => {
  const response = await fetch('http://localhost:3000/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ pseudo, email, password })
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw { message: errorData.error || 'Erreur lors de l’inscription', status: response.status };
  }
};
