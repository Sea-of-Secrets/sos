import { useEffect } from "react";

import Light from "./models/Light";
import Tween from "./models/Tween";
import Camera from "./models/Camera";
import Graph from "./models/Graph";
import Map from "./models/Map";

import Piece from "./models/Piece/Piece";
import TreasureGroup from "./models/Piece/TreasureGroup";

import { getNode } from "~/_lib/data/data";
import { usePiratePiece } from "./stores/piece";
import { useSocketMessage } from "./stores/useSocketMessage";
import useNickname from "~/store/nickname";

export default function IngameThree() {
  // const TEST_NODE_ID = 107; // 시바견을 일단 107번 노드에 띄워보자
  const {
    setPiece: setPiratePiece,
    setPosition: setPiratePosition,
    position: piratePosition,
  } = usePiratePiece();
  // useEffect(() => {
  //   // 해적말 처음 위치 초기화
  //   setPiratePosition(getNode(TEST_NODE_ID).position);
  // }, [setPiratePosition]);

  const { socketMessage } = useSocketMessage();
  const { nickname } = useNickname();
  const currentNodeId = socketMessage?.game?.currentPosition[0];
  const position = currentNodeId
    ? getNode(currentNodeId).position
    : getNode(0).position;

  return (
    <>
      <axesHelper scale={10} />
      <Light />
      <Camera />
      <Tween />
      <Map />
      <Graph />
      {/* {piratePosition && (
        <Piece
          name="PIRATE"
          position={piratePosition}
          pieceName="SHIBA"
          set={setPiratePiece}
        />
      )} */}
      {socketMessage &&
        socketMessage.game?.players[0]["nickname"] === nickname && (
          <Piece
            name="PIRATE"
            position={position}
            pieceName="PIRATE"
            set={setPiratePiece}
          />
        )}
      <TreasureGroup />
    </>
  );
}
