"use client";

import React, { useEffect, useState, Suspense, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { useScreenControl } from "./stores/useScreenControl";

import BackButton from "./components/BackButton";
import LoginButton from "./components/LoginButton";

import Map from "./Map";
import GatchaBox3DAnimation from "./shop/GatchaBox3DAnimation";
import Camera from "./Camera";
import Button from "./Button";
import { useGatcha } from "./stores/useGatch";
import useNickname from "~/store/nickname";
import { useRandomGatcha } from "./stores/useRandomGatcha";

export default function Renderer() {
  const [loading, setLoading] = useState(false);
  const { setNickname } = useNickname();
  const { screen } = useScreenControl();
  const { gatchaState } = useGatcha();
  const { loading: randomGatchaLoading } = useRandomGatcha();

  const isShowBackButton = useMemo(() => {
    if (randomGatchaLoading) {
      return false;
    }

    if (screen !== "MAIN" && screen !== "FASTMATCHING" && screen !== "START") {
      return true;
    }

    if (
      screen !== "MAIN" &&
      screen !== "FASTMATCHING" &&
      screen !== "START" &&
      gatchaState === "GATCHA_PREV"
    ) {
      return true;
    }

    return false;
  }, [gatchaState, screen, randomGatchaLoading]);

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
        {gatchaState !== "GATCHA_PREV" && <GatchaBox3DAnimation />}
        <Camera />
        <ambientLight />
        <Map />
      </Canvas>
      {loading && <Button />}
      {loading && screen === "MAIN" && <LoginButton />}
      {isShowBackButton && <BackButton />}
    </>
  );
}
