import { useSocketMessage } from "../../stores/useSocketMessage";
import CloseTreasure from "./CloseTreasure";

export default function TreasureGroup() {
  const { socketMessage } = useSocketMessage();

  return (
    <>
      {socketMessage &&
        socketMessage.game?.treasures &&
        Object.entries(socketMessage.game?.treasures).map(
          ([nodeId, isOpen]) => (
            <CloseTreasure
              key={nodeId}
              isOpen={isOpen as boolean}
              nodeId={parseInt(nodeId)}
              pieceName={"TREASURE"}
            />
          ),
        )}
    </>
  );
}
