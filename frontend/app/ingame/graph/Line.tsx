"use client";

import { useRef } from "react";
import { Mesh } from "three";
import { Line } from "@react-three/drei";

interface LineProps {
  position: number[][];
}

const NavyNode = ({ position }: LineProps) => {
  const mesh = useRef<Mesh>(null!);
  console.log(position);

  return (
    <mesh ref={mesh}>
      <Line
        points={position}
        color="black"
        lineWidth={2}
        dashed={true}
        dashSize={3}
        gapSize={3}
      />
    </mesh>
  );
};

export default NavyNode;
