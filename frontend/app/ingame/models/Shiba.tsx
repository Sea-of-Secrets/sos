"use client";

import { useRef, useEffect } from "react";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { PrimitiveProps } from "@react-three/fiber";
import { Mesh } from "three";
import usePiece from "~/store/piece";

interface EdgeProps extends Omit<PrimitiveProps, "object"> {
  position: [number, number];
}

export default function Shiba({ position, ...props }: EdgeProps) {
  const fileUrl = "/shiba/scene.gltf";
  const mesh = useRef<Mesh>(null!);
  const gltf = useLoader(GLTFLoader, fileUrl);
  const { setPirate } = usePiece();

  useEffect(() => {
    setPirate(mesh.current);
    return () => setPirate(null);
  }, []);

  return (
    <mesh
      ref={mesh}
      position={[position[0], 26, position[1]]}
      scale={15}
      {...props}
    >
      <primitive object={gltf.scene} />
    </mesh>
  );
}
