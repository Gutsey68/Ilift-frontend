import { createContext, useEffect, useState } from 'react';
import useCurrentUser from '../hooks/useCurrentUser';
import { UserDetails } from '../types/userDetail';

export type AuthContextType = {
  user: UserDetails | null;
  setUser: (user: UserDetails | null) => void;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {}
});

type AuthProviderProps = {
  children: React.ReactNode;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { userData } = useCurrentUser();
  const [user, setUser] = useState<UserDetails | null>(userData);

  useEffect(() => {
    setUser(userData);
  }, [userData]);

  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
};
