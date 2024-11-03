import { create } from 'zustand';

type AuthStore = {
  isAuthenticated: boolean;
  setAuthenticated: (authStatus: boolean) => void;
};

export const useAuthStore = create<AuthStore>(set => ({
  isAuthenticated: false,
  setAuthenticated: authStatus => set({ isAuthenticated: authStatus })
}));
