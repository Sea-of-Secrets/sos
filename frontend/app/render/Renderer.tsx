"use client";

import React, { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { useScreenControl } from "./stores/useScreenControl";

import BackButton from "./components/BackButton";
import LoginButton from "./components/LoginButton";
import MyPageButton from "./components/MyPageButton";

import Map from "./Map";
import Camera from "./Camera";
import Button from "./Button";
import { useGatcha } from "./stores/useGatch";
import useNickname from "~/store/nickname";

export default function Renderer() {
  const [loading, setLoading] = useState(false);
  const { setNickname } = useNickname();
  const { screen } = useScreenControl();
  const { gatchaState } = useGatcha();

  useEffect(() => {
    setNickname("");
  }, []);

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
        <Map />
      </Canvas>
      {loading && <Button />}
      {loading && screen === "MAIN" && <LoginButton />}
      {screen !== "MAIN" &&
        screen !== "FASTMATCHING" &&
        gatchaState === "GATCHA_PREV" && <BackButton />}
      {loading &&
        screen === "MAIN" &&
        (localStorage.getItem("access") === null ? (
          <LoginButton />
        ) : (
          <MyPageButton />
        ))}
      {screen !== "MAIN" && screen !== "FASTMATCHING" && <BackButton />}
    </>
  );
}
