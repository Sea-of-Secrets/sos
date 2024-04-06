import { useEffect } from "react";

import Tween from "../room/[gameId]/ingame/models/Tween";
import Camera from "../room/[gameId]/ingame/models/Camera";
import Graph from "../room/[gameId]/ingame/models/Graph";
import Piece from "../room/[gameId]/ingame/models/Piece/Piece";
import Map from "../room/[gameId]/ingame/models/Map";
import Light from "../room/[gameId]/ingame/models/Light";
import SelectableMarineNodeMarkerGroup from "../room/[gameId]/ingame/models/Piece/SelectableMarineNodeMarkerGroup";

import { getNode } from "~/_lib/data/data";
import PieceEffect from "../room/[gameId]/ingame/models/Piece/PieceEffect";
import { usePiratePiece } from "../room/[gameId]/ingame/stores/piece";

export default function IngameThree() {
  const { setPiece: setPiratePiece } = usePiratePiece();

  return (
    <>
      <Tween />
      <Camera />
      <Graph />
      <Piece
        name="PIRATE"
        position={getNode(107).position}
        pieceName="SHIBA"
        set={setPiratePiece}
      />
      <PieceEffect effectName="GOLD_EFFECT" position={getNode(107).position} />
      <SelectableMarineNodeMarkerGroup />
      <Map />
      <Light />
      <axesHelper scale={10} />
    </>
  );
}
