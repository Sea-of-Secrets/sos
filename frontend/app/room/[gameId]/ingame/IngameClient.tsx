"use client";

import React, { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";

import IngameThree from "./IngameThree";
import Loading from "./components/Loading";
import Round from "./components/Round";
import Turn from "./components/Turn";
import SystemPrompt from "./components/SystemPrompt";

import { gameSocket } from "~/sockets";
import { useGameData } from "./stores/useGameData";
import { useSystemPrompt } from "./stores/useSystemPrompt";
import useNickname from "~/store/nickname";
import useGameId from "~/store/gameId";

import { useCamera } from "./stores/useCamera";
import { getNode, marineStartList } from "~/_lib/data/data";
import { useSocketMessage } from "./stores/useSocketMessage";
import {
  usePiratePiece,
  useMarineOnePiece,
  useMarineTwoPiece,
  useMarineThreePiece,
} from "./stores/piece";
import SelectPirateLocationGrid from "./components/SelectPirateLocationGrid";

const { send } = gameSocket;

export default function IngameClient() {
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(true);
  const [timeOut, setTimeOut] = useState(false);

  const { nickname } = useNickname();
  const { gameId } = useGameId();
  const { zoom, gameStartAnimation } = useCamera();
  const { socketMessage } = useSocketMessage();
  const { movePieceTwo: movePirate } = usePiratePiece();
  const { movePieceTwo: moveMarineOne } = useMarineOnePiece();
  const { movePieceTwo: moveMarineTwo } = useMarineTwoPiece();
  const { movePieceTwo: moveMarineThree } = useMarineThreePiece();

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
    setOpenTreasure,
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
    setLoading2(false);
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
    if (socketMessage.game.players[0]["nickname"] === nickname) {
      setHeaderMessage("시작 위치를 결정하세요");
      setFooterMessage(
        <SelectPirateLocationGrid
          nodeIdListOnTreasures={Object.keys(treasures).map(nodeIdString =>
            parseInt(nodeIdString, 10),
          )}
          onSelectLocation={() => {
            console.log(treasures);
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
        />,
      );
    } else {
      setHeaderMessage(
        `[해적] ${socketMessage.game.players[0]["nickname"]} 님이 시작 위치를 결정중입니다`,
      );
    }
  };

  // 해적의 시작위치 지정 완료
  const actionInitPirateStart = () => {
    if (socketMessage.game.players[0]["nickname"] === nickname) {
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
    if (socketMessage.game.players[1]["nickname"] === nickname) {
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
    if (socketMessage.game.players[1]["nickname"] === nickname) {
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
    if (socketMessage.game.players[2]["nickname"] === nickname) {
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
    if (socketMessage.game.players[2]["nickname"] === nickname) {
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
    if (socketMessage.game.players[3]["nickname"] === nickname) {
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
    if (socketMessage.game.players[3]["nickname"] === nickname) {
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
  };

  // 해적 시작 위치 공개
  const openPirateStart = () => {
    // TODO : 3초간 보물 열리는 애니메이션 (해군도 보이게 수정하기)
    setHeaderMessage("해적의 출발지가 공개됩니다");
    zoom(getNode(socketMessage.game.currentPosition[0]).position);
  };

  // 해적의 이동 명령
  const orderMovePirate = () => {
    if (socketMessage.game.players[0]["nickname"] === nickname) {
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
          {Object.entries(socketMessage.availableNode).map(([nodeId]) => (
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
          ))}
        </>,
      );
      // TODO : 이동 가능 노드 비우기
    } else {
      setHeaderMessage(
        `[해적] ${socketMessage.game.players[0]["nickname"]} 님이 이동중입니다`,
      );
    }
  };

  // 해적의 이동 완료
  const actionMovePirate = () => {
    if (socketMessage.game.players[0]["nickname"] === nickname) {
      setHeaderMessage(
        timeOut
          ? "시간초과! 이동 위치가 랜덤으로 결정되었습니다"
          : "이동 위치가 결정되었습니다",
      );
      // 해적 이동
      movePirate({
        positionList:
          socketMessage.availableNode[socketMessage.game.currentPosition[0]],
        moveAnimationStyle: "JUMPTWO",
      });
      zoom(getNode(socketMessage.game.currentPosition[0]).position);
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
    if (socketMessage.game.players[1]["nickname"] === nickname) {
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
    } else {
      setHeaderMessage(
        `[해군1] ${socketMessage.game.players[1]["nickname"]} 님이 이동중입니다`,
      );
    }
    setFooterMessage(
      <>
        {Object.entries(socketMessage.availableNode).map(([nodeId]) => (
          <button
            key={nodeId}
            onClick={() => {
              send("/pub/marine", {
                message: "MOVE_MARINE_ONE",
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
  };

  // 해군 1의 이동 완료
  const actionMoveMarineOne = () => {
    if (socketMessage.game.players[1]["nickname"] === nickname) {
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
    }

    // 해군 1 이동
    moveMarineOne({
      positionList:
        socketMessage.availableNode[socketMessage.game.currentPosition[1]],
      moveAnimationStyle: "JUMPTWO",
    });

    // 푸터, 시간초과 초기화
    setTimeOut(false);
    removeFooterMessage();
  };

  // 해군 1의 행동 명령
  const orderSelectWorkMarineOne = () => {
    zoom(getNode(socketMessage.game.currentPosition[1]).position);
    if (socketMessage.game.players[1]["nickname"] === nickname) {
      setHeaderMessage("행동을 선택하세요");
      // TODO : 조사, 체포 푸터에 컴포넌트화해서 담기
      const actionList = ["조사", "체포"];
      setFooterMessage(
        <>
          {actionList.map(action => (
            <button
              key={action}
              onClick={() => {
                const clickAction =
                  action === "조사" ? "INVESTIGATE" : "ARREST";

                send("/pub/marine", {
                  message: "SELECT_WORK_MARINE_ONE",
                  sender: nickname,
                  gameId,
                  action: clickAction,
                });
              }}
            >
              <p>{action}</p>
            </button>
          ))}
        </>,
      );
    } else {
      setHeaderMessage(
        `[해군1] ${socketMessage.game.players[1]["nickname"]} 님이 행동을 선택중입니다`,
      );
    }
  };

  // 해군 1의 조사 행동 선택
  const actionSelectWorkMarineOneInvestigate = () => {
    if (socketMessage.game.players[1]["nickname"] === nickname) {
      setHeaderMessage(
        timeOut ? "시간초과! 조사가 선택되었습니다." : "조사를 선택하셨습니다",
      );
    } else {
      setHeaderMessage(
        `[해군1] ${socketMessage.game.players[1]["nickname"]} 님이 조사를 선택했습니다.`,
      );
    }

    // 푸터, 시간초과 초기화
    setTimeOut(false);
    removeFooterMessage();
  };

  // 해군 1의 체포 행동 선택
  const actionSelectWorkMarineOneArrest = () => {
    if (socketMessage.game.players[1]["nickname"] === nickname) {
      setHeaderMessage("체포를 선택하셨습니다");
    } else {
      setHeaderMessage(
        `[해군1] ${socketMessage.game.players[1]["nickname"]} 님이 체포를 선택했습니다.`,
      );
    }

    // 푸터, 시간초과 초기화
    setTimeOut(false);
    removeFooterMessage();
  };

  // 해군 1의 조사 행동 명령
  const orderInvestigateMarineOne = () => {
    zoom(getNode(socketMessage.game.currentPosition[1]).position);
    if (socketMessage.game.players[1]["nickname"] === nickname) {
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
          {Object.entries(socketMessage.game.investigate.nodes).map(
            ([nodeId, isInvestigate]) =>
              !isInvestigate && (
                <button
                  key={nodeId}
                  onClick={() => {
                    send("/pub/marine", {
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
      socketMessage.message === "SELECT_WORK_MARINE_THREE_TIME_OUT" ||
      socketMessage.message === "SELECT_WORK_MARINE_ONE_TIME_OUT"
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
      // setTreasures(socketMessage.game.treasures);
      // 해적 위치 공개
      setTimeout(() => {
        openPirateStart();
      }, 3000);
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

    // 해군 1의 행동 명령
    if (socketMessage.message === "ORDER_SELECT_WORK_MARINE_ONE") {
      orderSelectWorkMarineOne();
    }

    // 해군 1의 조사 행동 선택
    if (socketMessage.message === "ACTION_SELECT_WORK_MARINE_ONE_INVESTIGATE") {
      actionSelectWorkMarineOneInvestigate();
    }

    // 해군 1의 체포 행동 선택
    if (socketMessage.message === "ACTION_SELECT_WORK_MARINE_ONE_ARREST") {
      actionSelectWorkMarineOneArrest();
    }

    // 해군 1의 조사 행동 명령
    if (socketMessage.message === "ORDER_INVESTIGATE_MARINE_ONE") {
      orderInvestigateMarineOne();
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
      {loading2 && <Loading />}
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
