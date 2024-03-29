import { create } from "zustand";

type Cb = () => void;

interface TimerState {
  isShowTimer: boolean;
  handleShowTimer: (onCloseCallback?: Cb) => void;
  handleCloseTimer: (onCloseCallback?: Cb) => void;
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
  handleCloseTimer: onCloseCallback => {
    set(state => {
      if (onCloseCallback) {
        onCloseCallback();
      }
      return { ...state, isShowTimer: false };
    });
  },
}));
