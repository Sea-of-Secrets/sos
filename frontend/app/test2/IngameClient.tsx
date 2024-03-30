"use client";

import React from "react";
import { Canvas } from "@react-three/fiber";
import Model from "./Model";
import { OrbitControls, CameraControls } from "@react-three/drei";

export default function IngameClient() {
  return (
    <>
      <Canvas
        camera={{
          position: [0, -20000, 0],
          far: 100000,
          fov: 50,
        }}
      >
        <CameraControls />

        <ambientLight />
        <directionalLight />
        <Model />
        <axesHelper scale={1} />
      </Canvas>
    </>
  );
}
