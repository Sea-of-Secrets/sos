import TWEEN from "@tweenjs/tween.js";
import {
  Animation,
  AnimationTwo,
  MoveAnimationStyle,
  MoveAnimationStyleTwo,
} from "./types";
import { getNode } from "~/_lib/data/data";
import { useCamera } from "../useCamera";

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

const jumpTwo: AnimationTwo = ({ state, positionList }) => {
  if (!state.piece || !positionList || positionList.length === 0) {
    return { ...state };
  }

  let currentIndex = 1;

  const jumpToNextPosition = () => {
    const currentPosition = getNode(positionList[currentIndex]).position;
    const moveSpeed = 100;

    new TWEEN.Tween(state.piece!.position)
      .to(
        {
          x: currentPosition.x,
          z: currentPosition.y,
        },
        4 * moveSpeed,
      )
      .easing(TWEEN.Easing.Cubic.Out)
      .start();

    new TWEEN.Tween(state.piece!.position)
      .to(
        {
          y: state.piece!.position.y + 15,
        },
        moveSpeed,
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
              4 * moveSpeed,
            )
            .easing(TWEEN.Easing.Bounce.Out)
            .start()
            .onComplete(() => {
              currentIndex++;
              if (currentIndex < positionList.length) {
                jumpToNextPosition();
              }
            });
        }
      });
  };

  jumpToNextPosition();

  return { ...state };
};

const flowing: Animation = ({ state, position }) => {
  return { ...state };
};

export const AnimationMap: Record<MoveAnimationStyle, Animation> = {
  JUMP: jump,
  FLOWING: flowing,
};

export const AnimationMapTwo: Record<MoveAnimationStyleTwo, AnimationTwo> = {
  JUMPTWO: jumpTwo,
};
