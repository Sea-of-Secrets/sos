"use client";

import React, { useState } from "react";
import styled from "@emotion/styled";
import { Canvas } from "@react-three/fiber";

import Timer from "../room/[gameId]/ingame/components/Timer";
import Loading from "../room/[gameId]/ingame/components/Loading";
import Round from "../room/[gameId]/ingame/components/Round";
import Turn from "../room/[gameId]/ingame/components/Turn";
import SystemPrompt from "../room/[gameId]/ingame/components/SystemPrompt";

import { useGameLoading } from "../room/[gameId]/ingame/stores/useGameLoading";

import IngameThree from "./IngameThree";
import TestController from "./TestController";
import Chat from "../room/[gameId]/ingame/components/Chat";
import OptionButton from "../room/[gameId]/ingame/components/OptionButton";
import Docs from "../room/[gameId]/ingame/components/Docs";

export default function IngameClient() {
  // const { loading, setLoading } = useGameLoading();

  const [showTestController, setShowTestController] = useState(false);

  return (
    <>
      <TestControllerShowButton
        onClick={() => setShowTestController(prev => !prev)}
      >
        TestController 켜기 / 끄기
      </TestControllerShowButton>
      <Timer />
      {/* {loading && <Loading />} */}
      {/* <Round topLeft={[200, 1]} />
      <Turn topLeft={[500, 1]} currentTurn={1} /> */}
      <Round topLeft={[60, 1]} />
      <Turn topLeft={[360, 1]} currentTurn={1} />
      <SystemPrompt />
      <Canvas
        camera={{
          position: [0, 800, 500],
          far: 10000,
          fov: 50,
        }}
        // onCreated={() => setLoading(false)}
      >
        <IngameThree />
      </Canvas>
      {showTestController && <TestController />}
      {/* <Chat />
      <OptionButton />
      <Docs /> */}
    </>
  );
}

const TestControllerShowButton = styled.button`
  position: absolute;
  top: 0;
  left: 0;
  width: 200px;
  background-color: white;
  z-index: 999;
`;
