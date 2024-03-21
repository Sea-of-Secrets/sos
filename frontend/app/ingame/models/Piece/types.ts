import { PrimitiveProps, ThreeElements } from "@react-three/fiber";

export interface PieceProps extends Omit<ThreeElements["mesh"], "position"> {
  position?: [number, number, number];
}

export type PieceEffectType = "FOOTHOLD";

export interface PieceEffectProps
  extends Omit<PrimitiveProps, "object" | "position"> {
  type: PieceEffectType;
  position: [number, number, number]; // x, y, z
}
