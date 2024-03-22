import { Mesh } from "three";
import { NodePosition } from "~/_lib/data/types";

export type MoveAnimaitonStyle = "JUMP" | "FLOWING";

export interface PieceState {
  piece: Mesh | null;
  setPiece: (piece: Mesh | null) => void;
  movePiece: ({
    position,
    moveAnimationStyle,
  }: {
    position: NodePosition;
    moveAnimationStyle: MoveAnimaitonStyle;
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
