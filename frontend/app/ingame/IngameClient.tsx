"use client";

import React, { useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import { useControls } from "leva";

import Loading from "./components/Loading";
import Map from "./models/Map";
import Piece from "./models/Piece";

// TODO: Canvas만 로딩됐다고 끝이 아니라 안에 모델, 텍스쳐도 다 로딩이 되어야함.
// 나중에 이 로딩을 상태관리로 만들자.
export default function IngameClient({ gameId }: { gameId: string }) {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <Loading />}
      <Canvas
        camera={{
          fov: 10,
          position: [10, 10, 10],
        }}
        onCreated={() => setLoading(false)}
      >
        <directionalLight position={[1, 1, 1]} />
        <ambientLight position={[0, 100, 10]} />
        <OrbitControls target={[0, 1, 0]} />
        <axesHelper scale={10} />
        <IngameThree />
      </Canvas>
    </>
  );
}

function IngameThree() {
  const { camera } = useThree();

  useControls({
    positionZ: {
      value: 0,
      min: -10,
      max: 10,
      step: 0.1,
      onChange: z => (camera.position.z = z),
    },
    targetZ: {
      value: 0,
      min: -10,
      max: 10,
      step: 0.1,
      onChange: z => camera.lookAt(0, 0, z),
    },
  });

  return (
    <>
      <Piece position={[-1.2, 0, 0]} />
      <Piece position={[1.2, 0, 0]} />
      <Map />
    </>
  );
}
