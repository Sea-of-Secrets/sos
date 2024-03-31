"use client";

import React, { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import Model from "./Model";
import {
  OrbitControls,
  CameraControls,
  PerspectiveCamera,
} from "@react-three/drei";
import IngameThree from "./IngameThree";
import { useCamera } from "./useCamera";
import Loading from "../room/[gameId]/ingame/components/Loading";

export default function IngameClient() {
  const [loading, setLoading] = useState(true);
  const cameraRef = useRef<CameraControls>(null!);
  const { camera, setCamera } = useCamera();

  useEffect(() => {
    setCamera(cameraRef);
  }, [setCamera]);

  return (
    <>
      {loading && <Loading />}
      <Canvas
        camera={{
          position: [30000, 30000, -200000],
          far: 1000000,
          near: 10000,
          fov: 40,
        }}
        onCreated={() => setLoading(false)}
      >
        <CameraControls ref={cameraRef} />
        <ambientLight />
        <directionalLight />
        <axesHelper scale={10000000} />
        <IngameThree />
      </Canvas>
    </>
  );
}
