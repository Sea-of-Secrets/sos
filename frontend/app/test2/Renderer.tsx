"use client";

import React from "react";
import { Canvas } from "@react-three/fiber";
import Map from "./Map";
import Camera from "./Camera";
import TestController from "./TestController";

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
        <Camera />
        <ambientLight intensity={5} color="#ffffff" />
        <Map />
      </Canvas>
      <TestController />
    </>
  );
}
