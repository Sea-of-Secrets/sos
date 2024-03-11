import * as THREE from "three";
import { useRef } from "react";
import { PrimitiveProps } from "@react-three/fiber";
import { Line } from "@react-three/drei";

interface EdgeProps extends Omit<PrimitiveProps, "object"> {
  position: [number[], number[]];
}

export default function Edge({ position, ...props }: EdgeProps) {
  const mesh = useRef<THREE.Mesh>(null);
  return (
    <mesh ref={mesh} {...props}>
      <Line
        points={[
          [position[0][0], 30, position[0][1]],
          [position[1][0], 30, position[1][1]],
        ]}
        color="black"
        lineWidth={2}
        dashed={true}
        dashSize={3}
        gapSize={3}
      />
    </mesh>
  );
}
