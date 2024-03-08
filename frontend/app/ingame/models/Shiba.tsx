"use client";

import { useRef } from "react";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { Mesh } from "three";

export default function Shiba() {
  const fileUrl = "/shiba/scene.gltf";
  const mesh = useRef<Mesh>(null!);
  const gltf = useLoader(GLTFLoader, fileUrl);
  return (
    <mesh ref={mesh} position={[0, 3, 0]} scale={1}>
      <primitive object={gltf.scene} />
    </mesh>
  );
}
