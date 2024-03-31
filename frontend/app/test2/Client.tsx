"use client";

import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { CameraControls } from "@react-three/drei";
import { DEFAULT_CAMERA_POSITION, useCameraInit } from "./stores/useCamera";

import ThreeRenderer from "./ThreeRenderer";
import MainLoading from "./components/MainLoading";
import TestController from "./TestController";

export default function Client() {
  const { cameraRef } = useCameraInit();
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <MainLoading />}
      <Canvas
        camera={{
          position: [
            DEFAULT_CAMERA_POSITION.x,
            DEFAULT_CAMERA_POSITION.y,
            DEFAULT_CAMERA_POSITION.z,
          ],
          far: 1000000,
          near: 10000,
          fov: 50,
        }}
        onCreated={() => setLoading(false)}
      >
        <CameraControls ref={cameraRef} />
        <ambientLight />
        <directionalLight />
        <axesHelper scale={10000000} />
        <ThreeRenderer />
      </Canvas>
      <TestController />
    </>
  );
}
