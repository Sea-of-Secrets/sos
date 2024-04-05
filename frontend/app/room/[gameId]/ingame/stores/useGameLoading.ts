import { create } from "zustand";

interface GameLoadingState {
  myLoading: boolean;
  allLoading: boolean;
  setMyLoading: (loading: boolean) => void;
  setAllLoading: (loading: boolean) => void;
}

export const useGameLoading = create<GameLoadingState>(set => ({
  myLoading: false,
  allLoading: false,
  setMyLoading: loading => {
    set(state => {
      return { ...state, myLoading: loading };
    });
  },
  setAllLoading: loading => {
    set(state => {
      return { ...state, allLoading: loading };
    });
  },
}));
