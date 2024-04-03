// @ts-nocheck

import Light from "./models/Light";
import Tween from "./models/Tween";
import Camera from "./models/Camera";
import Graph from "./models/Graph";
import Map from "./models/Map";
import Piece from "./models/Piece/Piece";
import Flags from "./models/Piece/Flags";
import TreasureGroup from "./models/Piece/TreasureGroup";
import SelectableMarineNodeMarkerGroup from "./models/Piece/SelectableMarineNodeMarkerGroup";

import { getNode } from "~/_lib/data/data";
import {
  usePiratePiece,
  useMarineOnePiece,
  useMarineTwoPiece,
  useMarineThreePiece,
} from "./stores/piece";
import { useSocketMessage } from "./stores/useSocketMessage";
import AvailableNode from "./models/Piece/AvailableNode";
import { useEffect, useRef } from "react";
import { CameraControls } from "@react-three/drei";
import { useCamera } from "./stores/useCamera";

export default function IngameThree() {
  const cameraRef = useRef<CameraControls>(null!);
  const { initialize } = useCamera();
  const { setPiece: setPiratePiece } = usePiratePiece();
  const { setPiece: setMarineOnePiece } = useMarineOnePiece();
  const { setPiece: setMarineTwoPiece } = useMarineTwoPiece();
  const { setPiece: setMarineThreePiece } = useMarineThreePiece();

  const { socketMessage } = useSocketMessage();
  const pirateNodeId = socketMessage?.game?.currentPosition[0];
  const marineOneNodeId = socketMessage?.game?.currentPosition[1];
  const marineTwoNodeId = socketMessage?.game?.currentPosition[2];
  const marineThreeNodeId = socketMessage?.game?.currentPosition[3];
  const piratePosition = pirateNodeId
    ? getNode(pirateNodeId).position
    : getNode(0).position;
  const marineOnePosition = marineOneNodeId
    ? getNode(marineOneNodeId).position
    : getNode(0).position;
  const marineTwoPosition = marineTwoNodeId
    ? getNode(marineTwoNodeId).position
    : getNode(0).position;
  const marineThreePosition = marineThreeNodeId
    ? getNode(marineThreeNodeId).position
    : getNode(0).position;

  useEffect(() => {
    initialize(cameraRef);
  }, [initialize]);

  return (
    <>
      {/* <axesHelper scale={10} /> */}
      <Light />
      <CameraControls ref={cameraRef} />
      {/* <Camera /> */}
      <Tween />
      <Map />
      <SelectableMarineNodeMarkerGroup />
      <AvailableNode />
      <Flags />
      <Graph />
      {socketMessage.game?.players && (
        <>
          <Piece
            name="PIRATE"
            position={piratePosition}
            pieceName={
              socketMessage.game?.players[0]["userInfo"]
                ? `${socketMessage.game?.players[0]["userInfo"]["productName"]}`
                : "PIRATE"
            }
            set={setPiratePiece}
          />
          <Piece
            name="MARINE1"
            position={marineOnePosition}
            pieceName={
              socketMessage.game?.players[1]["userInfo"]
                ? `${socketMessage.game?.players[1]["userInfo"]["productName"]}`
                : "MARINE1"
            }
            set={setMarineOnePiece}
          />
          <Piece
            name="MARINE2"
            position={marineTwoPosition}
            pieceName={
              socketMessage.game?.players[2]["userInfo"]
                ? `${socketMessage.game?.players[2]["userInfo"]["productName"]}`
                : "MARINE2"
            }
            set={setMarineTwoPiece}
          />
          <Piece
            name="MARINE3"
            position={marineThreePosition}
            pieceName={
              socketMessage.game?.players[3]["userInfo"]
                ? `${socketMessage.game?.players[3]["userInfo"]["productName"]}`
                : "MARINE3"
            }
            set={setMarineThreePiece}
          />
        </>
      )}
      <TreasureGroup />
    </>
  );
}
