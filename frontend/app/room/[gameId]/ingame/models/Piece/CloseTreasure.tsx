import { useEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { PieceProps } from "./types";
import { PiecePathMap } from "~/assetPath";
import { useGameData } from "../../stores/useGameData";

export default function TreasureRenderer({
  position,
  nodeId,
  ...props
}: PieceProps) {
  const { scene: originalScene, animations } = useGLTF(
    PiecePathMap["TREASURE"].src,
  );

  const { openTreasure } = useGameData();
  const clonedScene = originalScene.clone();
  const { actions } = useAnimations(animations, clonedScene);

  // 3초간 상자 열리고 멈추기
  useEffect(() => {
    console.log(openTreasure, nodeId);

    if (openTreasure === nodeId) {
      const action = actions.Scene;
      if (action) {
        action.timeScale = 2000;
        action.play();
        setTimeout(() => {
          action.timeScale = 0;
        }, 3000);
      }
    }
  }, [openTreasure, nodeId, actions]);

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
