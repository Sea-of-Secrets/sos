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

  // 5초간 상자 열리고 멈추기
  const handleClickTreasure = () => {
    const action = actions.Scene;
    if (action) {
      action.play();
      setTimeout(() => {
        action.timeScale = 0;
      }, 5000);
    }
  };

  return (
    <mesh
      {...props}
      position={[position.x, position.z, position.y - 25]}
      onClick={handleClickTreasure}
      scale={0.5}
    >
      <primitive object={clonedScene} />
    </mesh>
  );
}
