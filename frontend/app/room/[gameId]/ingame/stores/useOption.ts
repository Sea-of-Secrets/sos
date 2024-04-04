import { create } from "zustand";

interface OptionState {
  isChat: boolean;
  isDocs: boolean;
  isOff: boolean;
  isCamera: boolean;
  isMenu: boolean;
  setIsChat: () => void;
  setIsDocs: () => void;
  setIsOff: () => void;
  setIsCamera: () => void;
  setIsMenu: () => void;
}

export const useOption = create<OptionState>(set => ({
  isChat: true,
  isDocs: false,
  isOff: false,
  isCamera: true,
  isMenu: false,
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
  setIsCamera: () => {
    set(state => {
      return { ...state, isCamera: !state.isCamera };
    });
  },
  setIsMenu: () => {
    set(state => {
      return { ...state, isMenu: !state.isMenu };
    });
  },
}));
