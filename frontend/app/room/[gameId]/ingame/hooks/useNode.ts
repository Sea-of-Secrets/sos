import { ThreeEvent } from "@react-three/fiber";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

import { IngameGraphNode } from "~/_lib/data/types";
import { gameSocket } from "~/sockets";

import { useWhenMarineStartGame } from "../stores/useWhenMarineStartGame";
import useNickname from "~/store/nickname";
import useGameId from "~/store/gameId";

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
  const { nickname } = useNickname();
  const { gameId } = useGameId();
  const { send } = gameSocket;

  const handleClickNode = useCallback(
    (e: ThreeEvent<MouseEvent>) => {
      if (
        isMarineStartGameTurn &&
        selectableStartNodeList.map(v => v.nodeId).includes(node.nodeId)
      ) {
        const EnglishNumber =
          currentMarinePlayerKey === "1"
            ? "ONE"
            : currentMarinePlayerKey === "2"
              ? "TWO"
              : "THREE";
        send("/pub/init", {
          message: `INIT_MARINE_${EnglishNumber}_START`,
          sender: nickname,
          gameId,
          node: node.nodeId,
        });
        selectStartNode(node.nodeId);
        return;
      }
    },
    [
      isMarineStartGameTurn,
      selectableStartNodeList,
      node.nodeId,
      nickname,
      gameId,
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
    handleClickNode,
    handlePointerOver,
    handlePointerOut,
  };
};
