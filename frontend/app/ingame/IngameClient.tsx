"use client";

import style from "./EventHandler.module.scss";

import React, { useState, useRef, useEffect } from "react";
import { CameraControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import TWEEN from "@tweenjs/tween.js";

import usePiece from "~/store/piece";
import useCamera from "~/store/camera";

import Loading from "./components/Loading";
import Round from "./components/Round";
import Turn from "./components/Turn";

import Map from "./models/Map";
import Node from "./models/Node";
import Edge from "./models/Edge";
import Piece from "./models/Shiba";
import PieceStarlight from "./models/PieceStarlight";

import * as DUMMY_DATA from "../ingame/dummy-data";
import { gameSocket } from "~/sockets";

const { connect, send, subscribe, disconnect } = gameSocket;

// TODO: Canvas만 로딩됐다고 끝이 아니라 안에 모델, 텍스쳐도 다 로딩이 되어야함.
// 나중에 이 로딩을 상태관리로 만들자.
export default function IngameClient({ gameId }: { gameId: string }) {
  const [loading, setLoading] = useState(true);
  const [nowNode, setNowNode] = useState();
  const [nowNodePosition, setNowNodePosition] = useState([]);
  const [nextMoveableNodes, setNextMoveableNodes] = useState([]);
  const [nextNodeEdge, setNextNodeEdge] = useState([]);
  const cameraControlRef = useRef<CameraControls | null>(null!);
  const { camera, setCamera } = useCamera();

  // 소켓 통신을 통해 받게 될 데이터
  const newMoveableNodes = [89, 106, 108, 126, 127, 128];
  const newNodeEdge = [
    [107, 309],
    [309, 106],
  ];

  // 말 이동 프레임별 업데이트
  const Tween = () => {
    useFrame(() => {
      TWEEN.update();
    });
    return null;
  };

  // const onConnect = useCallback(() => {
  //   console.log("Hello Socket!");
  // }, []);

  useEffect(() => {
    setCamera(cameraControlRef.current);
  }, [cameraControlRef.current]);

  useEffect(() => {
    connect;

    return () => {
      disconnect;
    };
  }, []);

  return (
    <>
      {loading && <Loading />}
      <Round topLeft={[60, 1]} />
      <Turn topLeft={[360, 1]} currentTurn={1} />
      <Canvas
        camera={{
          position: [0, 800, 500],
          far: 10000,
          fov: 50,
        }}
        onCreated={() => setLoading(false)}
      >
        <Tween />
        <CameraControls ref={cameraControlRef} />
        <directionalLight color="#FFFFFF" intensity={1} position={[5, 5, 5]} />
        <axesHelper scale={10} />
        <IngameThree
          nextMoveableNodes={nextMoveableNodes}
          nextNodeEdge={nextNodeEdge}
        />
      </Canvas>
      <EventHandler
        newMoveableNodes={newMoveableNodes}
        setNextMoveableNodes={setNextMoveableNodes}
        newNodeEdge={newNodeEdge}
        setNextNodeEdge={setNextNodeEdge}
      />
    </>
  );
}

function IngameThree({ nextMoveableNodes, nextNodeEdge }: any) {
  // 여기서 좀 빵빵해질듯...? 소켓 코드랑...
  const renderedEdges = new Set();

  return (
    <>
      {/* Nodes */}
      {DUMMY_DATA.nodeList.map(node => {
        if (
          (node.nodeId >= 1 && node.nodeId <= 189) ||
          (node.nodeId >= 200 && node.nodeId <= 373)
        ) {
          return (
            <Node
              key={node.nodeId}
              node={node}
              isNextMoveableNode={
                nextMoveableNodes?.includes(node.nodeId) ? true : false
              }
            />
          );
        }
      })}

      {/* Edges */}
      {DUMMY_DATA.edgeList.slice(199).map((edges, index) => {
        return edges.map(edge => {
          // 중복 간선 방지
          const edgeKey = `${index + 200}-${edge}`;
          const reEdgeKey = `${edge}-${index + 200}`;
          if (renderedEdges.has(edgeKey) || renderedEdges.has(reEdgeKey)) {
            return null;
          }
          renderedEdges.add(edgeKey);
          return (
            <Edge
              key={edgeKey}
              position={[
                DUMMY_DATA.nodeArr[edge],
                DUMMY_DATA.nodeArr[index + 200],
              ]}
              isNextNodeEdge={nextNodeEdge.some(
                ([start, end]: number[]) =>
                  (start === index + 200 && end === edge) ||
                  (start === edge && end === index + 200),
              )}
            />
          );
        });
      })}

      {/* Pieces */}
      <Piece position={DUMMY_DATA.nodeArr[107]} />
      {/* TODO: 말이 잘 안보일 수 있으니 모든 플레이어의 말에 빛이나는 솔로 */}
      <PieceStarlight position={DUMMY_DATA.nodeArr[107]} />
      <Map />
    </>
  );
}

function EventHandler({
  newMoveableNodes,
  setNextMoveableNodes,
  newNodeEdge,
  setNextNodeEdge,
}: any) {
  const { movePirate } = usePiece();
  const { pieceCamera, mapCamera } = useCamera();
  const [isNextMoveableNodes, setIsNextMoveableNodes] = useState(true);
  const [isNewNodeEdge, setIsNewNodeEdge] = useState(true);
  const [isFocused, setIsFocused] = useState(false);
  const [isMoved, setIsMoved] = useState(false);

  // 이동 가능 노드 표시
  const handleNextMoveableNodes = () => {
    setIsNextMoveableNodes(!isNextMoveableNodes);
    setNextMoveableNodes(isNextMoveableNodes ? newMoveableNodes : []);
  };

  // 다음 노드 경로 표시
  const handleNextNodeEdge = () => {
    setIsNewNodeEdge(!isNewNodeEdge);
    setNextNodeEdge(isNewNodeEdge ? newNodeEdge : []);
  };

  // 말 포커싱
  const handleFocusPiece = () => {
    if (!isFocused) {
      pieceCamera(DUMMY_DATA.nodeArr[107]);
      setIsFocused(true);
    } else {
      mapCamera();
      setIsFocused(false);
    }
  };

  // 말 이동
  const handleMovePiece = () => {
    setIsMoved(!isMoved);
    movePirate(isMoved ? DUMMY_DATA.nodeArr[107] : [-30, 100]);
  };

  return (
    <div className={style.box}>
      <button className={style.greenbutton} onClick={handleNextMoveableNodes}>
        {isNextMoveableNodes ? "이동 가능 노드 표시" : "이동 가능 노드 미표시"}
      </button>
      <button className={style.greenbutton} onClick={handleNextNodeEdge}>
        {isNewNodeEdge ? "다음 경로 표시" : "다음 경로 미표시"}
      </button>
      <button className={style.greenbutton} onClick={handleFocusPiece}>
        {isFocused ? "전체 포커싱" : "말 포커싱"}
      </button>
      <button className={style.greenbutton} onClick={handleMovePiece}>
        말 이동
      </button>
    </div>
  );
}
