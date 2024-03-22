import { create } from "zustand";
import { GraphState } from "./types";

export const createUseGraph = () =>
  create<GraphState>(set => ({
    movableNodeIdList: [],
    setMovableNodeIdList: nextNodeList => {
      set(state => {
        return { ...state, movableNodeIdList: nextNodeList };
      });
    },
  }));
