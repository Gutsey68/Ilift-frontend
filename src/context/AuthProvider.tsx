import { useEffect, useState } from 'react';
import { fetchCurrentUser } from '../services/userService';
import { UserDetails } from '../types/UserDetailsType';
import { AuthContext, AuthProviderProps } from './AuthContext';

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserDetails | null>(null);
  const [userPending, setUserPending] = useState<boolean>(true);
  const [userError, setUserError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
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
