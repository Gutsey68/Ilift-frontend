import { UserDetails } from '../types/userDetail';

export const fetchUserById = async (id: string): Promise<UserDetails> => {
  const token = localStorage.getItem('jwtToken');

  if (!token) {
    throw new Error('Token manquant. Veuillez vous reconnecter.');
  }

  const response = await fetch(`http://localhost:3000/api/user/${id}`, {
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
