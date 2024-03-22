export type NodePosition = {
  x: number;
  y: number;
  z: number;
};

export type IngameGraphNode = {
  readonly type: "MARINE" | "PIRATE" | null;
  readonly nodeId: number;
  readonly position: NodePosition;
  readonly isWater: boolean;
  readonly neighborNodeIdList: number[];
  readonly area?: "ONE" | "TWO" | "THREE" | "FOUR" | null;
};
