import { create } from 'zustand';

type AuthStore = {
  isAuthenticated: boolean;
  setAuthenticated: (authStatus: boolean) => void;
};

const useAuthStore = create<AuthStore>(set => ({
  isAuthenticated: !!localStorage.getItem('token'),
  setAuthenticated: authStatus => set({ isAuthenticated: authStatus })
}));

export { useAuthStore };
