import { useCallback, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Cylinder, Text, Edges } from "@react-three/drei";
import { PrimitiveProps, ThreeEvent } from "@react-three/fiber";
import { GraphNode } from "./Node.types";

interface NodeProps extends Omit<PrimitiveProps, "object"> {
  node: GraphNode;
  nextMoveableNodes: number[];
}

// TODO: node를 "type"으로 구분하기 때문에 type에 따라 다른 Node를 보여줘야한다.
export default function Node({ node, nextMoveableNodes, ...props }: NodeProps) {
  const { type, nodeId, position } = node;
  const cylinderColor = nextMoveableNodes?.includes(nodeId)
    ? "tomato"
    : "orange";

  const [x, y] = position;
  const mesh = useRef<THREE.Mesh>(null);
  const [isHover, setIsHover] = useState(false);

  const handleClickPiece = useCallback((e: ThreeEvent<MouseEvent>) => {
    console.log(`노드ID:${nodeId} / 노드타입:${type}`, e);
  }, []);

  const handlePointerOver = useCallback(() => {
    setIsHover(true);
  }, []);

  const handlePointerOut = useCallback(() => {
    setIsHover(false);
  }, []);

  useEffect(() => {
    if (isHover) {
      document.querySelector("canvas")!.style.cursor = "pointer";
    } else {
      document.querySelector("canvas")!.style.cursor = "default";
    }
  }, [isHover]);

  return (
    <group>
      <mesh
        {...props}
        ref={mesh}
        position={[x, 10, y]}
        scale={1.5}
        onClick={handleClickPiece}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        <Cylinder args={[4, 5, 2]} material-color={cylinderColor}>
          <Edges color="black" />
        </Cylinder>
      </mesh>
      {type === "도둑" && (
        <Text
          position={[x, 12, y]}
          rotation={[Math.PI / 2, Math.PI, Math.PI]}
          fontSize={6}
          color="black"
        >
          {node.nodeNumber}
        </Text>
      )}
    </group>
  );
}
