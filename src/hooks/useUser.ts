import { useQuery } from '@tanstack/react-query';
import { UserDetails } from '../types/userDetail';

const fetchUserProfile = async (token: string | null): Promise<UserDetails> => {
  if (!token) {
    throw new Error('Token manquant');
  }

  const response = await fetch('http://localhost:3000/api/user/me', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  });

  if (!response.ok) {
    throw new Error('Erreur lors de la récupération du profil utilisateur');
  }

  return response.json();
};

const useUser = () => {
  const token = localStorage.getItem('token');

  const queryResult = useQuery<UserDetails, Error>({
    queryKey: ['userProfile'],
    queryFn: () => fetchUserProfile(token),
    enabled: !!token
  });

  return { userDetails: queryResult.data, isLoading: queryResult.isLoading, error: queryResult.error };
};

export default useUser;
