"use client";

import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import Loading from "./components/Loading";
import Box from "./models/Box";
import Background from "./models/Background";
import { OrbitControls } from "@react-three/drei";
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

interface IngameClientProps {
  gameId: string;
}

// TODO: Canvas만 로딩됐다고 끝이 아니라 안에 모델, 텍스쳐도 다 로딩이 되어야함.
// 나중에 이 로딩을 상태관리로 만들자.
export default function IngameClient({ gameId }: IngameClientProps) {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <Loading />}
      <Canvas
        camera={{
          position: [0, 10, 5],
        }}
        onCreated={() => setLoading(false)}
      >
        <directionalLight position={[0, 100, 10]} />
        <ambientLight position={[0, 100, 10]} />
        <OrbitControls target={[0, 1, 0]} />
        <IngameThree />
      </Canvas>
    </>
  );
}

function IngameThree() {
  return (
    <>
      <Box position={[-1.2, 0, 0]} />
      <Box position={[1.2, 0, 0]} />
      <Background glbPath="/oldmap/scene.gltf" />
    </>
  );
}
