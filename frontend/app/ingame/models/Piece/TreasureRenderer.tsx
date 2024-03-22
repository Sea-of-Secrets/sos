import { getNode } from "~/_lib/data/data";

import OpenTreasure from "./OpenTreasure";
import CloseTreasure from "./CloseTreasure";
import { TreasureProps } from "./types";

export default function TreasureRenderer({
  isOpen,
  nodeId,
  url,
  ...props
}: TreasureProps) {
  const position = getNode(nodeId).position;
  if (isOpen === false) {
    return (
      <CloseTreasure position={position} url={url} nodeId={nodeId} {...props} />
    );
  }

  if (isOpen === true) {
    return (
      <OpenTreasure position={position} url={url} nodeId={nodeId} {...props} />
    );
  }

  return null;
}
