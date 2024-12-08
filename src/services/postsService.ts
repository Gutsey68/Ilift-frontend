export const fetchPostsOfUserAndHisFollowingsHandler = async (id: string) => {
  const token = localStorage.getItem('token');

  if (!token) {
    throw new Error('Token manquant. Veuillez vous reconnecter.');
  }

  const response = await fetch(`/api/posts/users/${id}/accueil`, {
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

export const fetchPostsByUserHandler = async (id: string) => {
  const token = localStorage.getItem('token');

  if (!token) {
    throw new Error('Token manquant. Veuillez vous reconnecter.');
  }

  const response = await fetch(`/api/posts/users/${id}`, {
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
