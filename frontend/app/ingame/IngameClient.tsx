"use client";

import React, { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";

import IngameThree from "./IngameThree";
import Loading from "./components/Loading";
import Round from "./components/Round";
import Turn from "./components/Turn";
import SystemPrompt from "./components/SystemPrompt";

import { gameSocket } from "~/sockets";
import { useGameLoading } from "./stores/useGameLoading";
import EjjTestController from "./test-components/EjjTestController";
import YsyTestController from "./test-components/YsyTestController";

const { connect, send, subscribe, disconnect } = gameSocket;

export default function IngameClient({ gameId }: { gameId: string }) {
  const { loading, setLoading } = useGameLoading();

  // const [nowNode, setNowNode] = useState();
  // const [nowNodePosition, setNowNodePosition] = useState([]);
  // const [nextMoveableNodes, setNextMoveableNodes] = useState([]);
  // const [nextNodeEdge, setNextNodeEdge] = useState([]);

  // // 소켓 통신을 통해 받게 될 데이터
  // const newMoveableNodes = [89, 106, 108, 126, 127, 128];
  // const newNodeEdge = [
  //   [107, 309],
  //   [309, 106],
  // ];

  useEffect(() => {
    connect;
    return () => {
      disconnect;
    };
  }, []);

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
        onCreated={() => setLoading(false)}
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
      <YsyTestController />
    </>
  );
}
