import { create } from "zustand";
import { GraphState } from "./types";

export const createUseGraph = () =>
  create<GraphState>(set => ({
    movableNodeIdList: [],
    setMovableNodeIdList: nextNodeIdList => {
      set(state => {
        return { ...state, movableNodeIdList: nextNodeIdList };
      });
    },
    movableEdgeIdList: [],
    setMovableEdgeIdList: nextEdgeIdList => {
      set(state => {
        return { ...state, movableEdgeIdList: nextEdgeIdList };
      });
    },
  }));
