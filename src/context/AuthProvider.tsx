import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { checkTokenExpiration } from '../services/authService';
import { fetchCurrentUser } from '../services/usersService';
import { UserDetailsType } from '../types/userDetailsType';
import { AuthContext, AuthProviderProps } from './AuthContext';

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const queryClient = useQueryClient();
  const [userError] = useState<Error | null>(null);

  const {
    isLoading: userPending,
    data: user = null,
    error: queryError
  } = useQuery<UserDetailsType | null, Error>({
    queryKey: ['currentUser'],
    queryFn: async () => {
      const token = localStorage.getItem('token');
      if (token) {
        checkTokenExpiration(token);
        const userData = await fetchCurrentUser();
        return userData.data;
      }
      return null;
    },
    refetchOnWindowFocus: false,
    staleTime: Infinity
  });

  useEffect(() => {
    if (queryError) {
      localStorage.removeItem('token');
      localStorage.removeItem('isAuthenticated');
    }
  }, [userError]);

  useEffect(() => {
    const unsubscribe = queryClient.getQueryCache().subscribe(event => {
      if (event.query.queryKey.includes('followers') || event.query.queryKey.includes('followings')) {
        queryClient.invalidateQueries({ queryKey: ['currentUser'] });
      }
    });
    return () => unsubscribe();
  }, [queryClient]);

  return <AuthContext.Provider value={{ user, setUser: () => {}, userPending, userError: queryError }}>{children}</AuthContext.Provider>;
};
