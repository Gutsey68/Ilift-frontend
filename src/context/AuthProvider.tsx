import { useEffect, useState } from 'react';
import { fetchCurrentUser } from '../services/usersService';
import { UserDetailsType } from '../types/userDetailsType';
import { AuthContext, AuthProviderProps } from './AuthContext';

const isTokenExpired = (token: string): boolean => {
  const payload = JSON.parse(atob(token.split('.')[1]));
  return payload.exp * 1000 < Date.now();
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserDetailsType | null>(null);
  const [userPending, setUserPending] = useState<boolean>(true);
  const [userError, setUserError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token && isTokenExpired(token)) {
          setUser(null);
          setUserError(new Error('Session expiré'));
          setUserPending(false);
          return;
        }
        const userData = await fetchCurrentUser();
        setUser(userData);
      } catch (error) {
        setUserError(error as Error);
      } finally {
        setUserPending(false);
      }
    };

    fetchUser();
  }, []);

  return <AuthContext.Provider value={{ user, setUser, userPending, userError }}>{children}</AuthContext.Provider>;
};
