export interface GraphState {
  movableNodeIdList: number[];
  setMovableNodeIdList: (nextNodeIdList: number[]) => void;
  movableEdgeIdList: string[];
  setMovableEdgeIdList: (nextEdgeIdList: string[]) => void;
}
