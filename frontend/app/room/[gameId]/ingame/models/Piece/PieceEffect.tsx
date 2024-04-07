import { useEffect } from "react";
import { useAnimations } from "@react-three/drei";

import { PieceEffectPathMap } from "~/assetPath";
import { PieceEffectProps } from "./types";
import { useGLTF } from "../../hooks/useGLTF";
import { useSocketMessage } from "../../stores/useSocketMessage";
import useNickname from "~/store/nickname";

const ACTION_NAME = "Take 001";
const DEFAULT_SCALE = 20;

export default function PieceEffect({
  effectName,
  position,
  ...props
}: PieceEffectProps) {
  const { meshRef, gltf } = useGLTF(PieceEffectPathMap[effectName]);

  const animations = useAnimations(gltf.animations, gltf.scene);
  const { socketMessage } = useSocketMessage();
  const { nickname } = useNickname();

  useEffect(() => {
    const action = animations.actions[ACTION_NAME];
    action?.reset().fadeIn(0.5).play();

    return () => {
      action?.fadeOut(0.5);
    };
  }, [animations]);

  let visible = true;
  if (
    effectName === "GOLD_EFFECT1" &&
    socketMessage?.game?.players[0]?.nickname !== nickname
  ) {
    visible = false;
  }

  return (
    <mesh
      visible={visible}
      ref={meshRef}
      position={position ? [position.x, position.z, position.y] : undefined}
      scale={DEFAULT_SCALE} // node size
      {...props}
    >
      <primitive object={gltf.scene} />
    </mesh>
  );
}
