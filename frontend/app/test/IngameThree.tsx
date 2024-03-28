import { useEffect } from "react";

import Tween from "../room/[gameId]/ingame/models/Tween";
import Camera from "../room/[gameId]/ingame/models/Camera";
import Graph from "../room/[gameId]/ingame/models/Graph";
import Piece from "../room/[gameId]/ingame/models/Piece/Piece";
import Map from "../room/[gameId]/ingame/models/Map";
import Light from "../room/[gameId]/ingame/models/Light";
import SelectableMarineNodeMarkerGroup from "../room/[gameId]/ingame/models/Piece/SelectableMarineNodeMarkerGroup";

import { usePiratePiece } from "../room/[gameId]/ingame/stores/piece";

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
      <SelectableMarineNodeMarkerGroup />
      <Map />
      <Light />
      <axesHelper scale={10} />
    </>
  );
}
