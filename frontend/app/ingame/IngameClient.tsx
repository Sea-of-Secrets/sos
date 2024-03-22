"use client";

import React, { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";

import IngameThree from "./IngameThree";
import Loading from "./components/Loading";
import Round from "./components/Round";
import Turn from "./components/Turn";
import SystemPrompt from "./components/SystemPrompt";

import { gameSocket } from "~/sockets";
import { useGameLoading } from "./stores/useGameLoading";
import useNickname from "~/store/nickname";
import useGameId from "~/store/gameId";

import YsyTestController from "./test-components/YsyTestController";

const { connect, send, subscribe, disconnect } = gameSocket;

export default function IngameClient() {
  const { loading, setLoading } = useGameLoading();
  const { nickname } = useNickname();
  const { gameId, setGameId } = useGameId();

  const [socketData, setSocketData] = useState<any>();
  const [type, setType] = useState("미정");
  const [treasures, setTreasures] = useState([]);
  const [pirateRoute, setPirateRoute] = useState([]);
  const [marineOneRoute, setMarineOneRoute] = useState([]);
  const [marineTwoRoute, setMarineTwoRoute] = useState([]);
  const [marineThreeRoute, setMarineThreeRoute] = useState([]);
  const [turn, setTurn] = useState(1);
  const [round, setRound] = useState(1);

  // 게임 시작 타이머 알림
  const gameStart = () => {
    alert(`직업 : ${type}`);
  };

  const onConnect = () => {
    console.log("인게임 소켓 연결 완료");
    const gameIdFromLocalStorage = localStorage.getItem("gameId");
    if (gameIdFromLocalStorage) {
      const localGameId = JSON.parse(gameIdFromLocalStorage).state.gameId;

      // 해당 룸코드를 구독
      subscribe(`/sub/${localGameId}`, message => {
        const data = JSON.parse(message.body);
        if (data) {
          setSocketData(data);
        }
      });
    }
  };

  useEffect(() => {
    connect(onConnect);
    return () => {
      disconnect();
    };
  }, []);

  useEffect(() => {
    if (socketData) {
      console.log("socketData message : ", socketData.message);
      if (socketData.message === "RENDER_COMPLETE_ACCEPTED") {
        // 직업 세팅
        const players = socketData.game.players;
        const number = Object.keys(players).find(
          key => players[key] === nickname,
        );

        if (number === "0") {
          setType("pirate");
          setTreasures(socketData.game.treasures);
          // localStorage.setItem("type", "pirate");
          // localStorage.setItem(
          //   "treasures",
          //   JSON.stringify(socketData.game.treasures),
          // );
        } else if (number === "1") {
          setType("marineOne");
          // localStorage.setItem("type", "marineOne");
        } else if (number === "2") {
          setType("marineTwo");
          // localStorage.setItem("type", "marineTwo");
        } else if (number === "3") {
          setType("marineThree");
          // localStorage.setItem("type", "marineThree");
        }
      }

      // 게임 시작
      if (socketData.message === "ALL_RENDERED_COMPLETED") {
        gameStart();
      }

      if (socketData.message === "ORDER 뭐시기 해적턴입니다!!!") {
        ("해적 시작위치 고르는 액션 함수");
      }
    }
  }, [socketData]);

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
        onCreated={() => {
          setLoading(false);
          send("/pub/room", {
            message: "RENDERED_COMPLETE",
            sender: nickname,
            gameId,
          });
        }}
      >
        <IngameThree
        // nextMoveableNodes={nextMoveableNodes}
        // nextNodeEdge={nextNodeEdge}
        />
      </Canvas>
      {/* <EjjTestController
        newMoveableNodes={newMoveableNodes}
        setNextMoveableNodes={setNextMoveableNodes}
        newNodeEdge={newNodeEdge}
        setNextNodeEdge={setNextNodeEdge}
      /> */}
      <YsyTestController />
    </>
  );
}
