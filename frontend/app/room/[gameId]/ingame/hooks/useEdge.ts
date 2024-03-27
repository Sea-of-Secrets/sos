import { useMemo } from "react";
import { makeEdgeId } from "~/_lib/data/data";
import { IngameGraphNode } from "~/_lib/data/types";

interface UseEdgeProps {
  aNode: IngameGraphNode;
  bNode: IngameGraphNode;
}

export const useEdge = ({ aNode, bNode }: UseEdgeProps) => {
  const { position: aPosition } = aNode;
  const { position: bPosition } = bNode;

  const edgeId = useMemo(() => makeEdgeId(aNode, bNode), [aNode, bNode]);

  const points: [number, number, number][] = useMemo(
    () => [
      [aPosition.x, aPosition.z, aPosition.y],
      [bPosition.x, bPosition.z, bPosition.y],
    ],
    [aPosition, bPosition],
  );

  return { edgeId, points };
};
