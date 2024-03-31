import { useSocketMessage } from "../../stores/useSocketMessage";
import Treasure from "./Treasure";

export default function TreasureGroup() {
  const { socketMessage } = useSocketMessage();

  return (
    <>
      {socketMessage &&
        socketMessage.game?.treasures &&
        Object.entries(socketMessage.game?.treasures).map(
          ([nodeId, isOpen], index) => (
            <Treasure
              key={nodeId}
              isOpen={isOpen as boolean}
              nodeId={parseInt(nodeId)}
              number={index + 1}
            />
          ),
        )}
    </>
  );
}
