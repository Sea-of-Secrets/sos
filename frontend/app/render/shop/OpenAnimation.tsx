import { useEffect, useState } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useGatcha } from "../stores/useGatch";

export default function Open() {
  const { gatchaState, setGatchaState } = useGatcha();
  const { scene, animations } = useGLTF("/gatcha/scene.gltf");
  const { actions } = useAnimations(animations, scene);
  const [animationPlayed, setAnimationPlayed] = useState(false);

  useEffect(() => {
    if (gatchaState === "GATCHA_READY") {
      const action = actions["Take 001"];
      if (action) {
        action.clampWhenFinished = true;
        action.startAt(2).setDuration(3).play().halt(2);
      }
    }
  }, [gatchaState]);

  let visible = gatchaState === "GATCHA_READY";

  return (
    <mesh
      rotation={[-Math.PI / 6, 0, 0]}
      position={[-50000, 119000, -155000]}
      scale={500}
      visible={visible}
    >
      <primitive object={scene} />
    </mesh>
  );
}
