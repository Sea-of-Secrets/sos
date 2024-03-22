import { nodeEntries } from "~/_lib/data/data";
import NodeRenderer from "./NodeRenderer";

export default function NodeGroup() {
  return (
    <>
      {nodeEntries.map(([key, node]) => (
        <NodeRenderer
          key={node.nodeId}
          node={node}
          // isNextMoveableNode={node.neighbors.length > 0}
        />
      ))}
    </>
  );
}
