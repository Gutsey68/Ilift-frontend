import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { fetchSuggestedUsers } from '../services/usersService';

const useSuggestedUsers = () => {
  const { user } = useContext(AuthContext);

  const {
    isPending: suggestedPending,
    error: suggestedError,
    data: suggested
  } = useQuery({
    queryKey: ['suggested', user?.id],
    queryFn: () => {
      if (!user) {
        throw new Error('Utilisateur non connecté');
      }
      return fetchSuggestedUsers();
    },
    enabled: !!user
  });

  const suggestedData = suggested?.data;

  return {
    suggestedPending,
    suggestedError,
    suggestedData
  };
};

export default useSuggestedUsers;
