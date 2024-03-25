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
import { useGameData } from "./stores/useGameData";
import { useSystemPrompt } from "./stores/useSystemPrompt";
import useNickname from "~/store/nickname";
import useGameId from "~/store/gameId";

import YsyTestController from "./test-components/YsyTestController";
import { useCamera } from "./stores/useCamera";

const { connect, send, subscribe, disconnect } = gameSocket;

export default function IngameClient() {
  const { loading, setLoading } = useGameLoading();
  const { nickname } = useNickname();
  const { gameId } = useGameId();
  const { gameStartAnimation } = useCamera();

  const [socketMessage, setSocketMessage] = useState<any>();

  const {
    headerMessage,
    setHeaderMessage,
    removeHeaderMessage,
    footerMessage,
    setFooterMessage,
    removeFooterMessage,
  } = useSystemPrompt();

  const {
    type,
    setType,
    treasures,
    setTreasures,
    pirateRoute,
    setPirateRoute,
    marineOneRoute,
    setMarineOneRoute,
    marineTwoRoute,
    setMarineTwoRoute,
    marineThreeRoute,
    setMarineThreeRoute,
  } = useGameData();

  const [turn, setTurn] = useState(1);
  const [round, setRound] = useState(1);

  // 게임 시작
  const startAnimation = () => {
    // 애니메이션 실행
    gameStartAnimation();
    // 애니메이션 끝났다고 알림
    send("/pub/room", {
      message: "START_GAME",
      sender: nickname,
      gameId,
    });
  };

  // 해적 시작 지점 지정
  const initPirateStart = () => {
    setHeaderMessage("당신의 출발지를 결정해라");
    setFooterMessage(<div></div>);
  };

  useEffect(() => {
    if (socketMessage) {
      console.log("소켓 메세지", socketMessage);
      if (socketMessage.message === "RENDER_COMPLETE_ACCEPTED") {
        // 직업 세팅
        const players = socketMessage.game.players;
        const number = Object.keys(players).find(
          key => players[key]["nickname"] === nickname,
        );

        if (number === "0") {
          setType("pirate");
          setTreasures(socketMessage.game.treasures);
        } else if (number === "1") {
          setType("marineOne");
        } else if (number === "2") {
          setType("marineTwo");
        } else if (number === "3") {
          setType("marineThree");
        }
      }

      // 게임 시작
      if (socketMessage.message === "ALL_RENDERED_COMPLETED") {
        startAnimation();
      }

      // 해적의 시작위치 지정 명령
      if (
        socketMessage.message === "ORDER_INIT_PIRATE_START" &&
        type === "pirate"
      ) {
        initPirateStart();
      }
    }
  }, [socketMessage]);

  const onConnect = () => {
    const gameIdFromLocalStorage = localStorage.getItem("gameId");
    console.log("인게임 소켓 연결 완료");
    if (gameIdFromLocalStorage) {
      const localGameId = JSON.parse(gameIdFromLocalStorage).state.gameId;

      // 해당 룸코드를 구독
      subscribe(`/sub/${localGameId}`, message => {
        const data = JSON.parse(message.body);
        if (data) {
          setSocketMessage(data);
        }
      });
    }
  };

  useEffect(() => {
    if (!loading && gameId && nickname) {
      send("/pub/room", {
        message: "RENDERED_COMPLETE",
        sender: nickname,
        gameId,
      });
    }
  }, [loading, gameId, nickname]);

  useEffect(() => {
    connect(onConnect);
    return () => {
      disconnect();
    };
  }, []);

  return (
    <>
      {loading && <Loading />}
      <Round topLeft={[60, 1]} />
      <Turn topLeft={[360, 1]} currentTurn={turn} />
      <SystemPrompt />
      <Canvas
        camera={{
          position: [0, 200, 300],
          far: 10000,
          fov: 50,
        }}
        onCreated={() => {
          setLoading(false);
        }}
      >
        <IngameThree />
      </Canvas>
      <YsyTestController />
    </>
  );
}
