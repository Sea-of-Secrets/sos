"use client";

import React, { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import Index from "./index";

import RoomMap from "./RoomMap";
import { CameraControls } from "@react-three/drei";
import { useCamera } from "./stores/useCamera";

export default function Renderer() {
  const cameraRef = useRef<CameraControls>(null!);
  const { setCamera } = useCamera();
  const [loading, setLoading] = useState(false);

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
      <CameraControls ref={cameraRef} />
      <ambientLight intensity={3} color="#ffffff" />
      <RoomMap />
    </Canvas>
  );
}
