import { create } from 'zustand';

const useStore = create(set => ({
    footerRef: null,
    setFooterRef: (ref: HTMLElement | null) => set({ footerRef: ref })
}));

export default useStore;
