import { PrimitiveProps } from "@react-three/fiber";
import { NodePosition } from "~/_lib/data/types";
import { PiecePathMap, PieceEffectPathMap } from "~/assetPath";

export interface PieceProps
  extends Omit<PrimitiveProps, "object" | "position"> {
  position: NodePosition;
  pieceName: keyof typeof PiecePathMap;
}

export interface PieceEffectProps
  extends Omit<PrimitiveProps, "object" | "position"> {
  effectName: keyof typeof PieceEffectPathMap;
  position: NodePosition;
}
