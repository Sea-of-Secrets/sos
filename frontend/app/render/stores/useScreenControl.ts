import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

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
  showIntro: boolean;
  showLogo: boolean;
  setScreen: (newScreen: ScreenType) => void;
  setMainScreen: () => void;
  setShowIntro: () => void;
  setShowLogo: () => void;
}

export const useScreenControl = create<ScreenControlState>()(
  persist(
    set => ({
      screen: "MAIN",
      showIntro: false,
      showLogo: false,
      setShowIntro: () => {
        set(state => {
          return { ...state, showIntro: true };
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
    }),
    {
      name: "intro-animation",
      storage: createJSONStorage(() => sessionStorage),
      partialize: state => ({ showIntro: state.showIntro }),
    },
  ),
);
