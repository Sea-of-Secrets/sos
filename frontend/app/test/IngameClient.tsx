"use client";

import React from "react";
import { Canvas } from "@react-three/fiber";

import Timer from "../room/[gameId]/ingame/components/Timer";
import Loading from "../room/[gameId]/ingame/components/Loading";
import Round from "../room/[gameId]/ingame/components/Round";
import Turn from "../room/[gameId]/ingame/components/Turn";
import SystemPrompt from "../room/[gameId]/ingame/components/SystemPrompt";

import { useGameLoading } from "../room/[gameId]/ingame/stores/useGameLoading";

import IngameThree from "./IngameThree";
import TestController from "./TestController";

export default function IngameClient() {
  const { loading, setLoading } = useGameLoading();

  return (
    <>
      {/* <Timer /> */}
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
        <IngameThree />
      </Canvas>
      <TestController />
    </>
  );
}
