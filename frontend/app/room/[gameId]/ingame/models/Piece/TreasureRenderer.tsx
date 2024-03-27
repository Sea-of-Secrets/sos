import { getNode } from "~/_lib/data/data";

import OpenTreasure from "./OpenTreasure";
import CloseTreasure from "./CloseTreasure";
import { TreasureProps } from "./types";
import { useGameData } from "../../stores/useGameData";

export default function TreasureRenderer({
  isOpen,
  nodeId,
  ...props
}: TreasureProps) {
  const { type } = useGameData();
  const position = getNode(nodeId).position;

  if (isOpen === false && type.includes("pirate")) {
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
