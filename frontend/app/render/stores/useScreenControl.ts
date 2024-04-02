import { create } from "zustand";

type ScreenType = "MAIN" | "ROOM" | "SHOP" | "LOGIN" | "FASTMATCHING";

interface ScreenControlState {
  screen: ScreenType;
  setScreen: (newScreen: ScreenType) => void;
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
