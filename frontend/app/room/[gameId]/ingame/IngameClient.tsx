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

import { useCamera } from "./stores/useCamera";
import { getNode, marineStartList } from "~/_lib/data/data";
import { useSocketMessage } from "./stores/useSocketMessage";

const { send } = gameSocket;

export default function IngameClient() {
  const { loading, setLoading } = useGameLoading();
  const { nickname } = useNickname();
  const { gameId } = useGameId();
  const { zoom, zoomFullScreen, gameStartAnimation } = useCamera();

  const { socketMessage } = useSocketMessage();
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
    if (type.includes("pirate")) {
      setHeaderMessage("시작 위치를 결정하세요");
      // TODO : 푸터에 4가지 선택지 나오고 마우스 호버 시, 카메라 이동
      setFooterMessage(
        <button
          onClick={() => {
            const keys = Object.keys(treasures);
            const randomIndex = Math.floor(Math.random() * keys.length);
            const randomKey = parseInt(keys[randomIndex]);

            send("/pub/init", {
              message: "INIT_PIRATE_START",
              sender: nickname,
              gameId,
              node: randomKey, // TODO : 클릭한 노드로 변경
            });
          }}
        >
          클릭해주세요
        </button>,
      );
    } else {
      setHeaderMessage(
        `[해적] ${socketMessage.game.players[0]["nickname"]} 님이 시작 위치를 결정중입니다`,
      );
    }
  };

  // 해적의 시작위치 지정 완료
  const actionInitPirateStart = () => {
    if (type.includes("pirate")) {
      // 시간 초과 여부에 따라 메시지 출력
      setHeaderMessage(
        timeOut
          ? "시간초과! 시작 위치가 랜덤으로 결정되었습니다"
          : "시작 위치가 결정되었습니다",
      );
      // 해당 노드 줌 인
      zoom(getNode(socketMessage.game.currentPosition[0]).position);
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
    if (type.includes("marineOne")) {
      setHeaderMessage("시작 위치를 결정하세요");
      // TODO : 푸터에 6가지 선택지 나오고 마우스 호버 시, 카메라 이동
      const marineOneStartList = marineStartList;
      setFooterMessage(
        <>
          {marineOneStartList.map(nodeId => (
            <button
              key={nodeId}
              onClick={() => {
                send("/pub/init", {
                  message: "INIT_MARINE_ONE_START",
                  sender: nickname,
                  gameId,
                  node: nodeId,
                });
              }}
            >
              <p>{nodeId}번 </p>
            </button>
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
    if (type.includes("marineOne")) {
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
    zoom(getNode(socketMessage.game.currentPosition[1]).position);
  };

  // 해군 2의 시작위치 지정 명령
  const orderInitMarineTwoStart = () => {
    if (type.includes("marineTwo")) {
      setHeaderMessage("시작 위치를 결정하세요");
      // TODO : 푸터에 5가지 선택지 나오고 마우스 호버 시, 카메라 이동
      const marineTwoStartList = marineStartList.filter(
        nodeId => nodeId !== socketMessage.game.currentPosition[1],
      );
      setFooterMessage(
        <>
          {marineTwoStartList.map(nodeId => (
            <button
              key={nodeId}
              onClick={() => {
                send("/pub/init", {
                  message: "INIT_MARINE_TWO_START",
                  sender: nickname,
                  gameId,
                  node: nodeId,
                });
              }}
            >
              <p>{nodeId}번 </p>
            </button>
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
    if (type.includes("marineTwo")) {
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
    zoom(getNode(socketMessage.game.currentPosition[2]).position);
  };

  // 해군 3의 시작위치 지정 명령
  const orderInitMarineThreeStart = () => {
    if (type.includes("marineThree")) {
      setHeaderMessage("시작 위치를 결정하세요");
      // TODO : 푸터에 4가지 선택지 나오고 마우스 호버 시, 카메라 이동
      const marineThreeStartList = marineStartList.filter(
        nodeId =>
          nodeId !== socketMessage.game.currentPosition[1] &&
          nodeId !== socketMessage.game.currentPosition[2],
      );
      setFooterMessage(
        <>
          {marineThreeStartList.map(nodeId => (
            <button
              key={nodeId}
              onClick={() => {
                send("/pub/init", {
                  message: "INIT_MARINE_THREE_START",
                  sender: nickname,
                  gameId,
                  node: nodeId,
                });
              }}
            >
              <p>{nodeId}번 </p>
            </button>
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
    if (type.includes("marineThree")) {
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
    zoom(getNode(socketMessage.game.currentPosition[3]).position);

    setTimeout(() => {
      setHeaderMessage("해적의 출발지가 공개됩니다");
      zoom(getNode(socketMessage.game.currentPosition[0]).position);
      // TODO : 3초간 보물 열리는 애니메이션 (해군도 보이게 수정하기)
    }, 1500); // 재형이가 6초로 수정해주면 3000으로 변경
  };

  // 해적의 이동 명령
  const orderMovePirate = () => {
    if (type.includes("pirate")) {
      setHeaderMessage("이동할 위치를 결정하세요");
      zoom(getNode(socketMessage.game.currentPosition[0]).position);
      // TODO : availableNode변수를 이동 가능 노드로 넘겨주기
      // 이동 가능 노드는 푸터와 헤더메시지처럼 빈 상태에서는 비활성화
      // 데이터가 있으면 푸터에 노드번호가 뜨며 호버 할 때 경로 표시
      // 클릭 시 메세지 보내고 이동 가능 노드 비우기
      // send("/pub/pirate", {
      //   message: "MOVE_PIRATE",
      //   sender: nickname,
      //   gameId,
      //   node: "클릭한 노드 넘버",
      // }
      setFooterMessage(
        <>
          {Object.entries(socketMessage.availableNode).map(
            ([nodeId, nodeList]) => (
              <button
                key={nodeId}
                onClick={() => {
                  send("/pub/pirate", {
                    message: "MOVE_PIRATE",
                    sender: nickname,
                    gameId,
                    node: nodeId,
                  });
                }}
              >
                <p>{nodeId}번 </p>
              </button>
            ),
          )}
        </>,
      );
    } else {
      setHeaderMessage(
        `[해적] ${socketMessage.game.players[0]["nickname"]} 님이 이동중입니다`,
      );
    }
  };

  // 해적의 이동 완료
  const actionMovePirate = () => {
    if (type.includes("pirate")) {
      setHeaderMessage(
        timeOut
          ? "시간초과! 이동 위치가 랜덤으로 결정되었습니다"
          : "이동 위치가 결정되었습니다",
      );
      // TODO : 이동 가능 노드 비우기
      // TODO : 이동 애니메이션 구현

      // 경로 : socketMessage.pirateAvailableNode[socketMessage.game.currentPosition[0]]
    } else {
      setHeaderMessage(
        `[해적] ${socketMessage.game.players[0]["nickname"]} 님의 이동이 완료되었습니다`,
      );
    }

    // 푸터, 시간초과 초기화
    setTimeOut(false);
    removeFooterMessage();
  };

  // 해군 1의 이동 명령
  const orderMoveMarineOne = () => {
    zoom(getNode(socketMessage.game.currentPosition[1]).position);
    if (type.includes("marineOne")) {
      setHeaderMessage("이동할 위치를 결정하세요");
      // TODO : availableNode변수를 이동 가능 노드로 넘겨주기
      // 이동 가능 노드는 푸터와 헤더메시지처럼 빈 상태에서는 비활성화
      // 데이터가 있으면 푸터에 노드번호가 뜨며 호버 할 때 경로 표시
      // 클릭 시 메세지 보내고 이동 가능 노드 비우기
      // send("/pub/marine", {
      //   message: "MOVE_MARINE_ONE",
      //   sender: nickname,
      //   gameId,
      //   node: "클릭한 노드 넘버",
      // }
      setFooterMessage(
        <>
          {Object.entries(socketMessage.availableNode).map(
            ([nodeId, nodeList]) => (
              <button
                key={nodeId}
                onClick={() => {
                  send("/pub/pirate", {
                    message: "MOVE_MARINE_ONE",
                    sender: nickname,
                    gameId,
                    node: nodeId,
                  });
                }}
              >
                <p>{nodeId}번 </p>
              </button>
            ),
          )}
        </>,
      );
    } else {
      setHeaderMessage(
        `[해군1] ${socketMessage.game.players[1]["nickname"]} 님이 이동중입니다`,
      );
    }
  };

  // 해군 1의 이동 완료
  const actionMoveMarineOne = () => {
    if (type.includes("marineOne")) {
      setHeaderMessage(
        timeOut
          ? "시간초과! 이동 위치가 랜덤으로 결정되었습니다"
          : "이동 위치가 결정되었습니다",
      );
      // TODO : 이동 가능 노드 비우기
    } else {
      setHeaderMessage(
        `[해군1] ${socketMessage.game.players[0]["nickname"]} 님의 이동이 완료되었습니다`,
      );
      // TODO : 이동 애니메이션 구현 (모든 유저에게 보여주기)
      // 경로 : socketMessage.pirateAvailableNode[socketMessage.game.currentPosition[0]]
    }

    // 푸터, 시간초과 초기화
    setTimeOut(false);
    removeFooterMessage();
  };

  useEffect(() => {
    if (socketMessage.message === "RENDER_COMPLETE_ACCEPTED") {
      // 직업 세팅
      const players = socketMessage.game.players;
      const number = Object.keys(players).filter(
        key => players[key]["nickname"] === nickname,
      );

      setTreasures(socketMessage.game.treasures);
      if (number.includes("0")) {
        setType("pirate");
      }
      if (number.includes("1")) {
        setType("marineOne");
      }
      if (number.includes("2")) {
        setType("marineTwo");
      }
      if (number.includes("3")) {
        setType("marineThree");
      }
    }

    // 게임 시작
    if (socketMessage.message === "ALL_RENDERED_COMPLETED") {
      startAnimation();
    }

    // 공용 시간초과
    if (
      socketMessage.message === "INIT_PIRATE_START_TIME_OUT" ||
      socketMessage.message === "INIT_MARINE_ONE_START_TIME_OUT" ||
      socketMessage.message === "INIT_MARINE_TWO_START_TIME_OUT" ||
      socketMessage.message === "INIT_MARINE_THREE_START_TIME_OUT" ||
      socketMessage.message === "MOVE_PIRATE_TIME_OUT" ||
      socketMessage.message === "SELECT_WORK_MARINE_ONE_TIME_OUT" ||
      socketMessage.message === "SELECT_WORK_MARINE_TWO_TIME_OUT" ||
      socketMessage.message === "SELECT_WORK_MARINE_THREE_TIME_OUT"
    ) {
      setTimeOut(true);
    }

    // 해적의 시작위치 지정 명령
    if (socketMessage.message === "ORDER_INIT_PIRATE_START") {
      orderInitPirateStart();
    }

    // 해적의 시작위치 지정 완료
    if (socketMessage.message === "ACTION_INIT_PIRATE_START") {
      actionInitPirateStart();
    }

    // 해군 1의 시작위치 지정 명령
    if (socketMessage.message === "ORDER_INIT_MARINE_ONE_START") {
      orderInitMarineOneStart();
    }

    // 해군 1의 시작위치 지정 완료
    if (socketMessage.message === "ACTION_INIT_MARINE_ONE_START") {
      actionInitMarineOneStart();
    }

    // 해군 2의 시작위치 지정 명령
    if (socketMessage.message === "ORDER_INIT_MARINE_TWO_START") {
      orderInitMarineTwoStart();
    }

    // 해군 2의 시작위치 지정 완료
    if (socketMessage.message === "ACTION_INIT_MARINE_TWO_START") {
      actionInitMarineTwoStart();
    }

    // 해군 3의 시작위치 지정 명령
    if (socketMessage.message === "ORDER_INIT_MARINE_THREE_START") {
      orderInitMarineThreeStart();
    }

    // 해군 3의 시작위치 지정 완료
    if (socketMessage.message === "ACTION_INIT_MARINE_THREE_START") {
      actionInitMarineThreeStart();
      setTreasures(socketMessage.game.treasures);
    }

    // 해적의 이동 명령
    if (socketMessage.message === "ORDER_MOVE_PIRATE") {
      orderMovePirate();
    }

    // 해적의 이동 완료
    if (socketMessage.message === "ACTION_MOVE_PIRATE") {
      actionMovePirate();
    }

    // 해군 1의 이동 명령
    if (socketMessage.message === "ORDER_MOVE_MARINE_ONE") {
      orderMoveMarineOne();
    }

    // 해군 1의 이동 완료
    if (socketMessage.message === "ACTION_MOVE_MARINE_ONE") {
      actionMoveMarineOne();
    }
  }, [socketMessage]);

  useEffect(() => {
    if (!loading) {
      send("/pub/room", {
        message: "RENDERED_COMPLETE",
        sender: nickname,
        gameId,
      });
    }
  }, [loading, gameId, nickname]);

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
      {/* <YsyTestController /> */}
    </>
  );
}
