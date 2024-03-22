import { Mesh } from "three";
import { NodePosition } from "~/_lib/data/types";

export interface PieceState {
  piece: Mesh | null;
  setPiece: (piece: Mesh | null) => void;
  movePiece: (position: NodePosition) => void;
  position: NodePosition | null;
  setPosition: (nextPosition: NodePosition) => void;
  isMoving: boolean;
  setIsMoving: (nextIsMoving: boolean) => void;
}
