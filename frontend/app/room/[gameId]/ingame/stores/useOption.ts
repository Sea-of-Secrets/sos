import { create } from "zustand";

interface OptionState {
  isChat: boolean;
  isDocs: boolean;
  isOff: boolean;
  setIsChat: () => void;
  setIsDocs: () => void;
  setIsOff: () => void;
}

export const useOption = create<OptionState>(set => ({
  isChat: true,
  isDocs: false,
  isOff: false,
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
  setIsOff: () => {
    set(state => {
      return { ...state, isOff: !state.isOff };
    });
  },
}));
