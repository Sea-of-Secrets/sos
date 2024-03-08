"use client";

import { useRef } from "react";
import { Mesh } from "three";
import { Box, Edges } from "@react-three/drei";

interface NavyNodeProps {
  x: number;
  y: number;
}

const NavyNode = ({ x, y }: NavyNodeProps) => {
  const mesh = useRef<Mesh>(null!);
  return (
    <mesh ref={mesh} position={[x, 50, y]} scale={2}>
      <Box args={[5, 2, 5]} material-color="blue">
        <Edges color="black" />
      </Box>
    </mesh>
  );
};

export default NavyNode;
