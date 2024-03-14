import * as THREE from "three";
import { useRef } from "react";
import { PrimitiveProps } from "@react-three/fiber";
import { Line } from "@react-three/drei";

interface EdgeProps extends Omit<PrimitiveProps, "object"> {
  position: [number[], number[]];
  isNextNodeEdge: boolean;
}

export default function Edge({
  position,
  isNextNodeEdge,
  ...props
}: EdgeProps) {
  const mesh = useRef<THREE.Mesh>(null);
  return (
    <mesh ref={mesh} {...props}>
      <Line
        points={[
          [position[0][0], 10, position[0][1]],
          [position[1][0], 10, position[1][1]],
        ]}
        color={isNextNodeEdge ? "white" : "black"}
        lineWidth={3}
        dashed={true}
        dashSize={5}
        gapSize={5}
      />
    </mesh>
  );
}
