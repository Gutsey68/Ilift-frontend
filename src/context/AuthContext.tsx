import { createContext, useEffect, useState } from 'react';
import { fetchCurrentUser } from '../services/userService';
import { UserDetails } from '../types/userDetail';

export type AuthContextType = {
  user: UserDetails | null;
  setUser: (user: UserDetails | null) => void;
  userPending: boolean;
  userError: Error | null;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
  userPending: false,
  userError: null
});

type AuthProviderProps = {
  children: React.ReactNode;
};

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
