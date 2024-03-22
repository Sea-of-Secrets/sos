import { PrimitiveProps, ThreeElements } from "@react-three/fiber";
import { NodePosition } from "~/_lib/data/types";

export interface PieceProps
  extends Omit<PrimitiveProps, "object" | "position"> {
  position: NodePosition;
}

export type PieceEffectType = "FOOTHOLD";

export interface PieceEffectProps
  extends Omit<PrimitiveProps, "object" | "position"> {
  type: PieceEffectType;
  position: NodePosition;
}

export interface TreasureProps {
  url: string;
  isOpen: boolean;
  nodeId: number;
}
