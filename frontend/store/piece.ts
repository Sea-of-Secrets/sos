import { create } from "zustand";
import { Mesh } from "three";
import TWEEN from "@tweenjs/tween.js";

interface PieceState {
  pirate: Mesh | null;
  marine1: Mesh | null;
  marine2: Mesh | null;
  marine3: Mesh | null;
  setPirate: (value: Mesh | null) => void;
  movePirate: (position: number[]) => void;
}

const usePiece = create<PieceState>(set => ({
  pirate: null,
  setPirate: value => set({ pirate: value }),
  movePirate: position => {
    set(state => {
      if (state.pirate) {
        new TWEEN.Tween(state.pirate.position)
          .to(
            {
              x: position[0],
              z: position[1],
            },
            1000,
          )
          .easing(TWEEN.Easing.Cubic.Out)
          .start();

        new TWEEN.Tween(state.pirate.position)
          .to(
            {
              y: state.pirate.position.y + 15,
            },
            250,
          )
          .easing(TWEEN.Easing.Cubic.Out)
          .start()
          .onComplete(() => {
            if (state.pirate) {
              new TWEEN.Tween(state.pirate.position)
                .to(
                  {
                    y: state.pirate.position.y - 15,
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

  marine1: null,
  marine2: null,
  marine3: null,
}));

export default usePiece;
