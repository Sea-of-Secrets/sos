"use client";

import React, { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";

import IngameThree from "./IngameThree";

import { gameSocket } from "~/sockets";

import useNickname from "~/store/nickname";
import useGameId from "~/store/gameId";

import Loading from "../room/[gameId]/ingame/components/Loading";
import Round from "../room/[gameId]/ingame/components/Round";
import Turn from "../room/[gameId]/ingame/components/Turn";
import SystemPrompt from "../room/[gameId]/ingame/components/SystemPrompt";

import YongSangYoonTestController from "../room/[gameId]/ingame/test-components/YsyTestController";
import { useGameLoading } from "../room/[gameId]/ingame/stores/useGameLoading";

const { connect, send, subscribe, disconnect } = gameSocket;

export default function IngameClient() {
  const { loading, setLoading } = useGameLoading();
  const { nickname } = useNickname();
  const { gameId, setGameId } = useGameId();

  // const [nowNode, setNowNode] = useState();
  // const [nowNodePosition, setNowNodePosition] = useState([]);
  // const [nextMoveableNodes, setNextMoveableNodes] = useState([]);
  // const [nextNodeEdge, setNextNodeEdge] = useState([]);

  const [socketData, setSocketData] = useState<any>();
  const [type, setType] = useState("미정");
  const [treasures, setTreasures] = useState([]);
  const [pirateRoute, setPirateRoute] = useState([]);
  const [marineOneRoute, setMarineOneRoute] = useState([]);
  const [marineTwoRoute, setMarineTwoRoute] = useState([]);
  const [marineThreeRoute, setMarineThreeRoute] = useState([]);
  const [turn, setTurn] = useState(1);
  const [round, setRound] = useState(1);

  return (
    <>
      {loading && <Loading />}
      <Round topLeft={[60, 1]} />
      <Turn topLeft={[360, 1]} currentTurn={1} />
      <SystemPrompt />
      <Canvas
        camera={{
          position: [0, 800, 500],
          far: 10000,
          fov: 50,
        }}
        onCreated={() => {
          setLoading(false);
          // send("/pub/room", {
          //   message: "RENDERED_COMPLETE",
          //   sender: nickname,
          //   gameId,
          // });
        }}
      >
        <IngameThree
        // nextMoveableNodes={nextMoveableNodes}
        // nextNodeEdge={nextNodeEdge}
        />
      </Canvas>
      {/* <EjjTestController
        newMoveableNodes={newMoveableNodes}
        setNextMoveableNodes={setNextMoveableNodes}
        newNodeEdge={newNodeEdge}
        setNextNodeEdge={setNextNodeEdge}
      /> */}
      <YongSangYoonTestController />
    </>
  );
}
