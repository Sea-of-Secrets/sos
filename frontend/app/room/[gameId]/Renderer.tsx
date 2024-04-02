"use client";

import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import Index from "./index";

import Camera from "./Camera";
import RoomMap from "./RoomMap";

export default function Renderer() {
  const [loading, setLoading] = useState(false);

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
      <Camera />
      <ambientLight intensity={3} color="#ffffff" />
      <RoomMap />
    </Canvas>
  );
}
