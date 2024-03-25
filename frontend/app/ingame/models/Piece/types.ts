import { PrimitiveProps } from "@react-three/fiber";
import { Mesh } from "three";
import { NodePosition } from "~/_lib/data/types";
import { PiecePathMap, PieceEffectPathMap } from "~/assetPath";

export interface PieceProps
  extends Omit<PrimitiveProps, "object" | "position"> {
  position: NodePosition;
  pieceName: keyof typeof PiecePathMap;
  name?: "PIRATE" | "MARINE1" | "MARINE2" | "MARINE3";
  set?: (ref: Mesh | null) => void;
}

export interface PieceEffectProps
  extends Omit<PrimitiveProps, "object" | "position"> {
  effectName: keyof typeof PieceEffectPathMap;
  position: NodePosition;
}

export interface TreasureProps {
  url: string;
  isOpen: boolean;
  nodeId: number;
}
