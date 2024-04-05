"use client";

import React, { useEffect, useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { useScreenControl } from "./stores/useScreenControl";

import BackButton from "./components/BackButton";
import LoginButton from "./components/LoginButton";

import Map from "./Map";
import GatchaAnimation from "./shop/OpenAnimation";
import Camera from "./Camera";
import Button from "./Button";
import { useGatcha } from "./stores/useGatch";
import useNickname from "~/store/nickname";
import { getAccessToken, useAuth } from "~/store/auth";
import { Html, useProgress } from "@react-three/drei";
import ThreeRenderer from "./ThreeRenderer";

export default function Renderer() {
  const [loading, setLoading] = useState(false);
  const { setNickname } = useNickname();
  const { screen } = useScreenControl();
  const { gatchaState } = useGatcha();

  useEffect(() => {
    setNickname("");
  }, [setNickname]);

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
        <ambientLight />
        <GatchaAnimation />
        <Map />
      </Canvas>
      {loading && <Button />}
      {loading && screen === "MAIN" && <LoginButton />}
      {screen !== "MAIN" &&
        screen !== "FASTMATCHING" &&
        screen !== "START" &&
        gatchaState === "GATCHA_PREV" && <BackButton />}
      {screen !== "MAIN" && screen !== "FASTMATCHING" && screen !== "START" && (
        <BackButton />
      )}
    </>
  );
}
