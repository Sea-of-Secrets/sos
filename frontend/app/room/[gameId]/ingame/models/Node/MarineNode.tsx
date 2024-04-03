import { Cylinder, useGLTF, Edges } from "@react-three/drei";

import { MarineNodeProps } from "./types";
import { NODE_SCALE } from "./constants";
import { useNode } from "../../hooks/useNode";
import { usePirateGraph } from "../../stores/graph";
import { useWhenMarineStartGame } from "../../stores/useWhenMarineStartGame";

const ON_COLOR = "#03fc39";
const DEFAULT_COLOR = "blue";

export default function MarineNode({ node, ...props }: MarineNodeProps) {
  const {
    meshRef,
    position,
    handleClickNode,
    handlePointerOut,
    handlePointerOver,
  } = useNode({ node });

  const { scene } = useGLTF("/marine_mark/scene.gltf");
  const clonedScene = scene.clone();

  const { movableNodeIdList } = usePirateGraph();

  const { isMarineStartGameTurn, selectableStartNodeList } =
    useWhenMarineStartGame();

  const getColor = () => {
    if (
      isMarineStartGameTurn &&
      selectableStartNodeList
        .map(selectableNode => selectableNode.nodeId)
        .includes(node.nodeId)
    ) {
      return ON_COLOR;
    }
    if (movableNodeIdList.includes(node.nodeId)) {
      return ON_COLOR;
    }
    return DEFAULT_COLOR;
  };

  return (
    <mesh
      {...props}
      ref={meshRef}
      position={position}
      rotation={[0, -Math.PI / 2, Math.PI / 2]}
      scale={NODE_SCALE}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      <primitive scale={15} object={clonedScene} />
      <Cylinder
        rotation={[0, 0, Math.PI / 2]}
        args={[6, 6, 0.1]}
        onClick={handleClickNode}
      >
        <meshStandardMaterial transparent opacity={0} />
      </Cylinder>
    </mesh>
  );
}
