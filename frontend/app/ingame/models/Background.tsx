import React, { useRef } from "react";
import * as THREE from "three";
import { useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { useThree } from "@react-three/fiber";

import { Color, AdditiveBlending } from "three";

//import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

import { shaderMaterial, useGLTF, useTexture } from "@react-three/drei";

interface BackgroudProps {
  glbPath: string;
}

export default function Background({ glbPath }: BackgroudProps) {
  const portalMaterial = useRef<any>();
  const texture = useTexture("/oldmap/textures/texture.jpeg");
  const { nodes, materials } = useGLTF(glbPath);

  console.log(nodes);

  useFrame((state, delta) => {
    if (portalMaterial.current) {
      portalMaterial.current.uTime += delta;
    }
  });

  return (
    <group dispose={null}>
      <meshBasicMaterial map={texture} map-flipY={false} />
    </group>
  );
}
