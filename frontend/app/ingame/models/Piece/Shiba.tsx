import { useRef, useEffect } from "react";
import { useLoader } from "@react-three/fiber";
import { Mesh } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

import usePiece from "~/store/piece";
import { PieceProps } from "./types";

export default function Shiba({ position, ...props }: PieceProps) {
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
      position={[position.x, position.z, position.y]}
      scale={15}
      {...props}
    >
      <primitive object={gltf.scene} />
    </mesh>
  );
}
