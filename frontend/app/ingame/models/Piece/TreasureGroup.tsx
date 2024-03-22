import { useGameData } from "../../stores/useGameData";
import TreasureRenderer from "./TreasureRenderer";

export default function TreasureGroup() {
  const { treasures } = useGameData();
  const url = "/treasure_chest/scene.gltf";

  return (
    <>
      {Object.entries(treasures).map(([nodeId, hasTreasure]) => (
        <TreasureRenderer
          key={nodeId}
          isOpen={hasTreasure}
          nodeId={parseInt(nodeId)}
          url={url}
        />
      ))}
    </>
  );
}
