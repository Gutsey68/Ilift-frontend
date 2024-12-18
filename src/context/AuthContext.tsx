import { UserDetailsType } from '@/types/userDetailsType';
import { createContext } from 'react';
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
