import { useEffect, useRef, useState } from "react";
import { Mesh } from "three";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

import { IngameGraphNode } from "~/_lib/data/types";
import { PiecePathMap } from "~/assetPath";
import { getNode } from "~/_lib/data/data";
import { useSocketMessage } from "../../stores/useSocketMessage";
import useNickname from "~/store/nickname";

export default function AvailableNode() {
  const { socketMessage } = useSocketMessage();

  const [availableNode, setAvailableNode] = useState([0]);
  useEffect(() => {
    if (
      socketMessage.message === "ORDER_MOVE_PIRATE" ||
      socketMessage.message === "ORDER_MOVE_MARINE_ONE" ||
      socketMessage.message === "ORDER_MOVE_MARINE_TWO" ||
      socketMessage.message === "ORDER_MOVE_MARINE_THREE"
    ) {
      setAvailableNode(Object.keys(socketMessage.availableNode).map(Number));
    } else {
      setAvailableNode([0]);
    }
  }, [socketMessage]);

  return (
    <>
      {availableNode.map(node => (
        <Marker
          key={node}
          node={getNode(node)}
          src={PiecePathMap["RED_ARROW"].src}
          size={PiecePathMap["RED_ARROW"].size}
        />
      ))}
    </>
  );
}

interface MarkerProps {
  src: string;
  node: IngameGraphNode;
  size: number;
}

const Marker = ({ src, node, size }: MarkerProps) => {
  const meshRef = useRef<Mesh | null>(null!);
  const { position } = node;
  const { scene: originalScene } = useGLTF(src);

  const clonedScene = originalScene.clone();
  const { socketMessage } = useSocketMessage();
  const { nickname } = useNickname();
  useFrame(state => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime * 4;
      //meshRef.current.raycast = THREE.MathUtils.degToRad(time * 60);
      meshRef.current.position.y = Math.sin(time) * 10 + 60; // y축으로의 움직임
      //meshRef.current.position.z = Math.sin(time * 0.5) * 20; // z축으로의 움직임
    }
  });

  const visible =
    (socketMessage.message === "ORDER_MOVE_PIRATE" &&
      socketMessage.game.players[0]["nickname"] === nickname) ||
    (socketMessage.message === "ORDER_MOVE_MARINE_ONE" &&
      socketMessage.game.players[1]["nickname"] === nickname) ||
    (socketMessage.message === "ORDER_MOVE_MARINE_TWO" &&
      socketMessage.game.players[2]["nickname"] === nickname) ||
    (socketMessage.message === "ORDER_MOVE_MARINE_THREE" &&
      socketMessage.game.players[3]["nickname"] === nickname);

  return (
    <mesh
      visible={visible}
      ref={meshRef}
      position={[position.x, position.z, position.y]}
      scale={size}
    >
      <primitive object={clonedScene} />
    </mesh>
  );
};
