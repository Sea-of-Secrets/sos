export type NodePosition = {
  x: number;
  y: number;
  z: number;
};

export type IngameGraphNode = {
  type: "MARINE" | "PIRATE" | null;
  nodeId: number;
  position: NodePosition;
  neighborNodeIdList: number[];
};

export type OldIngameGraphNode = {
  isWater: boolean;
  area?: "ONE" | "TWO" | "THREE" | "FOUR" | null;
} & IngameGraphNode;
