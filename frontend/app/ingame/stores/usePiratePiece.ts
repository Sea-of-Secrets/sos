import { create } from "zustand";
import { Mesh } from "three";
import TWEEN from "@tweenjs/tween.js";
import { NodePosition } from "~/_lib/data/types";

interface PiratePieceState {
  piece: Mesh | null;
  setPiece: (piece: Mesh | null) => void;
  movePiece: (position: NodePosition) => void;
  position: NodePosition | null;
  setPosition: (nextPosition: NodePosition) => void;
  isMoving: boolean;
  setIsMoving: (nextIsMoving: boolean) => void;
}

export const usePiratePiece = create<PiratePieceState>(set => ({
  piece: null,
  setPiece: piece =>
    set(state => {
      return { ...state, piece };
    }),
  movePiece: position => {
    set(state => {
      if (state.piece) {
        new TWEEN.Tween(state.piece.position)
          .to(
            {
              x: position.x,
              z: position.y,
            },
            1000,
          )
          .easing(TWEEN.Easing.Cubic.Out)
          .start();

        new TWEEN.Tween(state.piece.position)
          .to(
            {
              y: state.piece.position.y + 15,
            },
            250,
          )
          .easing(TWEEN.Easing.Cubic.Out)
          .start()
          .onComplete(() => {
            if (state.piece) {
              new TWEEN.Tween(state.piece.position)
                .to(
                  {
                    y: state.piece.position.y - 15,
                  },
                  500,
                )
                .easing(TWEEN.Easing.Bounce.Out)
                .start();
            }
          });
      }
      return state;
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
