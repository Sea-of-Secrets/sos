import { create } from "zustand";

type ScreenType =
  | "START"
  | "MAIN"
  | "ROOM"
  | "SHOP"
  | "LOGIN"
  | "FASTMATCHING"
  | "MYPAGE";

interface ScreenControlState {
  screen: ScreenType;
  startIntro: boolean;
  showLogo: boolean;
  setScreen: (newScreen: ScreenType) => void;
  setMainScreen: () => void;
  setStartIntroScreen: () => void;
  setShowLogo: () => void;
}

export const useScreenControl = create<ScreenControlState>(set => ({
  screen: "MAIN",
  startIntro: false,
  showLogo: false,
  setStartIntroScreen: () => {
    set(state => {
      return { ...state, startIntro: false };
    });
  },
  setShowLogo: () => {
    set(state => {
      return { ...state, showLogo: true };
    });
  },
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
