import { useEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { PieceProps } from "./types";

export default function TreasureRenderer({
  position,
  url,
  nodeId,
  ...props
}: PieceProps & { url: string }) {
  const { scene: originalScene, animations } = useGLTF(url);
  const clonedScene = originalScene.clone();

  const { actions } = useAnimations(animations, clonedScene);

  useEffect(() => {
    const action = actions.Scene;
    if (action) {
      action.timeScale = 0;
      action.time = 0;
      action.play();
    }
  }, []);

  return (
    <mesh
      {...props}
      position={[position.x, position.z, position.y - 25]}
      scale={0.5}
    >
      <primitive object={clonedScene} />
    </mesh>
  );
}
