import { duplicatedRemovedEdgeEntries, getNode } from "~/_lib/data/data";
import Edge from "./Edge";

export default function EdgeGroup() {
  return (
    <>
      {duplicatedRemovedEdgeEntries.map(([aNodeId, neighbors]) =>
        neighbors.map(bNodeId => (
          <Edge
            key={`${aNodeId}-${bNodeId}`}
            position={[getNode(aNodeId).position, getNode(bNodeId).position]}
          />
        )),
      )}
    </>
  );
}
