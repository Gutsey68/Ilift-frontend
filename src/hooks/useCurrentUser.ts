import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchCurrentUser } from '../services/usersService';
import { UserDetailsType } from '../types/userDetailsType';

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
