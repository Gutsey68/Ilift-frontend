import { create } from 'zustand';
import { UserDetails } from '../types/userDetail';

type UserStore = {
  viewedUser: UserDetails | null;
  setViewedUser: (user: UserDetails) => void;
  clearViewedUser: () => void;
};

const useUserStore = create<UserStore>(set => ({
  viewedUser: null,
  setViewedUser: user => set({ viewedUser: user }),
  clearViewedUser: () => set({ viewedUser: null })
}));

export { useUserStore };
