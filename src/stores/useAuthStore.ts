import { create } from 'zustand';
import { UserDetails } from '../types/userDetail';

type AuthStore = {
  isAuthenticated: boolean;
  currentUser: UserDetails | null;
  isLoading: boolean;
  setAuthenticated: (authStatus: boolean) => void;
  setCurrentUser: (user: UserDetails) => void;
  setLoading: (loading: boolean) => void;
  clearUserDetails: () => void;
};

const useAuthStore = create<AuthStore>(set => ({
  isAuthenticated: localStorage.getItem('isAuthenticated') === 'true',
  currentUser: null,
  isLoading: true,
  setAuthenticated: authStatus => set({ isAuthenticated: authStatus }),
  setCurrentUser: user => set({ currentUser: user }),
  setLoading: loading => set({ isLoading: loading }),
  clearUserDetails: () => set({ currentUser: null, isAuthenticated: false, isLoading: false })
}));

export { useAuthStore };
