import { useEffect } from "react";
import { useAnimations, useGLTF } from "@react-three/drei";
import { LoopRepeat } from "three";
import { useRandomGatcha } from "./useFetchGatcha";

export default function GatchaBox3DAnimation() {
  const { scene, animations } = useGLTF("/gatcha_box/scene.gltf");
  const { actions } = useAnimations(animations, scene);
  const { loading } = useRandomGatcha();

  useEffect(() => {
    const action2 = actions["ChestBody|Chest_Shake"];
    if (action2) {
      action2.setLoop(LoopRepeat, 10).play().setDuration(1);
      // action2.reset().setDuration(3).play().setLoop(LoopOnce, 0);
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
