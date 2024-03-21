import { MarineNode, PirateNode } from ".";
import { BaseNodeProps } from "./types";

export default function NodeRenderer({ node, ...props }: BaseNodeProps) {
  if (node.type === "MARINE") {
    return <MarineNode {...props} node={node} />;
  }

  if (node.type === "PIRATE") {
    return <PirateNode node={node} />;
  }

  return null;
}
