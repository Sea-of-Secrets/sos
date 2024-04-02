import { useEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";

export default function RoomMap() {
  const { scene, animations } = useGLTF(MAP_PATH);
  const { actions } = useAnimations(animations, scene);

  useEffect(() => {
    const action = actions.Animation;
    if (action) {
      action.play();
    }
  }, [actions]);
  return (
    <>
      <mesh scale={1} position={[0, 0, 0]}>
        <primitive object={scene} />
      </mesh>
    </>
  );
}

const MAP_PATH = "/treasure_island/scene.gltf";
