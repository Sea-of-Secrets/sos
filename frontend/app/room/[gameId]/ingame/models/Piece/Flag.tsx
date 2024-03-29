import { useGLTF } from "@react-three/drei";
import { FlagProps } from "./types";
import { PiecePathMap } from "~/assetPath";
import { Vector3 } from "three";
import { getNode } from "~/_lib/data/data";

export default function Flag({ nodeId, ...props }: FlagProps) {
  const { scene } = useGLTF(PiecePathMap["FLAG"].src);

  const clonedScene = scene.clone();
  const nodePosition = getNode(nodeId).position;
  const position = new Vector3(nodePosition.x, nodePosition.z, nodePosition.y);

  return (
    <mesh {...props} position={position} scale={PiecePathMap["FLAG"].size}>
      <primitive object={clonedScene} />
    </mesh>
  );
}
