import React from "react";
import { PrimitiveProps, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export default function Map({ ...props }: Omit<PrimitiveProps, "object">) {
  const gltf = useLoader(GLTFLoader, MAP_PATH);
  return <primitive object={gltf.scene} {...props} />;
}

const MAP_PATH = "/cartoon_low_poly_world_map/scene.gltf";
