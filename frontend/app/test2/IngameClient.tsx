"use client";

import React from "react";
import { Canvas } from "@react-three/fiber";
import Model from "./Model";
import {
  OrbitControls,
  CameraControls,
  PerspectiveCamera,
} from "@react-three/drei";

export default function IngameClient() {
  return (
    <>
      <Canvas
        camera={{
          position: [0, 200000, 100000],
          rotation: [Math.PI / 2, 0, 0],
          far: 1000000,
          near: 1000,
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
