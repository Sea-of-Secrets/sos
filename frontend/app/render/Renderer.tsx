"use client";

import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";

import { useScreenControl } from "./stores/useScreenControl";

import BackButton from "./components/BackButton";
import LoginButton from "./components/LoginButton";

import Map from "./Map";
import Camera from "./Camera";
import Button from "./Button";
import { OrbitControls } from "@react-three/drei";

export default function Renderer() {
  const [loading, setLoading] = useState(false);
  const { screen } = useScreenControl();
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
        onCreated={({ gl, scene }) => {
          scene.background = new THREE.Color("#AED7DD");
          setLoading(true);
        }}
      >
        <Camera />
        <ambientLight intensity={5} color="#ffffff" />
        <Map />
      </Canvas>
      {loading && <Button />}
      {loading && screen === "MAIN" && <LoginButton />}
      {screen !== "MAIN" && screen !== "FASTMATCHING" && <BackButton />}
    </>
  );
}
