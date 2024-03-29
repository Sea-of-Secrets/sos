import { Cylinder, Edges, Text } from "@react-three/drei";

import { NODE_SCALE } from "./constants";
import { PirateNodeProps } from "./types";
import { useNode } from "../../hooks/useNode";
import { usePirateGraph } from "../../stores/graph";

export default function PirateNode({ node, ...props }: PirateNodeProps) {
  const {
    meshRef,
    position,
    handleClickNode,
    handlePointerOut,
    handlePointerOver,
  } = useNode({ node });

  const { movableNodeIdList } = usePirateGraph();

  return (
    <>
      <mesh
        {...props}
        ref={meshRef}
        position={position}
        scale={NODE_SCALE}
        onClick={handleClickNode}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        <Cylinder
          args={[4, 5, 2]}
          material-color={
            movableNodeIdList.includes(node.nodeId) ? "#03fc39" : "orange"
          }
        >
          <Edges color="black" />
        </Cylinder>
      </mesh>
      <Text
        position={[position[0], 12, position[2]]}
        rotation={[Math.PI / 2, Math.PI, Math.PI]}
        fontSize={6}
        color="black"
      >
        {node.nodeId}
      </Text>
    </>
  );
}
