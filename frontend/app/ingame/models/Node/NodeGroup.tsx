import { NODE_ENTRY } from "~/_lib/data/data";
import NodeRenderer from "./NodeRenderer";

export default function NodeGroup() {
  return (
    <>
      {NODE_ENTRY.map(([key, node]) => (
        <NodeRenderer
          key={node.nodeId}
          node={node}
          // isNextMoveableNode={node.neighbors.length > 0}
        />
      ))}
    </>
  );
}
