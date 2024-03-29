import { useSocketMessage } from "../../stores/useSocketMessage";
import TreasureRenderer from "./TreasureRenderer";

export default function TreasureGroup() {
  const { socketMessage } = useSocketMessage();

  return (
    <>
      {socketMessage &&
        socketMessage.game?.treasures &&
        Object.entries(socketMessage.game?.treasures).map(
          ([nodeId, isOpen]) => (
            <TreasureRenderer
              key={nodeId}
              isOpen={isOpen as boolean}
              nodeId={parseInt(nodeId)}
            />
          ),
        )}
    </>
  );
}
