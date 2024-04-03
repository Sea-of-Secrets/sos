"use client";

import React, { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { useScreenControl } from "./stores/useScreenControl";

import BackButton from "./components/BackButton";
import LoginButton from "./components/LoginButton";

import Map from "./Map";
import Button from "./Button";
import { useGatcha } from "./stores/useGatch";
import useNickname from "~/store/nickname";
import { getAccessToken, useAuth } from "~/store/auth";
import { CameraControls } from "@react-three/drei";
import { useCamera } from "./stores/useCamera";

export default function Renderer() {
  const cameraRef = useRef<CameraControls>(null!);
  const { setCamera, mainScreen } = useCamera();
  const [loading, setLoading] = useState(false);
  const { setNickname } = useNickname();
  const { screen } = useScreenControl();
  const { gatchaState } = useGatcha();

  useEffect(() => {
    setCamera(cameraRef);
    setNickname("");
  }, [setNickname, setCamera]);

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
        <CameraControls ref={cameraRef} />
        <ambientLight />
        <Map />
      </Canvas>
      {loading && <Button />}
      {loading && screen === "MAIN" && <LoginButton />}
      {screen !== "MAIN" &&
        screen !== "FASTMATCHING" &&
        gatchaState === "GATCHA_PREV" && <BackButton />}
      {loading && screen === "MAIN" && <LoginButton />}
      {screen !== "MAIN" && screen !== "FASTMATCHING" && <BackButton />}
    </>
  );
}
