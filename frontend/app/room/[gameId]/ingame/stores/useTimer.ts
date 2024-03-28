import { create } from "zustand";

type Cb = () => void;

interface TimerState {
  isShowTimer: boolean;
  handleShowTimer: (onCloseCallback?: Cb) => void;
  handleCloseTimer: () => void;
}

let onCloseCallback = () => {};

export const useTimer = create<TimerState>(set => ({
  isShowTimer: false,
  handleShowTimer: cb => {
    set(state => {
      if (cb) {
        onCloseCallback = cb;
      }
      return { ...state, isShowTimer: true };
    });
  },
  handleCloseTimer: () => {
    set(state => {
      onCloseCallback();
      return { ...state, isShowTimer: false };
    });
  },
}));
