import Light from "./models/Light";
import Tween from "./models/Tween";
import Camera from "./models/Camera";
import Graph from "./models/Graph";
import Map from "./models/Map";
import Shiba from "./models/Piece/Shiba";
import PieceEffect from "./models/Piece/PieceEffect";
import Treasure from "./models/Piece/TreasureGroup";

import { getNode } from "~/_lib/data/data";

const TEST_NODE_ID = 107; // 시바견을 일단 107번 노드에 띄워보자
const Z_HEIGHT_TERM = 26; // 현재 노드의 높이는 모두 동일하지만 나중을 위해... 노드 발판과 시바견의 Z축 거리

export default function IngameThree({ nextMoveableNodes, nextNodeEdge }: any) {
  return (
    <>
      <Tween />
      <Camera />
      <Graph />
      <Treasure />
      <Shiba
        position={{
          z: getNode(TEST_NODE_ID).position.z + Z_HEIGHT_TERM,
          x: getNode(TEST_NODE_ID).position.x,
          y: getNode(TEST_NODE_ID).position.y,
        }}
      />
      <PieceEffect type="FOOTHOLD" position={getNode(TEST_NODE_ID).position} />
      <Map />
      <Light />
      <axesHelper scale={10} />
    </>
  );
}
