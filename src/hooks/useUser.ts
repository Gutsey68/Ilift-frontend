import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useAuthStore } from '../stores/useAuthStore';
import { useUserStore } from '../stores/useUserStore';
import { UserDetails } from '../types/userDetail';

const fetchUserProfile = async (userId: string, token: string): Promise<UserDetails> => {
  const response = await fetch(`http://localhost:3000/api/user/${userId}`, {
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

const useUser = (userId: string) => {
  const token = localStorage.getItem('token');
  const currentUser = useAuthStore(state => state.currentUser);
  const setCurrentUser = useAuthStore(state => state.setCurrentUser);
  const setViewedUser = useUserStore(state => state.setViewedUser);

  const queryResult = useQuery<UserDetails, Error>({
    queryKey: ['userProfile', userId],
    queryFn: () => fetchUserProfile(userId, token!),
    enabled: !!token
  });

  useEffect(() => {
    if (queryResult.isSuccess && queryResult.data) {
      if (userId === currentUser?.id) {
        setCurrentUser(queryResult.data);
      } else {
        setViewedUser(queryResult.data);
      }
    }
  }, [queryResult.isSuccess, queryResult.data, userId, currentUser?.id, setCurrentUser, setViewedUser]);

  return {
    userDetails: queryResult.data,
    isLoading: queryResult.isLoading,
    error: queryResult.error
  };
};

export default useUser;
