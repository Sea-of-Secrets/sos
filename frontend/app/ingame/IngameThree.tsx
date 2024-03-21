import Tween from "./models/Tween";
import Camera from "./models/Camera";
import Graph from "./models/Graph";
import Map from "./models/Map";
import Shiba from "./models/Piece/Shiba";
import PieceEffect from "./models/Piece/PieceEffect";

import { INGAME_GRAPH } from "~/_lib/data/data";

export default function IngameThree({ nextMoveableNodes, nextNodeEdge }: any) {
  return (
    <>
      <Tween />
      <Camera />
      <Graph />
      <Shiba
        position={{
          z: 26,
          x: INGAME_GRAPH["107"].position.x,
          y: INGAME_GRAPH["107"].position.y,
        }}
      />
      <PieceEffect type="FOOTHOLD" position={INGAME_GRAPH["107"].position} />
      <Map />
      <directionalLight color="#FFFFFF" intensity={1} position={[5, 5, 5]} />
      <axesHelper scale={10} />
    </>
  );
}
