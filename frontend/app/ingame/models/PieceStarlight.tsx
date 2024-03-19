import { useEffect, useRef } from "react";
import { PrimitiveProps, useLoader } from "@react-three/fiber";
import { useAnimations } from "@react-three/drei";
import { Mesh } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

interface PieceStarlightProps extends Omit<PrimitiveProps, "object"> {
  // 노드의 x, y, z축 위치를 받아야한다.
}

export default function PieceStarlight({
  position,
  ...props
}: PieceStarlightProps) {
  const mesh = useRef<Mesh>(null);
  const model = useLoader(GLTFLoader, GLTF_PATH1);
  const animations = useAnimations(model.animations, model.scene);

  useEffect(() => {
    const action = animations.actions["Take 001"];
    action?.reset().fadeIn(0.5).play();

    return () => {
      action?.fadeOut(0.5);
    };
  }, [animations]);

  return (
    <mesh
      ref={mesh}
      position={[15, 10, 65]} // TODO: (x, z, y) 인데 일단 시바견 서있는 노드로 해놨음
      scale={15} // node size
      {...props}
    >
      <primitive object={model.scene} />
    </mesh>
  );
}

const GLTF_PATH1 = "/appearance_effect_light_beam/scene.gltf"; // 약간 하늘색
const GLTF_PATH2 = "/appearance_effect_starlight/scene.gltf"; // 흰색
