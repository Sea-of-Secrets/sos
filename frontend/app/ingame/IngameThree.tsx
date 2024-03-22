import Light from "./models/Light";
import Tween from "./models/Tween";
import Camera from "./models/Camera";
import Graph from "./models/Graph";
import Map from "./models/Map";

import { getNode } from "~/_lib/data/data";
import Piece from "./models/Piece/Piece";

const TEST_NODE_ID = 107; // 시바견을 일단 107번 노드에 띄워보자

export default function IngameThree({ nextMoveableNodes, nextNodeEdge }: any) {
  return (
    <>
      <Tween />
      <Camera />
      <Graph />
      <Piece position={getNode(TEST_NODE_ID).position} pieceName="SHIBA" />
      <Map />
      <Light />
      <axesHelper scale={10} />
    </>
  );
}
