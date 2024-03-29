import { useEffect, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { TreasureProps } from "./types";
import { PiecePathMap } from "~/assetPath";

import { getNode } from "~/_lib/data/data";
import useNickname from "~/store/nickname";
import { useSocketMessage } from "../../stores/useSocketMessage";
export default function TreasureRenderer({
  pieceName,
  nodeId,
  isOpen,
  ...props
}: TreasureProps) {
  const { scene: originalScene, animations } = useGLTF(
    PiecePathMap[pieceName].src,
  );

  const { nickname } = useNickname();
  const { socketMessage } = useSocketMessage();
  const clonedScene = originalScene.clone();
  const position = getNode(nodeId).position;
  const { actions } = useAnimations(animations, clonedScene);

  let visible =
    isOpen || socketMessage?.game?.players[0]["nickname"] === nickname;

  useEffect(() => {
    if (isOpen) {
      const action = actions.Scene;
      if (action) {
        action.time = 4000;
        action.play();
        setTimeout(() => {
          action.time = 5000;
          action.timeScale = 0;
        }, 5000);
      }
    }
  }, [isOpen]);

  return (
    <mesh
      {...props}
      position={[position.x, position.z, position.y - 25]}
      scale={PiecePathMap[pieceName].size}
      visible={visible}
    >
      <primitive object={clonedScene} />
    </mesh>
  );
}
