import { UserDetailsType } from '@/types/userDetailsType';
import { createContext } from 'react';

/**
 * Type définissant la structure du contexte d'authentification
 */
export type AuthContextType = {
  user: UserDetailsType | null;
  setUser: (user: UserDetailsType | null) => void;
  userPending: boolean;
  userError: Error | null;
};

/**
 * Contexte pour gérer l'état d'authentification global
 */
export const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
  userPending: false,
  userError: null
});

/**
 * Props pour le AuthProvider
 */
export type AuthProviderProps = {
  children: React.ReactNode;
};
