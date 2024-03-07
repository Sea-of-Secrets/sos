"use client";

import React, { useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import Loading from "./components/Loading";
import Box from "./models/Box";
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

interface IngameClientProps {
  gameId: string;
}

export default function IngameClient({ gameId }: IngameClientProps) {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <Loading />}
      <Canvas
        camera={{
          position: [0, 10, 5],
        }}
        onCreated={() => setLoading(false)}
      >
        <IngameThree />
      </Canvas>
    </>
  );
}

function IngameThree() {
  const { scene } = useThree();

  return (
    <>
      <Box position={[-1.2, 0, 0]} />
      <Box position={[1.2, 0, 0]} />
    </>
  );
}
