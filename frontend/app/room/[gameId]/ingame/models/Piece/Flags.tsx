import { useEffect, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { PiecePathMap } from "~/assetPath";
import { Vector3 } from "three";
import { getNode } from "~/_lib/data/data";
import { useSocketMessage } from "../../stores/useSocketMessage";

export default function FlagNodes() {
  const { socketMessage } = useSocketMessage();
  const [flagNode, setFlagNode] = useState([0]);

  useEffect(() => {
    if (socketMessage.game?.investigateSuccess) {
      setFlagNode(socketMessage.game?.investigateSuccess);
    }
  }, [socketMessage]);

  return (
    <>
      {flagNode.map((node, index) => (
        <Flag key={index} nodeId={node} />
      ))}
    </>
  );
}

interface FlagProps {
  nodeId: number;
}

const Flag = ({ nodeId, ...props }: FlagProps) => {
  const { scene } = useGLTF(PiecePathMap["FLAG"].src);

  const nodePosition = getNode(nodeId).position;
  const clonedScene = scene.clone();
  const position = new Vector3(nodePosition.x, nodePosition.z, nodePosition.y);

  return (
    <mesh {...props} position={position} scale={PiecePathMap["FLAG"].size}>
      <primitive object={clonedScene} />
    </mesh>
  );
};
