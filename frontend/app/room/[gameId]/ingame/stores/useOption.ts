import { create } from "zustand";

interface OptionState {
  isChat: boolean;
  isDocs: boolean;
  setIsChat: () => void;
  setIsDocs: () => void;
}

export const useOption = create<OptionState>(set => ({
  isChat: true,
  isDocs: false,
  setIsChat: () => {
    set(state => {
      return { ...state, isChat: !state.isChat };
    });
  },
  setIsDocs: () => {
    set(state => {
      return { ...state, isDocs: !state.isDocs };
    });
  },
}));
