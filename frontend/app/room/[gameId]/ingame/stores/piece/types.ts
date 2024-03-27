import { Mesh } from "three";
import { NodePosition } from "~/_lib/data/types";

export type MoveAnimationStyle = "JUMP" | "FLOWING";
export type MoveAnimationStyleTwo = "JUMPTWO";

export interface PieceState {
  piece: Mesh | null;
  setPiece: (piece: Mesh | null) => void;
  movePiece: ({
    position,
    moveAnimationStyle,
  }: {
    position: NodePosition;
    moveAnimationStyle: MoveAnimationStyle;
  }) => void;
  movePieceTwo: ({
    positionList,
    moveAnimationStyle,
  }: {
    positionList: number[];
    moveAnimationStyle: MoveAnimationStyleTwo;
  }) => void;
  position: NodePosition | null;
  setPosition: (nextPosition: NodePosition) => void;
  isMoving: boolean;
  setIsMoving: (nextIsMoving: boolean) => void;
}

export type Animation = ({
  state,
  position,
}: {
  state: PieceState;
  position: NodePosition;
}) => PieceState;

export type AnimationTwo = ({
  state,
  positionList,
}: {
  state: PieceState;
  positionList: number[];
}) => PieceState;
