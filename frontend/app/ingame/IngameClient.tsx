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
import { useNode } from "./hooks/useNode";
import { getNode, marineStartList } from "~/_lib/data/data";

const { connect, send, subscribe, disconnect } = gameSocket;

export default function IngameClient() {
  const { loading, setLoading } = useGameLoading();
  const { nickname } = useNickname();
  const { gameId } = useGameId();
  const { zoom, zoomFullScreen, gameStartAnimation } = useCamera();

  const [socketMessage, setSocketMessage] = useState<any>();
  const [timeOut, setTimeOut] = useState(false);

  const {
    setHeaderMessage,
    removeHeaderMessage,
    setFooterMessage,
    removeFooterMessage,
  } = useSystemPrompt();

  const {
    type,
    treasures,
    pirateRoute,
    marineOneRoute,
    marineTwoRoute,
    marineThreeRoute,
    currentPosition,
    setType,
    setTreasures,
    setPirateRoute,
    setMarineOneRoute,
    setMarineTwoRoute,
    setMarineThreeRoute,
    setPirateCurrentPosition,
    setMarineOneCurrentPosition,
    setMarineTwoCurrentPosition,
    setMarineThreeCurrentPosition,
  } = useGameData();

  const [turn, setTurn] = useState(1);
  const [round, setRound] = useState(1);

  // 게임 시작
  const startAnimation = () => {
    // TODO : 애니메이션 실행
    gameStartAnimation();

    // 애니메이션 끝났다고 알림
    send("/pub/init", {
      message: "START_GAME",
      sender: nickname,
      gameId,
    });
  };

  // 해적의 시작위치 지정 명령
  const orderInitPirateStart = () => {
    if (type === "pirate") {
      setHeaderMessage("시작 위치를 결정하세요");
      // TODO : 푸터에 4가지 선택지 나오고 마우스 호버 시, 카메라 이동
      setFooterMessage(
        <div
          onClick={() => {
            const keys = Object.keys(treasures);
            const randomIndex = Math.floor(Math.random() * keys.length);
            const randomKey = parseInt(keys[randomIndex]);
            // 포지션 변경 여기서 해줘야 에러 안남
            setPirateCurrentPosition(randomKey);

            send("/pub/init", {
              message: "INIT_PIRATE_START",
              sender: nickname,
              gameId,
              node: randomKey, // TODO : 클릭한 노드로 변경
            });
          }}
        >
          클릭해주세요
        </div>,
      );
    } else {
      setHeaderMessage(
        `[해적] ${socketMessage.game.players[0]["nickname"]} 님이 시작 위치를 결정중입니다`,
      );
    }
  };

  // 해적의 시작위치 지정 완료
  const actionInitPirateStart = () => {
    if (type === "pirate") {
      // 시간 초과 여부에 따라 메시지 출력
      setHeaderMessage(
        timeOut
          ? "시간초과! 시작 위치가 랜덤으로 결정되었습니다"
          : "시작 위치가 결정되었습니다",
      );
      // 해당 노드 줌 인
      zoom(getNode(currentPosition[0]).position);
      // TODO : 피스 등장 이펙트
    } else {
      setHeaderMessage("해적의 시작 위치가 결정되었습니다");
    }

    // 푸터, 시간초과 초기화
    setTimeOut(false);
    removeFooterMessage();
  };

  // 해군 1의 시작위치 지정 명령
  const orderInitMarineOneStart = () => {
    if (type === "marineOne") {
      setHeaderMessage("시작 위치를 결정하세요");
      // TODO : 푸터에 6가지 선택지 나오고 마우스 호버 시, 카메라 이동
      const marineOneStartList = marineStartList;
      setFooterMessage(
        <>
          {marineOneStartList.map(nodeId => (
            <div
              key={nodeId}
              onClick={() => {
                setMarineOneCurrentPosition(nodeId);
                send("/pub/init", {
                  message: "INIT_MARINE_ONE_START",
                  sender: nickname,
                  gameId,
                  node: nodeId,
                });
              }}
            >
              {nodeId}번
            </div>
          ))}
        </>,
      );
    } else {
      setHeaderMessage(
        `[해군1] ${socketMessage.game.players[1]["nickname"]} 님이 시작 위치를 결정중입니다`,
      );
    }
  };

  // 해군 1의 시작위치 지정 완료
  const actionInitMarineOneStart = () => {
    if (type === "marineOne") {
      // 시간 초과 여부에 따라 메시지 출력
      setHeaderMessage(
        timeOut
          ? "시간초과! 시작 위치가 랜덤으로 결정되었습니다"
          : "시작 위치가 결정되었습니다",
      );
      // TODO : 피스 등장 이펙트
    } else {
      setHeaderMessage(
        `[해군1] ${socketMessage.game.players[1]["nickname"]} 님의 시작 위치가 결정되었습니다`,
      );
    }

    // 푸터, 시간초과 초기화
    setTimeOut(false);
    removeFooterMessage();
    // 해당 노드 줌 인
    zoom(getNode(currentPosition[1]).position);
  };

  // 해군 2의 시작위치 지정 명령
  const orderInitMarineTwoStart = () => {
    if (type === "marineTwo") {
      setHeaderMessage("시작 위치를 결정하세요");
      // TODO : 푸터에 5가지 선택지 나오고 마우스 호버 시, 카메라 이동
      const marineTwoStartList = marineStartList.filter(
        nodeId => nodeId !== currentPosition[1],
      );
      setFooterMessage(
        <>
          {marineTwoStartList.map(nodeId => (
            <div
              key={nodeId}
              onClick={() => {
                setMarineTwoCurrentPosition(nodeId);
                send("/pub/init", {
                  message: "INIT_MARINE_TWO_START",
                  sender: nickname,
                  gameId,
                  node: nodeId,
                });
              }}
            >
              {nodeId}번
            </div>
          ))}
        </>,
      );
    } else {
      setHeaderMessage(
        `[해군2] ${socketMessage.game.players[2]["nickname"]} 님이 시작 위치를 결정중입니다`,
      );
    }
  };

  // 해군 2의 시작위치 지정 완료
  const actionInitMarineTwoStart = () => {
    if (type === "marineTwo") {
      // 시간 초과 여부에 따라 메시지 출력
      setHeaderMessage(
        timeOut
          ? "시간초과! 시작 위치가 랜덤으로 결정되었습니다"
          : "시작 위치가 결정되었습니다",
      );
      // TODO : 피스 등장 이펙트
    } else {
      setHeaderMessage(
        `[해군2] ${socketMessage.game.players[2]["nickname"]} 님의 시작 위치가 결정되었습니다`,
      );
    }

    // 푸터, 시간초과 초기화
    setTimeOut(false);
    removeFooterMessage();
    // 해당 노드 줌 인
    zoom(getNode(currentPosition[2]).position);
  };

  // 해군 3의 시작위치 지정 명령
  const orderInitMarineThreeStart = () => {
    if (type === "marineThree") {
      setHeaderMessage("시작 위치를 결정하세요");
      // TODO : 푸터에 4가지 선택지 나오고 마우스 호버 시, 카메라 이동
      const marineThreeStartList = marineStartList.filter(
        nodeId =>
          nodeId !== currentPosition[1] && nodeId !== currentPosition[2],
      );
      setFooterMessage(
        <>
          {marineThreeStartList.map(nodeId => (
            <div
              key={nodeId}
              onClick={() => {
                setMarineThreeCurrentPosition(nodeId);
                send("/pub/init", {
                  message: "INIT_MARINE_THREE_START",
                  sender: nickname,
                  gameId,
                  node: nodeId,
                });
              }}
            >
              {nodeId}번
            </div>
          ))}
        </>,
      );
    } else {
      setHeaderMessage(
        `[해군3] ${socketMessage.game.players[3]["nickname"]} 님이 시작 위치를 결정중입니다`,
      );
    }
  };

  // 해군 3의 시작위치 지정 완료
  const actionInitMarineThreeStart = () => {
    if (type === "marineThree") {
      // 시간 초과 여부에 따라 메시지 출력
      setHeaderMessage(
        timeOut
          ? "시간초과! 시작 위치가 랜덤으로 결정되었습니다"
          : "시작 위치가 결정되었습니다",
      );
      // TODO : 피스 등장 이펙트
    } else {
      setHeaderMessage(
        `[해군3] ${socketMessage.game.players[3]["nickname"]} 님의 시작 위치가 결정되었습니다`,
      );
    }

    // 푸터, 시간초과 초기화
    setTimeOut(false);
    removeFooterMessage();
    // 해당 노드 줌 인
    zoom(getNode(currentPosition[2]).position);
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
      if (socketMessage.message === "ORDER_INIT_PIRATE_START") {
        orderInitPirateStart();
      }

      // 해적의 시작위치 지정 완료
      if (socketMessage.message === "ACTION_INIT_PIRATE_START") {
        actionInitPirateStart();
      }

      // 해적의 시작위치 지정 시간초과
      if (socketMessage.message === "INIT_PIRATE_START_TIME_OUT") {
        setTimeOut(true);
      }

      // 해군 1의 시작위치 지정 명령
      if (socketMessage.message === "ORDER_INIT_MARINE_ONE_START") {
        orderInitMarineOneStart();
      }

      // 해군 1의 시작위치 지정 완료
      if (socketMessage.message === "ACTION_INIT_MARINE_ONE_START") {
        actionInitMarineOneStart();
      }

      // 해군 1의 시작위치 지정 시간초과
      if (socketMessage.message === "INIT_MARINE_ONE_START_TIME_OUT") {
        setTimeOut(true);
      }

      // 해군 2의 시작위치 지정 명령
      if (socketMessage.message === "ORDER_INIT_MARINE_TWO_START") {
        orderInitMarineTwoStart();
      }

      // 해군 2의 시작위치 지정 완료
      if (socketMessage.message === "ACTION_INIT_MARINE_TWO_START") {
        actionInitMarineTwoStart();
      }

      // 해군 2의 시작위치 지정 시간초과
      if (socketMessage.message === "INIT_MARINE_TWO_START_TIME_OUT") {
        setTimeOut(true);
      }

      // 해군 3의 시작위치 지정 명령
      if (socketMessage.message === "ORDER_INIT_MARINE_THREE_START") {
        orderInitMarineThreeStart();
      }

      // 해군 3의 시작위치 지정 완료
      if (socketMessage.message === "ACTION_INIT_MARINE_THREE_START") {
        actionInitMarineThreeStart();
      }

      // 해군 3의 시작위치 지정 시간초과
      if (socketMessage.message === "INIT_MARINE_THREE_START_TIME_OUT") {
        setTimeOut(true);
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
    if (!loading) {
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
