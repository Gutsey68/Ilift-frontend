import { UserDetailsType } from '@/types/userDetailsType';
import { useEffect, useState } from 'react';
import { checkTokenExpiration } from '../services/authService';
import { fetchCurrentUser } from '../services/usersService';
import { AuthContext, AuthProviderProps } from './AuthContext';

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserDetailsType | null>(null);
  const [userPending, setUserPending] = useState<boolean>(true);
  const [userError, setUserError] = useState<Error | null>(null);

  const checkAuth = async () => {
    const token = localStorage.getItem('token');
    try {
      if (token) {
        checkTokenExpiration(token);
        const userData = await fetchCurrentUser();
        setUser(userData.data);
      }
    } catch (error) {
      setUserError(error as Error);
      localStorage.removeItem('token');
      localStorage.removeItem('isAuthenticated');
    } finally {
      setUserPending(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return <AuthContext.Provider value={{ user, setUser, userPending, userError }}>{children}</AuthContext.Provider>;
};
