import { ThreeEvent } from "@react-three/fiber";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

import { IngameGraphNode } from "~/_lib/data/types";
import { useWhenMarineStartGame } from "../stores/useWhenMarineStartGame";
import { useSystemPrompt } from "../stores/useSystemPrompt";

export const useNode = ({ node }: { node: IngameGraphNode }) => {
  const position: [number, number, number] = useMemo(
    () => [node.position.x, node.position.z, node.position.y],
    [node],
  );
  const meshRef = useRef<THREE.Mesh>(null);
  const [isHover, setIsHover] = useState(false);

  const {
    isMarineStartGameTurn,
    selectStartNode,
    selectableStartNodeList,
    currentMarinePlayerKey,
  } = useWhenMarineStartGame();
  const { setHeaderMessage } = useSystemPrompt();

  const handleClickPiece = useCallback(
    (e: ThreeEvent<MouseEvent>) => {
      if (
        isMarineStartGameTurn &&
        selectableStartNodeList.map(v => v.nodeId).includes(node.nodeId)
      ) {
        setHeaderMessage(
          `해군 ${currentMarinePlayerKey}이 ${node.nodeId}를 선택했습니다.`,
        );
        selectStartNode(node.nodeId);
        return;
      }
    },
    [
      currentMarinePlayerKey,
      isMarineStartGameTurn,
      setHeaderMessage,
      node,
      selectableStartNodeList,
      selectStartNode,
    ],
  );

  const handlePointerOver = useCallback(() => {
    setIsHover(true);
  }, []);

  const handlePointerOut = useCallback(() => {
    setIsHover(false);
  }, []);

  useEffect(() => {
    if (isHover) {
      document.querySelector("canvas")!.style.cursor = "pointer";
    } else {
      document.querySelector("canvas")!.style.cursor = "default";
    }
  }, [isHover]);

  return {
    position,
    meshRef,
    isHover,
    handleClickPiece,
    handlePointerOver,
    handlePointerOut,
  };
};
