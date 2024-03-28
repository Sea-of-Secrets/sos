import { create } from "zustand";

import { PieceState } from "./types";
import { AnimationMap, AnimationMapTwo } from "./animations";

export const createUsePiece = () =>
  create<PieceState>(set => ({
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
    movePieceTwo: ({ positionList, moveAnimationStyle }) => {
      set(state => {
        return AnimationMapTwo[moveAnimationStyle]({ state, positionList });
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
