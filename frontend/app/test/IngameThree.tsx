import { useEffect } from "react";

import Light from "~/app/ingame/models/Light";
import Tween from "~/app/ingame/models/Tween";
import Camera from "~/app/ingame/models/Camera";
import Graph from "~/app/ingame/models/Graph";
import Map from "~/app/ingame/models/Map";
import Piece from "~/app/ingame/models/Piece/Piece";

import { usePiratePiece } from "~/app/ingame/stores/piece";
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
      <Tween />
      <Camera />
      <Graph />
      {piratePosition && (
        <Piece
          name="PIRATE"
          position={piratePosition}
          pieceName="SHIBA"
          set={setPiratePiece}
        />
      )}
      <Map />
      <Light />
      <axesHelper scale={10} />
    </>
  );
}
