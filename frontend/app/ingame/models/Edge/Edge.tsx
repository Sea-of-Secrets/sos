import * as THREE from "three";
import { useRef } from "react";
import { PrimitiveProps } from "@react-three/fiber";
import { Line } from "@react-three/drei";

import { NodePosition } from "~/_lib/data/types";

interface EdgeProps extends Omit<PrimitiveProps, "object"> {
  position: [NodePosition, NodePosition];
  isNextNodeEdge?: boolean;
}

export default function Edge({
  position,
  isNextNodeEdge,
  ...props
}: EdgeProps) {
  const mesh = useRef<THREE.Mesh>(null);

  const [aPosition, bPosition] = position;

  return (
    <mesh ref={mesh} {...props}>
      <Line
        points={[
          [aPosition.x, aPosition.z, aPosition.y],
          [bPosition.x, bPosition.z, bPosition.y],
        ]}
        color="black" //{isNextNodeEdge ? "white" : "black"}
        lineWidth={3}
        dashed={true}
        dashSize={5}
        gapSize={5}
      />
    </mesh>
  );
}
