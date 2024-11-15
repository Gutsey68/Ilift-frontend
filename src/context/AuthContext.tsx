import { createContext } from 'react';
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

export type AuthProviderProps = {
  children: React.ReactNode;
};
