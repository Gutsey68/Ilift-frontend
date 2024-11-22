import useAuth from '../hooks/useAuth';

export const fetchUserById = async (id: string) => {
  const { checkAuth } = useAuth();
  const token = localStorage.getItem('token');

  await checkAuth();

  const response = await fetch(`http://localhost:3000/api/users/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw { message: errorData.error || 'Non autorisé', status: response.status };
  }

  return response.json();
};

export const fetchCurrentUser = async () => {
  const { checkAuth } = useAuth();
  const token = localStorage.getItem('token');

  await checkAuth();

  const response = await fetch('http://localhost:3000/api/users/me', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw { message: errorData.error || 'Non autorisé', status: response.status };
  }

  return response.json();
};

export const fetchSuggestedUsers = async () => {
  const { checkAuth } = useAuth();
  const token = localStorage.getItem('token');

  await checkAuth();

  const response = await fetch(`http://localhost:3000/api/users/suggested`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw { message: errorData.error || 'Non autorisé', status: response.status };
  }

  return response.json();
};
