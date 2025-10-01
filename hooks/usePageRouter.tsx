import { create } from 'zustand';

interface PageRouter {
    page: number
    setPage: (newPage: number) => void
}

export const usePageRouter = create<PageRouter>()(
  (set) => ({
    page: 0,

    setPage: (newPage) => set({ page: newPage }),
  }),
);
