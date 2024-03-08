import React from "react";
import { PrimitiveProps, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export default function Background({
  ...props
}: Omit<PrimitiveProps, "object">) {
  const gltf = useLoader(GLTFLoader, BACKGROUND_PATH);
  return <primitive object={gltf.scene} {...props} />;
}

const BACKGROUND_PATH = "/cartoon_low_poly_world_map/scene.gltf";
