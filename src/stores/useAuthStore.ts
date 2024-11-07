import { create } from 'zustand';
import { UserDetails } from '../types/userDetail';

type AuthStore = {
  isAuthenticated: boolean;
  currentUser: UserDetails | null;
  setAuthenticated: (authStatus: boolean) => void;
  setCurrentUser: (user: UserDetails) => void;
  clearUserDetails: () => void;
};

const useAuthStore = create<AuthStore>(set => ({
  isAuthenticated: !!localStorage.getItem('token'),
  currentUser: null,
  setAuthenticated: authStatus => set({ isAuthenticated: authStatus }),
  setCurrentUser: user => set({ currentUser: user }),
  clearUserDetails: () => set({ currentUser: null, isAuthenticated: false })
}));

export { useAuthStore };
