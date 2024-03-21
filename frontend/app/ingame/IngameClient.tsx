"use client";

import style from "./EventHandler.module.scss";

import React, { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";

import IngameThree from "./IngameThree";
import Loading from "./components/Loading";
import Round from "./components/Round";
import Turn from "./components/Turn";
import SystemPrompt from "./components/SystemPrompt";

import { gameSocket } from "~/sockets";
import YongSangYoonTestController from "./components/YongSangYoonTestController";

const { connect, send, subscribe, disconnect } = gameSocket;

// TODO: Canvas만 로딩됐다고 끝이 아니라 안에 모델, 텍스쳐도 다 로딩이 되어야함.
// 나중에 이 로딩을 상태관리로 만들자.
export default function IngameClient({ gameId }: { gameId: string }) {
  const [loading, setLoading] = useState(true);
  const [nowNode, setNowNode] = useState();
  const [nowNodePosition, setNowNodePosition] = useState([]);
  const [nextMoveableNodes, setNextMoveableNodes] = useState([]);
  const [nextNodeEdge, setNextNodeEdge] = useState([]);

  // 소켓 통신을 통해 받게 될 데이터
  const newMoveableNodes = [89, 106, 108, 126, 127, 128];
  const newNodeEdge = [
    [107, 309],
    [309, 106],
  ];

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
      <SystemPrompt />
      <Canvas
        camera={{
          position: [0, 800, 500],
          far: 10000,
          fov: 50,
        }}
        onCreated={() => setLoading(false)}
      >
        <IngameThree
          nextMoveableNodes={nextMoveableNodes}
          nextNodeEdge={nextNodeEdge}
        />
      </Canvas>
      {/* <EventHandler
        newMoveableNodes={newMoveableNodes}
        setNextMoveableNodes={setNextMoveableNodes}
        newNodeEdge={newNodeEdge}
        setNextNodeEdge={setNextNodeEdge}
      /> */}
      <YongSangYoonTestController />
    </>
  );
}

// function EventHandler({
//   newMoveableNodes,
//   setNextMoveableNodes,
//   newNodeEdge,
//   setNextNodeEdge,
// }: any) {
//   const { movePirate } = usePiece();
//   const { pieceCamera, mapCamera } = useCamera();
//   const [isNextMoveableNodes, setIsNextMoveableNodes] = useState(true);
//   const [isNewNodeEdge, setIsNewNodeEdge] = useState(true);
//   const [isFocused, setIsFocused] = useState(false);
//   const [isMoved, setIsMoved] = useState(false);

//   // 이동 가능 노드 표시
//   const handleNextMoveableNodes = () => {
//     setIsNextMoveableNodes(!isNextMoveableNodes);
//     setNextMoveableNodes(isNextMoveableNodes ? newMoveableNodes : []);
//   };

//   // 다음 노드 경로 표시
//   const handleNextNodeEdge = () => {
//     setIsNewNodeEdge(!isNewNodeEdge);
//     setNextNodeEdge(isNewNodeEdge ? newNodeEdge : []);
//   };

//   // 말 포커싱
//   const handleFocusPiece = () => {
//     if (!isFocused) {
//       pieceCamera([
//         INGAME_GRAPH["107"].position.x,
//         INGAME_GRAPH["107"].position.y,
//       ]);
//       setIsFocused(true);
//     } else {
//       mapCamera();
//       setIsFocused(false);
//     }
//   };

//   // 말 이동
//   const handleMovePiece = () => {
//     setIsMoved(!isMoved);
//     movePirate(
//       isMoved
//         ? [INGAME_GRAPH["107"].position.x, INGAME_GRAPH["107"].position.y]
//         : [-30, 100],
//     );
//   };

//   return (
//     <div className={style.box}>
//       <button className={style.greenbutton} onClick={handleNextMoveableNodes}>
//         {isNextMoveableNodes ? "이동 가능 노드 표시" : "이동 가능 노드 미표시"}
//       </button>
//       <button className={style.greenbutton} onClick={handleNextNodeEdge}>
//         {isNewNodeEdge ? "다음 경로 표시" : "다음 경로 미표시"}
//       </button>
//       <button className={style.greenbutton} onClick={handleFocusPiece}>
//         {isFocused ? "전체 포커싱" : "말 포커싱"}
//       </button>
//       <button className={style.greenbutton} onClick={handleMovePiece}>
//         말 이동
//       </button>
//     </div>
//   );
// }
