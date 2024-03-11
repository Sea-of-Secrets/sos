"use client";

import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import Loading from "./components/Loading";
import Map from "./models/Map";

import * as DUMMY_DATA from "../ingame/dummy-data";
import Node from "./models/Node";
import Edge from "./models/Edge";

// TODO: Canvas만 로딩됐다고 끝이 아니라 안에 모델, 텍스쳐도 다 로딩이 되어야함.
// 나중에 이 로딩을 상태관리로 만들자.
export default function IngameClient({ gameId }: { gameId: string }) {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <Loading />}
      <Canvas
        camera={{ position: [0, 700, 500], far: 10000, fov: 50 }}
        onCreated={() => setLoading(false)}
      >
        <directionalLight position={[1, 1, 1]} />
        <ambientLight intensity={2} />
        <OrbitControls target={[0, 1, 0]} />
        <axesHelper scale={10} />
        <IngameThree />
      </Canvas>
    </>
  );
}

function IngameThree() {
  // 여기서 좀 빵빵해질듯...? 소켓 코드랑...
  const renderedEdges = new Set();
  console.log(renderedEdges);

  return (
    <>
      {DUMMY_DATA.nodeList.map(node => {
        // 도둑 노드
        if (node.nodeId >= 1 && node.nodeId <= 189) {
          return <Node key={node.nodeId} node={node} />;
        }
        // 경찰 노드
        else if (node.nodeId >= 200 && node.nodeId <= 373) {
          return <Node key={node.nodeId} node={node} />;
        }
      })}
      {/* Edges */}
      {DUMMY_DATA.edgeList.slice(200).map((edges, index) => {
        return edges.map(edge => {
          // 중복 간선 방지
          const edgeKey = `${index + 201}-${edge}`;
          const reEdgeKey = `${edge}-${index + 201}`;
          if (renderedEdges.has(edgeKey) || renderedEdges.has(reEdgeKey)) {
            return null;
          }
          renderedEdges.add(edgeKey);

          return (
            <Edge
              key={edgeKey}
              position={[
                DUMMY_DATA.nodeArr[index + 201],
                DUMMY_DATA.nodeArr[edge],
              ]}
            />
          );
        });
      })}
      <Map />
    </>
  );
}
