import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface IntroState {
  showIntro: boolean;
  showLogo: boolean;
  setShowIntro: () => void;
  setShowLogo: () => void;
}

export const useIntro = create<IntroState>()(
  persist(
    set => ({
      showIntro: false,
      showLogo: false,
      setShowIntro: () => {
        set(state => ({ ...state, showIntro: false }));
      },
      setShowLogo: () => {
        set(state => ({ ...state, showLogo: true }));
      },
    }),
    {
      name: "intro-animation",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
