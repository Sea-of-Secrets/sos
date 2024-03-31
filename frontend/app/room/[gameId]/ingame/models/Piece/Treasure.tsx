import { useEffect, useState } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { TreasureProps } from "./types";
import { PiecePathMap } from "~/assetPath";
import { getNode } from "~/_lib/data/data";
import useNickname from "~/store/nickname";
import { useSocketMessage } from "../../stores/useSocketMessage";

export default function TreasureRenderer({
  nodeId,
  isOpen,
  number,
  ...props
}: TreasureProps) {
  const { scene, animations } = useGLTF(
    PiecePathMap[`TREASURE${number}` as keyof typeof PiecePathMap].src,
  );
  const { nickname } = useNickname();
  const { socketMessage } = useSocketMessage();
  const position = getNode(nodeId).position;
  const { actions } = useAnimations(animations, scene);
  const [animationPlayed, setAnimationPlayed] = useState(false);

  useEffect(() => {
    if (!animationPlayed && socketMessage?.game.treasures[nodeId]) {
      setTimeout(() => {
        const action = actions.Scene;
        if (action) {
          action.time = 3000;
          action.play();
          setTimeout(() => {
            action.timeScale = 0;
          }, 3000);
        }
        setAnimationPlayed(true);
      }, 3000);
    }
  }, [socketMessage, nodeId, animationPlayed, actions]);

  let visible =
    isOpen || socketMessage?.game?.players[0]["nickname"] === nickname;

  return (
    <mesh
      {...props}
      position={[position.x, position.z, position.y - 25]}
      scale={
        PiecePathMap[`TREASURE${number}` as keyof typeof PiecePathMap].size
      }
      visible={visible}
      // material={}
    >
      <primitive object={scene} />
    </mesh>
  );
}
