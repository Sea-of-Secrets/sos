import { ThreeEvent } from "@react-three/fiber";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

import { IngameGraphNode } from "~/_lib/data/types";
import { gameSocket } from "~/sockets";

import { useWhenMarineStartGame } from "../stores/useWhenMarineStartGame";
import useNickname from "~/store/nickname";
import useGameId from "~/store/gameId";
import { useSocketMessage } from "../stores/useSocketMessage";

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
  const { socketMessage } = useSocketMessage();
  const { send } = gameSocket;

  const handleClickNode = useCallback(
    (e: ThreeEvent<MouseEvent>) => {
      // console.log(`${node.nodeId}번 노드 클릭`);

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
      if (
        socketMessage.message === "ORDER_MOVE_PIRATE" &&
        socketMessage.game.players[0]["nickname"] === nickname &&
        Object.keys(socketMessage.availableNode)
          .map(Number)
          .includes(node.nodeId)
      ) {
        send("/pub/game", {
          message: "MOVE_PIRATE",
          sender: nickname,
          gameId,
          node: node.nodeId,
        });
        return;
      }
      if (
        socketMessage.message === "ORDER_MOVE_MARINE_ONE" &&
        socketMessage.game.players[1]["nickname"] === nickname &&
        Object.keys(socketMessage.availableNode)
          .map(Number)
          .includes(node.nodeId)
      ) {
        send("/pub/game", {
          message: "MOVE_MARINE_ONE",
          sender: nickname,
          gameId,
          node: node.nodeId,
        });
        return;
      }
      if (
        socketMessage.message === "ORDER_MOVE_MARINE_TWO" &&
        socketMessage.game.players[2]["nickname"] === nickname &&
        Object.keys(socketMessage.availableNode)
          .map(Number)
          .includes(node.nodeId)
      ) {
        send("/pub/game", {
          message: "MOVE_MARINE_TWO",
          sender: nickname,
          gameId,
          node: node.nodeId,
        });
        return;
      }
      if (
        socketMessage.message === "ORDER_MOVE_MARINE_THREE" &&
        socketMessage.game.players[3]["nickname"] === nickname &&
        Object.keys(socketMessage.availableNode)
          .map(Number)
          .includes(node.nodeId)
      ) {
        send("/pub/game", {
          message: "MOVE_MARINE_THREE",
          sender: nickname,
          gameId,
          node: node.nodeId,
        });
        return;
      }
      if (
        socketMessage.message === "ORDER_INVESTIGATE_MARINE_ONE" &&
        socketMessage.game.players[1]["nickname"] === nickname &&
        Object.entries(socketMessage.game.investigate.nodes)
          .filter(([key, value]) => value === false)
          .map(([key, value]) => Number(key))
          .includes(node.nodeId)
      ) {
        send("/pub/game", {
          message: "INVESTIGATE_MARINE_ONE",
          sender: nickname,
          gameId,
          node: node.nodeId,
        });
        return;
      }
      if (
        socketMessage.message === "ORDER_INVESTIGATE_MARINE_TWO" &&
        socketMessage.game.players[2]["nickname"] === nickname &&
        Object.entries(socketMessage.game.investigate.nodes)
          .filter(([key, value]) => value === false)
          .map(([key, value]) => Number(key))
          .includes(node.nodeId)
      ) {
        send("/pub/game", {
          message: "INVESTIGATE_MARINE_TWO",
          sender: nickname,
          gameId,
          node: node.nodeId,
        });
        return;
      }
      if (
        socketMessage.message === "ORDER_INVESTIGATE_MARINE_THREE" &&
        socketMessage.game.players[3]["nickname"] === nickname &&
        Object.entries(socketMessage.game.investigate.nodes)
          .filter(([key, value]) => value === false)
          .map(([key, value]) => Number(key))
          .includes(node.nodeId)
      ) {
        send("/pub/game", {
          message: "INVESTIGATE_MARINE_THREE",
          sender: nickname,
          gameId,
          node: node.nodeId,
        });
        return;
      }
      if (
        socketMessage.message === "ORDER_ARREST_MARINE_ONE" &&
        socketMessage.game.players[1]["nickname"] === nickname &&
        socketMessage.arrestableNode.includes(node.nodeId)
      ) {
        send("/pub/game", {
          message: "ARREST_MARINE_ONE",
          sender: nickname,
          gameId,
          node: node.nodeId,
        });
        return;
      }
      if (
        socketMessage.message === "ORDER_ARREST_MARINE_TWO" &&
        socketMessage.game.players[2]["nickname"] === nickname &&
        socketMessage.arrestableNode.includes(node.nodeId)
      ) {
        send("/pub/game", {
          message: "ARREST_MARINE_TWO",
          sender: nickname,
          gameId,
          node: node.nodeId,
        });
        return;
      }
      if (
        socketMessage.message === "ORDER_ARREST_MARINE_THREE" &&
        socketMessage.game.players[3]["nickname"] === nickname &&
        socketMessage.arrestableNode.includes(node.nodeId)
      ) {
        send("/pub/game", {
          message: "ARREST_MARINE_THREE",
          sender: nickname,
          gameId,
          node: node.nodeId,
        });
        return;
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      isMarineStartGameTurn,
      selectableStartNodeList,
      node.nodeId,
      nickname,
      gameId,
      selectStartNode,
      socketMessage,
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
