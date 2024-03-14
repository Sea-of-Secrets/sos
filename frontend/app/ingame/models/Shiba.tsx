"use client";

import { useRef } from "react";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { PrimitiveProps } from "@react-three/fiber";

interface EdgeProps extends Omit<PrimitiveProps, "object"> {
  position: number[];
}

export default function Shiba({ position, ...props }: EdgeProps) {
  const fileUrl = "/shiba/scene.gltf";
  const mesh = useRef(null!);
  const gltf = useLoader(GLTFLoader, fileUrl);
  return (
    <mesh
      ref={mesh}
      position={[position[0], 26, position[1]]}
      scale={15}
      rotation={[0, 0, 0]}
      {...props}
    >
      <primitive object={gltf.scene} />
    </mesh>
  );
}
