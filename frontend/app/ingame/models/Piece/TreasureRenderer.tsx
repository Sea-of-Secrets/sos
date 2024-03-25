import { getNode } from "~/_lib/data/data";

import OpenTreasure from "./OpenTreasure";
import CloseTreasure from "./CloseTreasure";
import { TreasureProps } from "./types";

export default function TreasureRenderer({
  isOpen,
  nodeId,
  ...props
}: TreasureProps) {
  const position = getNode(nodeId).position;
  if (isOpen === false) {
    return (
      <CloseTreasure
        pieceName="TREASURE"
        position={position}
        nodeId={nodeId}
        {...props}
      />
    );
  }

  if (isOpen === true) {
    return (
      <OpenTreasure
        pieceName="TREASURE"
        position={position}
        nodeId={nodeId}
        {...props}
      />
    );
  }

  return null;
}
