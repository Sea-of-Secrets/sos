import { useEffect } from "react";
import { useAnimations } from "@react-three/drei";

import { PieceEffectPathMap } from "~/assetPath";
import { PieceEffectProps } from "./types";
import { useGLTF } from "../../hooks/useGLTF";

const ACTION_NAME = "Take 001";
const DEFAULT_SCALE = 15;

export default function PieceEffect({
  effectName,
  position,
  ...props
}: PieceEffectProps) {
  const { meshRef, gltf } = useGLTF(PieceEffectPathMap[effectName]);

  const animations = useAnimations(gltf.animations, gltf.scene);

  useEffect(() => {
    const action = animations.actions[ACTION_NAME];
    action?.reset().fadeIn(0.5).play();

    return () => {
      action?.fadeOut(0.5);
    };
  }, [animations]);

  return (
    <mesh
      ref={meshRef}
      position={[position.x, position.z, position.y]}
      scale={DEFAULT_SCALE} // node size
      {...props}
    >
      <primitive object={gltf.scene} />
    </mesh>
  );
}
