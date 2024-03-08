import { useCallback, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Cylinder, Text, Edges } from "@react-three/drei";
import { PrimitiveProps, ThreeEvent } from "@react-three/fiber";

interface NodeProps extends Omit<PrimitiveProps, "object"> {
  type?: string; // TODO: 경찰인지 도둑인지
  nodeNumber?: number;
  nodeId: number;
  position: [number, number];
}

// TODO: "type"으로 구분한다.
export default function Node({
  type,
  nodeNumber,
  nodeId,
  position,
  ...props
}: NodeProps) {
  const [x, y] = position;
  const mesh = useRef<THREE.Mesh>(null);
  const [isHover, setIsHover] = useState(false);

  const handleClickPiece = useCallback((e: ThreeEvent<MouseEvent>) => {
    console.log(e);
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
        data-id={nodeId}
        position={[x, 50, y]}
        scale={2}
        onClick={handleClickPiece}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        <Cylinder args={[4, 5, 2]} material-color="white">
          <Edges color="black" />
        </Cylinder>
      </mesh>
      {/* <mesh ref={mesh} position={[x, 50, y]} scale={2}>
        <Cylinder args={[4, 5, 2]} material-color="white">
          <Edges color="black" />
        </Cylinder>
      </mesh> */}
      <Text
        position={[x, 52, y]}
        rotation={[Math.PI / 2, Math.PI, Math.PI]}
        fontSize={12}
        color="black"
      >
        {nodeNumber}
      </Text>
    </group>
  );
}
