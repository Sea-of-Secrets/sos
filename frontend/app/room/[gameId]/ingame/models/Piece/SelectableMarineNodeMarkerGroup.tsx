import { useRef } from "react";
import { Mesh } from "three";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

import { IngameGraphNode } from "~/_lib/data/types";
import { useWhenMarineStartGame } from "../../stores/useWhenMarineStartGame";
import { PiecePathMap } from "~/assetPath";

export default function SelectableMarineNodeMarkerGroup() {
  const { selectableStartNodeList } = useWhenMarineStartGame();

  return (
    <>
      {selectableStartNodeList.map(node => (
        <Marker
          key={node.nodeId}
          node={node}
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
  const { isMarineStartGameTurn } = useWhenMarineStartGame();
  useFrame(state => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime * 4;
      //meshRef.current.raycast = THREE.MathUtils.degToRad(time * 60);
      meshRef.current.position.y = Math.sin(time) * 10 + 60; // y축으로의 움직임
      //meshRef.current.position.z = Math.sin(time * 0.5) * 20; // z축으로의 움직임
    }
  });

  return (
    <mesh
      visible={isMarineStartGameTurn}
      ref={meshRef}
      position={[position.x, position.z, position.y]}
      scale={size}
    >
      <primitive object={clonedScene} />
    </mesh>
  );
};
