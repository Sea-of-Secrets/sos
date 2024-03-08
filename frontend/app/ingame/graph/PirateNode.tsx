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
      <mesh ref={mesh} position={[x, 50, y]} scale={2}>
        <Cylinder args={[4, 5, 2]} material-color="white">
          <Edges color="black" />
        </Cylinder>
      </mesh>
      <Text
        position={[x, 52, y]}
        rotation={[Math.PI / 2, Math.PI, Math.PI]}
        fontSize={12}
        color="black"
      >
        {number}
      </Text>
    </group>
  );
};

export default PirateNode;
