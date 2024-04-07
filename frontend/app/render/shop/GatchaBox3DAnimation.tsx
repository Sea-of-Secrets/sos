import { useEffect } from "react";
import { useAnimations, useGLTF } from "@react-three/drei";
import { LoopOnce, LoopRepeat } from "three";
import { useRandomGatcha } from "../stores/useRandomGatcha";

export default function GatchaBox3DAnimation() {
  const { scene, animations } = useGLTF("/gatcha_box/scene.gltf");
  const { actions } = useAnimations(animations, scene);
  const { loading } = useRandomGatcha();

  useEffect(() => {
    const action2 = actions["ChestBody|Chest_Shake"];
    if (loading && action2) {
      action2.setLoop(LoopRepeat, 10).play().setDuration(1);
      // action2.reset().setDuration(3).play().setLoop(LoopOnce, 0);
      return;
    }

    if (action2) {
      action2.fadeOut(0.5);
    }

    const action3 = actions["Chest_Up|Chest_Open_Close"];
    if (action3) {
      action3.setLoop(LoopOnce, 1).play().setDuration(2);
    }
  }, [loading, actions]);

  return (
    <mesh
      rotation={[-Math.PI / 5, -44.5, 0]}
      position={[-50000, 119900, -168600]}
      scale={600}
    >
      <primitive object={scene} />
    </mesh>
  );
}
