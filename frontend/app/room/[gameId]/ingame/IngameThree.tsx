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
import { Suspense, useEffect, useRef } from "react";
import { CameraControls } from "@react-three/drei";
import { useCamera } from "./stores/useCamera";
import Loading from "./components/Loading";
import PieceEffect from "./models/Piece/PieceEffect";

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

  const TEMP_KEY = window.localStorage.getItem("TEMP_KEY");

  return (
    <>
      <CameraControls ref={cameraRef} />
      <Suspense fallback={<Loading />}>
        <Light />
        <Tween />
        <Map />
        <SelectableMarineNodeMarkerGroup />
        <AvailableNode />
        <Flags />
        <Graph />
        <TreasureGroup />
        {socketMessage ? (
          <>
            {socketMessage.game?.players &&
              socketMessage.game?.gameMode === "ONE_VS_THREE" && (
                <>
                  <Piece
                    name="PIRATE"
                    position={piratePosition}
                    pieceName={
                      socketMessage.game?.players[0]["userInfo"]?.[
                        "productName"
                      ]
                        ? `${socketMessage.game?.players[0]["userInfo"]["productName"]?.toLowerCase()}`
                        : "PIRATE"
                    }
                    set={setPiratePiece}
                  />

                  <Piece
                    name="MARINE1"
                    position={marineOnePosition}
                    pieceName={
                      socketMessage.game?.players[1]["userInfo"]?.[
                        "productName"
                      ]
                        ? `${socketMessage.game?.players[1]["userInfo"]["productName"]?.toLowerCase()}`
                        : "common1"
                    }
                    set={setMarineOnePiece}
                  />

                  <Piece
                    name="MARINE2"
                    position={marineTwoPosition}
                    pieceName={
                      socketMessage.game?.players[2]["userInfo"]?.[
                        "productName"
                      ]
                        ? `${socketMessage.game?.players[2]["userInfo"]["productName"]?.toLowerCase()}`
                        : "common2"
                    }
                    set={setMarineTwoPiece}
                  />

                  <Piece
                    name="MARINE3"
                    position={marineThreePosition}
                    pieceName={
                      socketMessage.game?.players[3]["userInfo"]?.[
                        "productName"
                      ]
                        ? `${socketMessage.game?.players[3]["userInfo"]["productName"]?.toLowerCase()}`
                        : "common3"
                    }
                    set={setMarineThreePiece}
                  />
                  <PieceEffect
                    effectName="GOLD_EFFECT1"
                    position={piratePosition}
                  />
                  <PieceEffect
                    effectName="GOLD_EFFECT2"
                    position={marineOnePosition}
                  />
                  <PieceEffect
                    effectName="GOLD_EFFECT3"
                    position={marineTwoPosition}
                  />
                  <PieceEffect
                    effectName="GOLD_EFFECT4"
                    position={marineThreePosition}
                  />
                </>
              )}
            {socketMessage.game?.players &&
              socketMessage.game?.gameMode === "ONE_VS_ONE" && (
                <>
                  {TEMP_KEY === "유일무이이주희" ? (
                    <>
                      <Piece
                        name="PIRATE"
                        position={piratePosition}
                        pieceName={"PIRATE"}
                        set={setPiratePiece}
                      />
                      <Piece
                        name="MARINE1"
                        position={marineOnePosition}
                        pieceName={"common2"}
                        set={setMarineOnePiece}
                      />
                      <Piece
                        name="MARINE2"
                        position={marineTwoPosition}
                        pieceName={"common2"}
                        set={setMarineTwoPiece}
                      />
                      <Piece
                        name="MARINE3"
                        position={marineThreePosition}
                        pieceName={"common2"}
                        set={setMarineThreePiece}
                      />
                    </>
                  ) : (
                    <>
                      <Piece
                        name="PIRATE"
                        position={piratePosition}
                        pieceName={
                          socketMessage.game?.players[0]["userInfo"]?.[
                            "productName"
                          ]
                            ? `${socketMessage.game?.players[0]["userInfo"]["productName"]?.toLowerCase()}`
                            : "PIRATE"
                        }
                        set={setPiratePiece}
                      />
                      <Piece
                        name="MARINE1"
                        position={marineOnePosition}
                        pieceName={
                          socketMessage.game?.players[1]["userInfo"]?.[
                            "productName"
                          ]
                            ? `${socketMessage.game?.players[1]["userInfo"]["productName"]?.toLowerCase()}`
                            : "common1"
                        }
                        set={setMarineOnePiece}
                      />
                      <Piece
                        name="MARINE2"
                        position={marineTwoPosition}
                        pieceName={"common2"}
                        set={setMarineTwoPiece}
                      />
                      <Piece
                        name="MARINE3"
                        position={marineThreePosition}
                        pieceName={"common3"}
                        set={setMarineThreePiece}
                      />
                    </>
                  )}

                  <PieceEffect
                    effectName="GOLD_EFFECT1"
                    position={piratePosition}
                  />
                  <PieceEffect
                    effectName="GOLD_EFFECT2"
                    position={marineOnePosition}
                  />
                  <PieceEffect
                    effectName="GOLD_EFFECT3"
                    position={marineTwoPosition}
                  />
                  <PieceEffect
                    effectName="GOLD_EFFECT4"
                    position={marineThreePosition}
                  />
                </>
              )}
          </>
        ) : (
          <>
            <Piece
              name="PIRATE"
              position={getNode(0).position}
              pieceName={"PIRATE"}
              set={setPiratePiece}
            />
            <Piece
              name="PIRATE"
              position={getNode(0).position}
              pieceName={"SHIBA"}
              set={setPiratePiece}
            />
            <Piece
              name="PIRATE"
              position={getNode(0).position}
              pieceName={"고잉메리호"}
              set={setPiratePiece}
            />
            <Piece
              name="PIRATE"
              position={getNode(0).position}
              pieceName={"청새치호"}
              set={setPiratePiece}
            />
            <Piece
              name="PIRATE"
              position={getNode(0).position}
              pieceName={"베를린호"}
              set={setPiratePiece}
            />
            <Piece
              name="PIRATE"
              position={getNode(0).position}
              pieceName={"rare1"}
              set={setPiratePiece}
            />
            <Piece
              name="PIRATE"
              position={getNode(0).position}
              pieceName={"rare2"}
              set={setPiratePiece}
            />
            <Piece
              name="PIRATE"
              position={getNode(0).position}
              pieceName={"rare3"}
              set={setPiratePiece}
            />
            <Piece
              name="PIRATE"
              position={getNode(0).position}
              pieceName={"common1"}
              set={setPiratePiece}
            />
            <Piece
              name="MARINE1"
              position={getNode(0).position}
              pieceName={"common2"}
              set={setMarineOnePiece}
            />
            <Piece
              name="MARINE1"
              position={getNode(0).position}
              pieceName={"common3"}
              set={setMarineOnePiece}
            />
            <Piece
              name="MARINE1"
              position={getNode(0).position}
              pieceName={"zuhee"}
              set={setMarineOnePiece}
            />
            <Piece
              name="MARINE1"
              position={getNode(0).position}
              pieceName={"낡은 배"}
              set={setMarineOnePiece}
            />
            <Piece
              name="MARINE1"
              position={getNode(0).position}
              pieceName={"세련된 요트"}
              set={setMarineOnePiece}
            />
            <Piece
              name="MARINE1"
              position={getNode(0).position}
              pieceName={"민초배"}
              set={setMarineOnePiece}
            />
            <Piece
              name="MARINE1"
              position={getNode(0).position}
              pieceName={"유령선"}
              set={setMarineOnePiece}
            />
            <Piece
              name="MARINE2"
              position={getNode(0).position}
              pieceName={"MARINE2"}
              set={setMarineTwoPiece}
            />
            <Piece
              name="MARINE3"
              position={getNode(0).position}
              pieceName={"MARINE3"}
              set={setMarineThreePiece}
            />
          </>
        )}
      </Suspense>
    </>
  );
}
