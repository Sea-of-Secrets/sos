type BaseNode = {
  nodeId: number;
  position: [number, number];
};

export type CircleNode = BaseNode & {
  type: "도둑";
  nodeNumber: number;
};

export type SquareNode = BaseNode & {
  type: "경찰";
};

export type EmptyNode = BaseNode & {
  type: "Empty";
};

export type GraphNode = CircleNode | SquareNode | EmptyNode;
