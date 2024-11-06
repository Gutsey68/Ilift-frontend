import { create } from 'zustand';
import { UserDetails } from '../types/userDetail';

type AuthStore = {
  isAuthenticated: boolean;
  userDetails: UserDetails | null;
  setAuthenticated: (authStatus: boolean) => void;
  setUserDetails: (user: UserDetails) => void;
  clearUserDetails: () => void;
};

const useAuthStore = create<AuthStore>(set => ({
  isAuthenticated: !!localStorage.getItem('token'),
  userDetails: null,
  setAuthenticated: authStatus => set({ isAuthenticated: authStatus }),
  setUserDetails: user => set({ userDetails: user }),
  clearUserDetails: () => set({ userDetails: null, isAuthenticated: false })
}));

export { useAuthStore };
