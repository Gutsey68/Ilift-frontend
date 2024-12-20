import { createContext } from 'react';
import { UserDetailsType } from '../types/userDetailsType';

export type AuthContextType = {
  user: UserDetailsType | null;
  setUser: (user: UserDetailsType | null) => void;
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
