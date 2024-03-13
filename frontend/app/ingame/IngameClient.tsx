"use client";

import style from "./EventHandler.module.scss";
import React, { useCallback, useEffect, useState, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, CameraControls } from "@react-three/drei";

import Loading from "./components/Loading";
import Map from "./models/Map";
import Node from "./models/Node";
import Edge from "./models/Edge";
import Piece from "./models/Shiba";

import * as DUMMY_DATA from "../ingame/dummy-data";
import { gameSocket } from "~/sockets";

// TODO: Canvas만 로딩됐다고 끝이 아니라 안에 모델, 텍스쳐도 다 로딩이 되어야함.
// 나중에 이 로딩을 상태관리로 만들자.
export default function IngameClient({ gameId }: { gameId: string }) {
  const [loading, setLoading] = useState(true);
  // const [nowNode, setNowNode] = useState();
  // const [nowNodePosition, setNowNodePosition] = useState();
  const cameraPosition = [0, 700, 500];

  // 다음으로 이동 가능한 노드 리스트
  const [nextMoveableNodes, setNextMoveableNodes] = useState([]);
  const cameraControlRef = useRef<CameraControls | null>(null);

  // 소켓 통신을 통해 받게 된 정보
  const nowNode = 107;
  const nowNodePosition = [
    DUMMY_DATA.nodeArr[nowNode][0],
    30,
    DUMMY_DATA.nodeArr[nowNode][1],
  ];
  const newMoveableNodes = [89, 106, 108, 126, 127, 128];

  const onConnect = useCallback(() => {
    console.log("Hello Socket!");
  }, []);

  useEffect(() => {
    gameSocket.connect(onConnect);

    return () => {
      gameSocket.disconnect();
    };
  }, [onConnect]);

  return (
    <>
      {loading && <Loading />}
      <Canvas
        camera={{
          position: [0, 700, 500],
          far: 10000,
          fov: 50,
        }}
        onCreated={() => setLoading(false)}
      >
        <CameraControls ref={cameraControlRef} />
        <directionalLight position={[1, 1, 1]} />
        <ambientLight intensity={2} />
        {/* <OrbitControls target={[0, 1, 0]} /> */}
        <axesHelper scale={10} />
        <IngameThree nextMoveableNodes={nextMoveableNodes} />
      </Canvas>
      <EventHandler
        newMoveableNodes={newMoveableNodes}
        setNextMoveableNodes={setNextMoveableNodes}
        cameraControlRef={cameraControlRef}
        nowNodePosition={nowNodePosition}
      />
    </>
  );
}

function IngameThree({ nextMoveableNodes }: any) {
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
              nextMoveableNodes={nextMoveableNodes}
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
                DUMMY_DATA.nodeArr[index + 200],
                DUMMY_DATA.nodeArr[edge],
              ]}
            />
          );
        });
      })}

      {/* Pieces */}
      <Piece position={DUMMY_DATA.nodeArr[107]} />
      <Map />
    </>
  );
}

function EventHandler({
  newMoveableNodes,
  setNextMoveableNodes,
  cameraControlRef,
  nowNodePosition,
}: any) {
  const movePiece = () => {};
  const [isNextMoveableNodes, setIsNextMoveableNodes] = useState(true);

  const handleNextMoveableNodes = () => {
    setIsNextMoveableNodes(!isNextMoveableNodes);
    setNextMoveableNodes(isNextMoveableNodes ? newMoveableNodes : null);
  };

  const focusPiece = () => {
    cameraControlRef.current?.setLookAt(
      0,
      100,
      50,
      nowNodePosition[0],
      100,
      nowNodePosition[2],
      true,
    );
    cameraControlRef.current?.zoomTo(1, true);
  };

  return (
    <div className={style.box}>
      <button className={style.greenbutton} onClick={handleNextMoveableNodes}>
        {isNextMoveableNodes ? "이동 가능 노드 표시" : "이동 가능 노드 미표시"}
      </button>
      <button className={style.greenbutton} onClick={focusPiece}>
        말 포커싱
      </button>
      <button className={style.redbutton} onClick={movePiece}>
        말 이동
      </button>
    </div>
  );
}
