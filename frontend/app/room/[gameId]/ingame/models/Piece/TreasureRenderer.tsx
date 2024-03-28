import { getNode } from "~/_lib/data/data";

import OpenTreasure from "./OpenTreasure";
import CloseTreasure from "./CloseTreasure";
import { TreasureProps } from "./types";

import useNickname from "~/store/nickname";
import { useSocketMessage } from "../../stores/useSocketMessage";

export default function TreasureRenderer({
  isOpen,
  nodeId,
  ...props
}: TreasureProps) {
  const { nickname } = useNickname();
  const { socketMessage } = useSocketMessage();
  const position = getNode(nodeId).position;

  return (
    <>
      {isOpen === false &&
        socketMessage?.game?.players[0]["nickname"] === nickname && (
          <CloseTreasure
            pieceName="TREASURE"
            position={position}
            nodeId={nodeId}
            {...props}
          />
        )}
      {isOpen === true && (
        <OpenTreasure
          pieceName="TREASURE"
          position={position}
          nodeId={nodeId}
          {...props}
        />
      )}
    </>
  );
}
