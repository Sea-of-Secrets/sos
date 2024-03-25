import * as THREE from "three";
import { useRef } from "react";
import { PrimitiveProps } from "@react-three/fiber";
import { Line } from "@react-three/drei";

import { IngameGraphNode, NodePosition } from "~/_lib/data/types";
import { useEdge } from "../../hooks/useEdge";
import { usePirateGraph } from "../../stores/graph";

interface EdgeProps extends Omit<PrimitiveProps, "object"> {
  aNode: IngameGraphNode;
  bNode: IngameGraphNode;
}

export default function Edge({ aNode, bNode, ...props }: EdgeProps) {
  const mesh = useRef<THREE.Mesh>(null);
  const { points, edgeId } = useEdge({ aNode, bNode });
  const { movableEdgeIdList } = usePirateGraph();

  return (
    <mesh ref={mesh} {...props}>
      <Line
        points={points}
        color={movableEdgeIdList.includes(edgeId) ? "#03fc39" : "black"}
        lineWidth={3}
        dashed={true}
        dashSize={5}
        gapSize={5}
      />
    </mesh>
  );
}
