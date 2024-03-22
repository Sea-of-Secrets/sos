import { create } from "zustand";

import { PieceState } from "./types";
import { AnimationMap } from "./animations";

export const usePiece = create<PieceState>(set => ({
  piece: null,
  setPiece: piece =>
    set(state => {
      return { ...state, piece };
    }),
  movePiece: ({ position, moveAnimationStyle }) => {
    set(state => {
      return AnimationMap[moveAnimationStyle]({ state, position });
    });
  },
  position: null,
  setPosition: nextPosition => {
    set(state => {
      return { ...state, position: nextPosition };
    });
  },
  isMoving: false,
  setIsMoving: nextIsMoving => {
    set(state => {
      return { ...state, isMoving: nextIsMoving };
    });
  },
}));
