import { useEffect, useState } from "react";

import { useSocketMessage } from "../../stores/useSocketMessage";
import Treasure from "./Treasure";

export default function TreasureGroup() {
  const { socketMessage } = useSocketMessage();
  const [treasures, setTreasures] = useState({
    0: false,
    1: false,
    2: false,
    3: false,
  });

  useEffect(() => {
    if (socketMessage.game?.treasures) {
      setTreasures(socketMessage.game?.treasures);
    }
  }, [socketMessage]);

  return (
    <>
      {Object.entries(treasures).map(([nodeId, isOpen], index) => (
        <Treasure
          key={nodeId}
          isOpen={isOpen as boolean}
          nodeId={parseInt(nodeId)}
          number={index + 1}
        />
      ))}
    </>
  );
}
