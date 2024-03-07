"use client";

import { useRef } from "react";
import { Mesh } from "three";
import { Cylinder, Text, Edges } from "@react-three/drei";

interface PirateNodeProps {
  number: number;
  x: number;
  y: number;
}

const PirateNode = ({ number, x, y }: PirateNodeProps) => {
  const mesh = useRef<Mesh>(null!);
  return (
    <group>
      <mesh ref={mesh} position={[x, 2, y]} scale={2}>
        <Cylinder args={[4, 5, 2]}>
          <meshPhongMaterial color="#ffffff" />
          <Edges color="black" />
        </Cylinder>
      </mesh>
      <Text
        position={[x, 4, y]}
        rotation={[Math.PI / 2, Math.PI, Math.PI]}
        fontSize={12}
        color="black"
        // anchorX="center"
        // anchorY="middle"
      >
        {number}
      </Text>
    </group>
  );
};

export default PirateNode;
