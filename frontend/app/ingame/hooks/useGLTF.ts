import { useEffect, useRef, useState } from "react";
import { useLoader, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export const useGLTF = ({ src }: { src: string }) => {
  const [model, setModel] = useState<THREE.Mesh | null>(null);
  const meshRef = useRef<THREE.Mesh>(null!);
  const gltf = useLoader(GLTFLoader, src);

  useEffect(() => {
    setModel(meshRef.current);
  }, []);

  //   useFrame((state, delta) => (meshRef.current.rotation.x += delta));

  return {
    model,
    meshRef,
    gltf,
  };
};
