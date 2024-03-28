import { create } from "zustand";

interface SocketMessageState {
  socketMessage: any;
  chatMessage: any;
  setSocketMessage: (newSocketMessage: any) => void;
  setChatMessage: (newChatMessage: any) => void;
}

export const useSocketMessage = create<SocketMessageState>(set => ({
  socketMessage: {},
  setSocketMessage: newSocketMessage => {
    set(state => {
      return { ...state, socketMessage: newSocketMessage };
    });
  },
  chatMessage: {},
  setChatMessage: newChatMessage => {
    set(state => {
      return { ...state, socketMessage: newChatMessage };
    });
  },
}));
