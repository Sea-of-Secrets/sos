import { create } from "zustand";

interface GameLoadingState {
  loading: boolean;
  setLoading: (nextLoading: boolean) => void;
}

export const useGameLoading = create<GameLoadingState>(set => ({
  loading: true,
  setLoading: nextLoading => {
    set(state => {
      return { ...state, loading: nextLoading };
    });
  },
}));
