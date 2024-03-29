import { create } from "zustand";

import { getMarineStartNodeList } from "~/_lib/data/data";
import { IngameGraphNode } from "~/_lib/data/types";

export type MarinePlayerKey = "1" | "2" | "3";

// 마린이 게임을 시작했을 때 선택 가능한 노드
interface WhenMarineStartGameState {
  isMarineStartGameTurn: boolean;
  currentMarinePlayerKey: MarinePlayerKey;
  startMarineTurn: (marinePlayerKey: MarinePlayerKey) => void;
  selectableStartNodeList: ({ selectable: boolean } & IngameGraphNode)[];
  selectStartNode: (nodeId: number) => void;
}

export const useWhenMarineStartGame = create<WhenMarineStartGameState>(set => ({
  currentMarinePlayerKey: "1",
  isMarineStartGameTurn: false,
  startMarineTurn: marinePlayerKey => {
    set(state => {
      return {
        ...state,
        isMarineStartGameTurn: true,
        currentMarinePlayerKey: marinePlayerKey,
      };
    });
  },
  selectableStartNodeList: getMarineStartNodeList().map(node => ({
    ...node,
    selectable: true,
  })),
  selectStartNode: nodeId => {
    set(state => {
      const nextSelectableStartNodeList = state.selectableStartNodeList
        .map(node => {
          if (node.nodeId === nodeId) {
            node.selectable = false;
          }
          return node;
        })
        .filter(node => node.selectable);

      return {
        ...state,
        selectableStartNodeList: nextSelectableStartNodeList,
        isMarineStartGameTurn: false,
      };
    });
  },
}));
