import * as THREE from "three";
import React, { useRef } from "react";
import { PrimitiveProps, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

type MapProps = Omit<PrimitiveProps, "object">;

export default function Map({ ...props }: MapProps) {
  const mesh = useRef<THREE.Mesh>(null);
  const gltf = useLoader(GLTFLoader, MAP_PATH);

  return (
    <>
      <mesh ref={mesh} position={[200, -50, 100]} scale={2000}>
        <primitive object={gltf.scene} {...props} />
      </mesh>
    </>
  );
}

const MAP_PATH = "/cartoon_low_poly_world_map/scene.gltf";
