import { create } from "zustand";

type GatchaState =
  | "GATCHA_PREV"
  | "GATCHA_READY"
  | "GATCHA_ING"
  | "GATCHA_COMPLETE";

interface GatchaStoreState {
  gatchaState: GatchaState;
  setGatchaState: (nextGatchaState: GatchaState) => void;
}

export const useGatcha = create<GatchaStoreState>(set => ({
  gatchaState: "GATCHA_PREV",
  setGatchaState: nextGatchaState => {
    set(state => {
      return { ...state, gatchaState: nextGatchaState };
    });
  },
}));
