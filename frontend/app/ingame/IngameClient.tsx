"use client";

import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import Loading from "./components/Loading";
import Map from "./models/Map";

// TODO: Canvas만 로딩됐다고 끝이 아니라 안에 모델, 텍스쳐도 다 로딩이 되어야함.
// 나중에 이 로딩을 상태관리로 만들자.
export default function IngameClient({ gameId }: { gameId: string }) {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <Loading />}
      <Canvas
        camera={{ position: [0, 1000, 500], far: 10000, fov: 50 }}
        onCreated={() => setLoading(false)}
      >
        <directionalLight position={[1, 1, 1]} />
        <ambientLight intensity={2} />
        <OrbitControls target={[0, 1, 0]} />
        <axesHelper scale={10} />
        <IngameThree />
      </Canvas>
    </>
  );
}

function IngameThree() {
  return (
    <>
      {/* 여기에 Edges를 띄운다.. */}
      {/* 여기에 Nodes를 띄운다.. */}
      <Map />
    </>
  );
}
