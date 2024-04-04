"use client";

import React, { Suspense, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";

import Camera from "./Camera";
import RoomMap from "./RoomMap";
import { CameraControls, Html, useProgress } from "@react-three/drei";
import { useCamera } from "./stores/useCamera";
import Loading from "./ingame/components/Loading";

export default function Renderer() {
  const cameraRef = useRef<CameraControls>(null!);
  const { setCamera } = useCamera();
  const [loading, setLoading] = useState(false);

  const Loader = () => {
    const { active, progress, errors, item, loaded, total } = useProgress();
    return (
      <Html center>
        <Loading>{progress}%</Loading>
      </Html>
    );
  };

  useEffect(() => {
    setCamera(cameraRef);
  }, [setCamera]);

  return (
    <Canvas
      camera={{
        position: [0, 5, 5],
        far: 1000,
        fov: 50,
      }}
      onCreated={() => {
        setLoading(true);
      }}
    >
      <Suspense fallback={<Loader />}>
        <Camera />
        <ambientLight intensity={3} color="#ffffff" />
        <RoomMap />
      </Suspense>
    </Canvas>
  );
}
