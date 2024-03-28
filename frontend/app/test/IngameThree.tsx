import { useEffect } from "react";

import Light from "~/app/room/[gameId]/ingame/models/Light";
import Tween from "~/app/room/[gameId]/ingame/models/Tween";
import Camera from "~/app/room/[gameId]/ingame/models/Camera";
import Graph from "~/app/room/[gameId]/ingame/models/Graph";
import Map from "~/app/room/[gameId]/ingame/models/Map";
import Piece from "~/app/room/[gameId]/ingame/models/Piece/Piece";

import { usePiratePiece } from "~/app/room/[gameId]/ingame/stores/piece";
import { useGameData } from "~/app/room/[gameId]/ingame/stores/useGameData";
import { getNode } from "~/_lib/data/data";

const TEST_NODE_ID = 107; // 시바견을 일단 107번 노드에 띄워보자

export default function IngameThree() {
  const {
    setPiece: setPiratePiece,
    setPosition: setPiratePosition,
    position: piratePosition,
  } = usePiratePiece();

  const { currentPosition } = useGameData();

  useEffect(() => {
    // 해적말 처음 위치 초기화
    setPiratePosition(getNode(TEST_NODE_ID).position);
  }, [setPiratePosition]);

  return (
    <>
      <Tween />
      <Camera />
      <Graph />
      {/* {piratePosition && (
        <Piece
          name="PIRATE"
          position={piratePosition}
          pieceName="SHIBA"
          set={setPiratePiece}
        />
      )}
      {currentPosition[0] && (
        <Piece
          name="PIRATE"
          position={getNode(currentPosition[0]).position}
          pieceName="PIRATE"
          set={setPiratePiece}
        />
      )} */}
      <Map />
      <Light />
      <axesHelper scale={10} />
    </>
  );
}
