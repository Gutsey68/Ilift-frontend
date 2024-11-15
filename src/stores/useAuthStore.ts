import { create } from 'zustand';
import { UserDetails } from '../types/userDetail';

type AuthStore = {
  isAuthenticated: boolean;
  setAuthenticated: (authStatus: boolean) => void;
  userDetails: UserDetails | null;
  setUserDetails: (userDetails: UserDetails) => void;
};

const useAuthStore = create<AuthStore>(set => ({
  isAuthenticated: false,
  setAuthenticated: authStatus => set({ isAuthenticated: authStatus }),
  userDetails: null,
  setUserDetails: userDetails => set({ userDetails })
}));

export { useAuthStore };
