"use client";

import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";

import { useCamera } from "./stores/useCamera";
import { useScreenControl } from "./stores/useScreenControl";

import BackButton from "./components/BackButton";

import Map from "./Map";
import Camera from "./Camera";
import Button from "./Button";

export default function Renderer() {
  const [loading, setLoading] = useState(false);
  const { cameraRef, mainScreen } = useCamera();
  const { screen, setScreen, setMainScreen } = useScreenControl();
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
        onCreated={() => setLoading(true)}
      >
        <Camera />
        <ambientLight intensity={5} color="#ffffff" />
        <Map />
      </Canvas>
      {loading && <Button />}
      {screen !== "MAIN" && screen !== "FASTMATCHING" && <BackButton />}
    </>
  );
}
