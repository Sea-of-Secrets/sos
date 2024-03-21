import { INGAME_GRAPH, REMOVED_EDGE_ENTRY } from "~/_lib/data/data";
import Edge from "./Edge";

export default function EdgeGroup() {
  return (
    <>
      {REMOVED_EDGE_ENTRY.map(([aNodeId, neighbors]) =>
        neighbors.map(bNodeId => (
          <Edge
            key={`${aNodeId}-${bNodeId}`}
            position={[
              INGAME_GRAPH[aNodeId]["position"],
              INGAME_GRAPH[bNodeId]["position"],
            ]}
          />
        )),
      )}
    </>
  );
}
