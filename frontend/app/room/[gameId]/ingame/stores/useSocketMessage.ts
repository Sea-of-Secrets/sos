import { create } from "zustand";

interface SocketMessageState {
  socketMessage: any;
  setSocketMessage: (newSocketMessage: any) => void;
}

export const useSocketMessage = create<SocketMessageState>(set => ({
  socketMessage: [],
  setSocketMessage: newSocketMessage => {
    set(state => {
      return { ...state, socketMessage: newSocketMessage };
    });
  },
}));
