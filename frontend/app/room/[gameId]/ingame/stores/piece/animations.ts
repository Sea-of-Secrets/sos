import TWEEN from "@tweenjs/tween.js";
import {
  Animation,
  AnimationTwo,
  MoveAnimationStyle,
  MoveAnimationStyleTwo,
} from "./types";
import { getNode } from "~/_lib/data/data";

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
  if (!state.piece || !positionList || positionList.length < 2) {
    return { ...state };
  }

  const jumpDuration = 1000; // 전체 점프 시간
  const jumpHeight = 15; // 점프 높이
  const intervalDuration = jumpDuration / (positionList.length - 1); // 각 구간별 점프 시간

  // 각 구간별 점프 실행
  for (let i = 1; i < positionList.length; i++) {
    const beforePosition = getNode(positionList[i - 1]);
    const nextPosition = getNode(positionList[i]).position;

    new TWEEN.Tween(state.piece.position)
      .to(
        {
          x: nextPosition.x,
          z: nextPosition.y,
        },
        intervalDuration,
      )
      .easing(TWEEN.Easing.Cubic.Out)
      .start();

    new TWEEN.Tween(state.piece.position)
      .to(
        {
          y: state.piece.position.y + jumpHeight,
        },
        intervalDuration / 4,
      )
      .easing(TWEEN.Easing.Cubic.Out)
      .start()
      .onComplete(() => {
        if (state.piece) {
          new TWEEN.Tween(state.piece.position)
            .to(
              {
                y: state.piece.position.y - jumpHeight,
              },
              (intervalDuration * 3) / 4,
            )
            .easing(TWEEN.Easing.Bounce.Out)
            .start();
        }
      });
  }

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
