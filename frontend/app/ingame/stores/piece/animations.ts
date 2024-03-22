import TWEEN from "@tweenjs/tween.js";
import { Animation, MoveAnimaitonStyle } from "./types";

const jump: Animation = ({ state, position }) => {
  if (!state.piece) {
    return { ...state };
  }

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

  return { ...state };
};

const flowing: Animation = ({ state, position }) => {
  return { ...state };
};

export const AnimationMap: Record<MoveAnimaitonStyle, Animation> = {
  JUMP: jump,
  FLOWING: flowing,
};
