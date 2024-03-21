import { useEffect, useRef } from "react";
import { useLoader } from "@react-three/fiber";
import { useAnimations } from "@react-three/drei";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

import { PieceEffectPath } from "~/assetPath";
import { PieceEffectProps, PieceEffectType } from "./types";

export default function PieceEffect({
  type,
  position,
  ...props
}: PieceEffectProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const model = useLoader(GLTFLoader, getGltfPath(type));
  const scale = 15; // 이것도 커스텀 가능하게...

  // 애니메이션도 가능하게...
  const animations = useAnimations(model.animations, model.scene);

  console.log(animations);

  useEffect(() => {
    const action = animations.actions["Take 001"];
    action?.reset().fadeIn(0.5).play();
    return () => {
      action?.fadeOut(0.5);
    };
  }, [animations]);

  return (
    <mesh
      ref={meshRef}
      position={[position[0], position[2], position[1]]}
      scale={scale} // node size
      {...props}
    >
      <primitive object={model.scene} />
    </mesh>
  );
}

const getGltfPath = (pieceEffectType: PieceEffectType) => {
  if (pieceEffectType === "FOOTHOLD") {
    return PieceEffectPath["FOOTHOLD_LIGHT_BEAM"];
  }

  // default...
  return PieceEffectPath["FOOTHOLD_LIGHT_BEAM"];
};
