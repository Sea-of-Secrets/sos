import { useEffect } from "react";

import Light from "./models/Light";
import Tween from "./models/Tween";
import Camera from "./models/Camera";
import Graph from "./models/Graph";
import Map from "./models/Map";

import Piece from "./models/Piece/Piece";
import PieceEffect from "./models/Piece/PieceEffect";
import Treasure from "./models/Piece/TreasureGroup";

import { usePiratePiece } from "./stores/piece";
import { getNode } from "~/_lib/data/data";

const TEST_NODE_ID = 107; // 시바견을 일단 107번 노드에 띄워보자

export default function IngameThree() {
  const {
    setPiece: setPiratePiece,
    setPosition: setPiratePosition,
    position: piratePosition,
  } = usePiratePiece();

  useEffect(() => {
    // 해적말 처음 위치 초기화
    setPiratePosition(getNode(TEST_NODE_ID).position);
  }, [setPiratePosition]);

  return (
    <>
      <axesHelper scale={10} />
      <Light />
      <Camera />
      <Tween />
      <Map />
      <Graph />
      {piratePosition && (
        <Piece
          name="PIRATE"
          position={piratePosition}
          pieceName="SHIBA"
          set={setPiratePiece}
        />
      )}
    </>
  );
}
