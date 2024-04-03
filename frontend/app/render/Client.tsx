"use client";

import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { CameraControls } from "@react-three/drei";
import { DEFAULT_CAMERA_POSITION, useCameraInit } from "./stores/useCamera";

import * as THREE from "three";

import ThreeRenderer from "./ThreeRenderer";
import MainLoading from "./components/MainLoading";

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
        onCreated={({ gl, scene }) => {
          scene.background = new THREE.Color("skyblue"); // 내츄럴 스카이블루
          // scene.background = new THREE.Color('#56bebc'); // 티파니 에메랄드
          setLoading(false);
        }}
      >
        <CameraControls ref={cameraRef} />
        <ambientLight />
        <directionalLight />
        {/* <axesHelper scale={10000000} /> */}
        <ThreeRenderer />
      </Canvas>
    </>
  );
}
