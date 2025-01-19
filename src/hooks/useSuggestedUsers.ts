import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { fetchSuggestedUsers } from '../services/usersService';

/**
 * Hook personnalisé pour récupérer les utilisateurs suggérés
 * Utilise React Query pour la gestion du cache et des requêtes
 * @returns Object contenant les données des utilisateurs suggérés, l'état de chargement et les erreurs
 */
const useSuggestedUsers = () => {
  const { user } = useContext(AuthContext);

  const {
    isPending: suggestedPending,
    error: suggestedError,
    data: suggested
  } = useQuery({
    queryKey: ['suggested', user?.id],
    queryFn: () => {
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
