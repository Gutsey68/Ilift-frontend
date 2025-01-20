import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchCurrentUser } from '../services/usersService';
import { UserDetailsType } from '../types/UserDetailsType';

/**
 * Hook personnalisé pour gérer l'utilisateur courant
 * Fournit les données de l'utilisateur et une méthode pour les mettre à jour
 * @returns Object contenant les données de l'utilisateur et la méthode setUser
 */
export const useCurrentUser = () => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['currentUser'],
    queryFn: async () => {
      const response = await fetchCurrentUser();
      return response.data;
    },
    retry: false
  });

  const setUser = (user: UserDetailsType | null) => {
    queryClient.setQueryData(['currentUser'], user);
  };

  return { ...query, setUser };
};
