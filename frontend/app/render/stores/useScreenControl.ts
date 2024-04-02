import { create } from "zustand";

interface ScreenControlState {
  screen: string;
  setScreen: (newScreen: string) => void;
  setMainScreen: () => void;
}

export const useScreenControl = create<ScreenControlState>(set => ({
  screen: "MAIN",
  setScreen: newScreen => {
    set(state => {
      return { ...state, screen: newScreen };
    });
  },
  setMainScreen: () => {
    set(state => {
      return { ...state, screen: "MAIN" };
    });
  },
}));
