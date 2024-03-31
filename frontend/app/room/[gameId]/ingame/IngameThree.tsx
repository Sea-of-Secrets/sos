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
import { Canvas } from "@react-three/fiber";

export default function IngameThree() {
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

  return (
    <>
      {/* <axesHelper scale={10} /> */}
      <Light />
      <Camera />
      <Tween />
      <Map />
      <SelectableMarineNodeMarkerGroup />
      <AvailableNode />
      <Flags />
      <Graph />
      {socketMessage && (
        <>
          <Piece
            name="PIRATE"
            position={piratePosition}
            pieceName="PIRATE"
            set={setPiratePiece}
          />
          <Piece
            name="MARINE1"
            position={marineOnePosition}
            pieceName="MARINE1"
            set={setMarineOnePiece}
          />
          <Piece
            name="MARINE2"
            position={marineTwoPosition}
            pieceName="MARINE2"
            set={setMarineTwoPiece}
          />
          <Piece
            name="MARINE3"
            position={marineThreePosition}
            pieceName="MARINE3"
            set={setMarineThreePiece}
          />
        </>
      )}
      {/* <Canvas> */}
      <TreasureGroup />
      {/* </Canvas> */}
    </>
  );
}
