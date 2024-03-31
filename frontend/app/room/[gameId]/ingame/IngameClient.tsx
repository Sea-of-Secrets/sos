"use client";

import React, { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";

import Timer from "./components/Timer";
import IngameThree from "./IngameThree";
import Loading from "./components/Loading";
import Round from "./components/Round";
import Turn from "./components/Turn";
import Chat from "./components/Chat";
import SystemPrompt from "./components/SystemPrompt";

import { gameSocket } from "~/sockets";
import { useSystemPrompt } from "./stores/useSystemPrompt";
import useNickname from "~/store/nickname";
import useGameId from "~/store/gameId";

import { useCamera } from "./stores/useCamera";
import { getNode } from "~/_lib/data/data";
import { useSocketMessage } from "./stores/useSocketMessage";
import {
  usePiratePiece,
  useMarineOnePiece,
  useMarineTwoPiece,
  useMarineThreePiece,
} from "./stores/piece";
import SelectPirateLocationGrid from "./components/SelectPirateLocationGrid";
import { useTimer } from "./stores/useTimer";
import { useWhenMarineStartGame } from "./stores/useWhenMarineStartGame";
import SelectMarineAction from "./components/SelectMarineAction";
import { useGameLoading } from "./stores/useGameLoading";
import OptionButton from "./components/OptionButton";
import Docs from "./components/Docs";

const { send } = gameSocket;

export default function IngameClient() {
  const { loading, setLoading } = useGameLoading();
  const [loading2, setLoading2] = useState(true);
  const [timeOut, setTimeOut] = useState(false);

  const { nickname } = useNickname();
  const { gameId } = useGameId();
  const { zoom, zoomMarineStart, gameStartAnimation, zoomFullScreen } =
    useCamera();
  const { handleShowTimer, handleCloseTimer } = useTimer();
  const { selectStartNode, startMarineTurn } = useWhenMarineStartGame();

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

  // 게임 시작
  const startAnimation = () => {
    gameStartAnimation();

    setTimeout(() => {
      // 애니메이션 끝났다고 알림
      send("/pub/init", {
        message: "START_GAME",
        sender: nickname,
        gameId,
      });
    }, 2000);
  };

  // 게임 종료
  const gameOverPirateWin = () => {
    alert("해적 승리로 게임 종료");
  };
  const gameOverMarineOneArrest = () => {
    alert("해군 1의 체포로 게임 종료");
  };
  const gameOverMarineTwoArrest = () => {
    alert("해군 2의 체포로 게임 종료");
  };
  const gameOverMarineThreeArrest = () => {
    alert("해군 3의 체포로 게임 종료");
  };
  const gameOverFifteenTurnOver = () => {
    alert("해적의 15턴 내 보물 미도착으로 게임 종료");
  };

  // 해적의 시작위치 지정 명령
  const orderInitPirateStart = () => {
    handleShowTimer();
    if (socketMessage.game.players[0]["nickname"] === nickname) {
      setHeaderMessage("시작 위치를 결정하세요");
      setFooterMessage(
        <SelectPirateLocationGrid
          nodeIdListOnTreasures={Object.keys(socketMessage.game.treasures).map(
            nodeIdString => parseInt(nodeIdString, 10),
          )}
          onSelectLocation={node => {
            send("/pub/init", {
              message: "INIT_PIRATE_START",
              sender: nickname,
              gameId,
              node,
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
    handleCloseTimer();
    if (socketMessage.game.players[0]["nickname"] === nickname) {
      // 시간 초과 여부에 따라 메시지 출력
      setHeaderMessage(
        timeOut
          ? "시간초과! 시작 위치가 랜덤으로 결정되었습니다"
          : "시작 위치가 결정되었습니다",
      );
      // 해당 노드 줌 인
      zoom(getNode(socketMessage.game.currentPosition[0]).position);
    } else {
      setHeaderMessage("해적의 시작 위치가 결정되었습니다");
    }

    // 푸터, 시간초과 초기화
    setTimeOut(false);
    removeFooterMessage();
  };

  // 해군의 시작위치 지정 명령
  const orderInitMarineStart = (number: number) => {
    // 타이머 시작
    handleShowTimer();
    zoomMarineStart();
    if (socketMessage.game.players[number]["nickname"] === nickname) {
      setHeaderMessage("시작 위치를 결정하세요");
      const stringNumber = number.toString();
      startMarineTurn(stringNumber as "1" | "2" | "3");
    } else {
      setHeaderMessage(
        `[해군${number}] ${socketMessage.game.players[number]["nickname"]} 님이 시작 위치를 결정중입니다`,
      );
    }
  };

  // 해군의 시작위치 지정 완료
  const actionInitMarineStart = (number: number) => {
    // 타이머, 시간초과 초기화
    if (socketMessage.game.players[number]["nickname"] === nickname) {
      // 시간 초과 여부에 따라 메시지 출력
      setHeaderMessage(
        timeOut
          ? "시간초과! 시작 위치가 랜덤으로 결정되었습니다"
          : "시작 위치가 결정되었습니다",
      );
      if (timeOut) {
        selectStartNode(socketMessage.game.currentPosition[number]);
      }
    } else {
      setHeaderMessage(
        `[해군${number}] ${socketMessage.game.players[number]["nickname"]} 님의 시작 위치가 결정되었습니다`,
      );
    }
    setTimeOut(false);
    handleCloseTimer();

    // 해당 노드 줌 인
    zoom(getNode(socketMessage.game.currentPosition[number]).position);
  };

  // 해적 시작 위치 공개
  const openPirateStart = () => {
    setHeaderMessage("해적의 출발지가 공개됩니다");
    zoom(getNode(socketMessage.game.currentPosition[0]).position);
  };

  // 해적의 이동 명령
  const orderMovePirate = () => {
    handleShowTimer();
    if (socketMessage.game.players[0]["nickname"] === nickname) {
      setHeaderMessage("이동할 위치를 결정하세요");
      zoom(getNode(socketMessage.game.currentPosition[0]).position, {
        level: 2,
      });
    } else {
      setHeaderMessage(
        `[해적] ${socketMessage.game.players[0]["nickname"]} 님이 이동중입니다`,
      );
      zoomFullScreen();
    }
  };

  // 해적의 이동 완료
  const actionMovePirate = () => {
    handleCloseTimer();
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

  // 해군의 이동 명령
  const orderMoveMarine = (number: number) => {
    handleShowTimer();
    zoom(getNode(socketMessage.game.currentPosition[number]).position, {
      level: 2,
    });
    if (socketMessage.game.players[number]["nickname"] === nickname) {
      setHeaderMessage("이동할 위치를 결정하세요");
    } else {
      setHeaderMessage(
        `[해군${number}] ${socketMessage.game.players[number]["nickname"]} 님이 이동중입니다`,
      );
    }
  };

  // 해군의 이동 완료
  const actionMoveMarine = (number: number) => {
    handleCloseTimer();
    if (socketMessage.game.players[number]["nickname"] === nickname) {
      setHeaderMessage(
        timeOut
          ? "시간초과! 이동 위치가 랜덤으로 결정되었습니다"
          : "이동 위치가 결정되었습니다",
      );
    } else {
      setHeaderMessage(
        `[해군${number}] ${socketMessage.game.players[number]["nickname"]} 님의 이동이 완료되었습니다`,
      );
    }

    // 해군 이동
    zoom(getNode(socketMessage.game.currentPosition[number]).position);
    if (number === 1) {
      moveMarineOne({
        positionList:
          socketMessage.availableNode[
            socketMessage.game.currentPosition[number]
          ],
        moveAnimationStyle: "JUMPTWO",
      });
    } else if (number === 2) {
      moveMarineTwo({
        positionList:
          socketMessage.availableNode[
            socketMessage.game.currentPosition[number]
          ],
        moveAnimationStyle: "JUMPTWO",
      });
    } else {
      moveMarineThree({
        positionList:
          socketMessage.availableNode[
            socketMessage.game.currentPosition[number]
          ],
        moveAnimationStyle: "JUMPTWO",
      });
    }

    // 푸터, 시간초과 초기화
    setTimeOut(false);
    removeFooterMessage();
  };

  // 해군의 행동 명령
  const orderSelectWorkMarine = (number: number) => {
    handleShowTimer();
    const EnglishNumber = number === 1 ? "ONE" : number === 2 ? "TWO" : "THREE";
    zoom(getNode(socketMessage.game.currentPosition[number]).position);
    if (socketMessage.game.players[number]["nickname"] === nickname) {
      setHeaderMessage("행동을 선택하세요");
      setFooterMessage(<SelectMarineAction turn={EnglishNumber} />);
    } else {
      setHeaderMessage(
        `[해군${number}] ${socketMessage.game.players[number]["nickname"]} 님이 행동을 선택중입니다`,
      );
    }
  };

  // 해군의 조사 행동 선택
  const actionSelectWorkMarineInvestigate = (number: number) => {
    handleCloseTimer();
    if (socketMessage.game.players[number]["nickname"] === nickname) {
      setHeaderMessage(
        timeOut ? "시간초과! 조사가 선택되었습니다." : "조사를 선택하셨습니다",
      );
    } else {
      setHeaderMessage(
        `[해군${number}] ${socketMessage.game.players[number]["nickname"]} 님이 조사를 선택했습니다.`,
      );
    }

    // 푸터, 시간초과 초기화
    setTimeOut(false);
    removeFooterMessage();
  };

  // 해군의 조사 행동 명령
  const orderInvestigateMarine = (number: number) => {
    handleShowTimer();
    zoom(getNode(socketMessage.game.currentPosition[number]).position);
    if (socketMessage.game.players[number]["nickname"] === nickname) {
      setHeaderMessage("조사할 위치를 결정하세요");
    } else {
      setHeaderMessage(
        `[해군${number}] ${socketMessage.game.players[number]["nickname"]} 님이 조사중입니다`,
      );
    }
  };

  // 해군의 조사 행동 성공
  const actionInvestigateSuccess = (number: number) => {
    handleCloseTimer();
    const successNumber = socketMessage.game.investigateSuccess.length - 1;
    if (socketMessage.game.players[number]["nickname"] === nickname) {
      setHeaderMessage(
        timeOut
          ? `시간초과! ${socketMessage.game.investigateSuccess[successNumber]}번에서 해적의 흔적이 발견되었습니다`
          : `조사한 ${socketMessage.game.investigateSuccess[successNumber]}번에서 해적의 흔적이 발견되었습니다`,
      );
    } else {
      setHeaderMessage(
        `[해군${number}] ${socketMessage.game.players[number]["nickname"]} 님이 ${socketMessage.game.investigateSuccess[successNumber]}번에서 해적의 흔적을 발견하였습니다.`,
      );
    }
    console.log("조사 성공한 노드 : ", socketMessage.game.investigateSuccess);
    console.log(
      "조사 성공한 마지막 노드 : ",
      socketMessage.game.investigateSuccess[successNumber],
    );
    console.log(
      "조사 성공한 마지막 노드의 포지션",
      socketMessage.game.investigateSuccess[successNumber].position,
    );

    zoom(
      getNode(socketMessage.game.investigateSuccess[successNumber]).position,
    );

    // 푸터, 시간초과 초기화
    setTimeOut(false);
    removeFooterMessage();
  };

  // 해군의 조사 행동 실패
  const actionInvestigateFail = (number: number) => {
    handleCloseTimer();
    if (socketMessage.game.players[number]["nickname"] === nickname) {
      setHeaderMessage(
        timeOut
          ? `시간초과! 해적의 흔적이 발견되지 않았습니다`
          : `해적의 흔적이 발견되지 않았습니다`,
      );
    } else {
      setHeaderMessage(
        `[해군${number}] ${socketMessage.game.players[number]["nickname"]} 님이 조사에 실패했습니다`,
      );
    }

    // 푸터, 시간초과 초기화
    setTimeOut(false);
    removeFooterMessage();
  };

  // 해군의 조사 행동 모두 실패
  const actionInvestigateAllFail = (number: number) => {
    handleCloseTimer();
    if (socketMessage.game.players[number]["nickname"] === nickname) {
      setHeaderMessage(
        `가까운 모든 구역에서 해적의 흔적이 발견되지 않았습니다`,
      );
    } else {
      setHeaderMessage(
        `[해군${number}] ${socketMessage.game.players[number]["nickname"]} 님이 모든 조사가 종료되었습니다`,
      );
    }

    removeFooterMessage();
  };

  // 해군의 체포 행동 선택
  const actionSelectWorkMarineArrest = (number: number) => {
    handleCloseTimer();
    if (socketMessage.game.players[number]["nickname"] === nickname) {
      setHeaderMessage("체포를 선택하셨습니다");
    } else {
      setHeaderMessage(
        `[해군${number}] ${socketMessage.game.players[number]["nickname"]} 님이 체포를 선택했습니다.`,
      );
    }

    // 푸터, 시간초과 초기화
    setTimeOut(false);
    removeFooterMessage();
  };

  // 해군의 체포 행동 명령
  const orderArrestMarine = (number: number) => {
    handleShowTimer();
    zoom(getNode(socketMessage.game.currentPosition[number]).position);
    if (socketMessage.game.players[number]["nickname"] === nickname) {
      setHeaderMessage("체포할 위치를 결정하세요");
    } else {
      setHeaderMessage(
        `[해군${number}] ${socketMessage.game.players[number]["nickname"]} 님이 체포중입니다`,
      );
    }
  };

  // 해군의 체포 행동 실패
  const actionArrestMarineFail = (number: number) => {
    handleCloseTimer();
    if (socketMessage.game.players[number]["nickname"] === nickname) {
      setHeaderMessage(
        timeOut ? "시간초과! 체포를 실패하였습니다" : "체포를 실패하였습니다",
      );
    } else {
      setHeaderMessage(
        `[해군${number}] ${socketMessage.game.players[number]["nickname"]} 님의 체포를 실패하였습니다`,
      );
    }

    // 푸터, 시간초과 초기화
    setTimeOut(false);
    removeFooterMessage();
  };

  // 다음 보물 상자 도착
  const roundOver = () => {
    handleCloseTimer();
    zoom(getNode(socketMessage.game.currentPosition[0]).position);
    const openTreasure = socketMessage.game.treasures;
    const openTreasureCount = Object.values(openTreasure).reduce(
      (count: number, isOpen) => (isOpen ? count + 1 : count),
      0,
    );
    if (socketMessage.game.players[0]["nickname"] === nickname) {
      setHeaderMessage(`${openTreasureCount}번째 보물상자를 획득하였습니다`);
    } else {
      setHeaderMessage(
        `[해적] ${socketMessage.game.players[0]["nickname"]} 님이 ${openTreasureCount}번째 보물상자를 찾았습니다`,
      );
    }
  };

  // 턴 종료
  const turnOver = () => {
    handleCloseTimer();
    setHeaderMessage(`${socketMessage.game.turn - 1}턴이 종료되었습니다`);
  };

  useEffect(() => {
    if (socketMessage.message === "RENDER_COMPLETE_ACCEPTED") {
    }

    // 게임 시작
    if (socketMessage.message === "ALL_RENDERED_COMPLETED") {
      setLoading2(false);
      setTimeout(() => {
        startAnimation();
      }, 1000);
    }

    // 게임 종료
    if (socketMessage.message === "GAME_OVER_PIRATE_WIN") {
      gameOverPirateWin();
    }
    if (socketMessage.message === "GAME_OVER_MARINE_ONE_ARREST_SUCCESS") {
      gameOverMarineOneArrest();
    }
    if (socketMessage.message === "GAME_OVER_MARINE_TWO_ARREST_SUCCESS") {
      gameOverMarineTwoArrest();
    }
    if (socketMessage.message === "GAME_OVER_MARINE_THREE_ARREST_SUCCESS") {
      gameOverMarineThreeArrest();
    }
    if (socketMessage.message === "GAME_OVER_FIFTEEN_TURN_OVER_MARINE_WIN") {
      gameOverFifteenTurnOver();
    }

    // 시간초과
    if (
      socketMessage.message === "INIT_PIRATE_START_TIME_OUT" ||
      socketMessage.message === "INIT_MARINE_ONE_START_TIME_OUT" ||
      socketMessage.message === "INIT_MARINE_TWO_START_TIME_OUT" ||
      socketMessage.message === "INIT_MARINE_THREE_START_TIME_OUT" ||
      socketMessage.message === "MOVE_PIRATE_TIME_OUT" ||
      socketMessage.message === "SELECT_WORK_MARINE_ONE_TIME_OUT" ||
      socketMessage.message === "SELECT_WORK_MARINE_TWO_TIME_OUT" ||
      socketMessage.message === "SELECT_WORK_MARINE_THREE_TIME_OUT" ||
      socketMessage.message === "INVESTIGATE_MARINE_ONE_TIME_OUT" ||
      socketMessage.message === "INVESTIGATE_MARINE_TWO_TIME_OUT" ||
      socketMessage.message === "INVESTIGATE_MARINE_THREE_TIME_OUT" ||
      socketMessage.message === "ARREST_MARINE_ONE_TIME_OUT" ||
      socketMessage.message === "ARREST_MARINE_TWO_TIME_OUT" ||
      socketMessage.message === "ARREST_MARINE_THREE_TIME_OUT"
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

    // 해군의 시작위치 지정 명령
    if (socketMessage.message === "ORDER_INIT_MARINE_ONE_START") {
      orderInitMarineStart(1);
    }
    if (socketMessage.message === "ORDER_INIT_MARINE_TWO_START") {
      orderInitMarineStart(2);
    }
    if (socketMessage.message === "ORDER_INIT_MARINE_THREE_START") {
      orderInitMarineStart(3);
    }

    // 해군의 시작위치 지정 완료
    if (socketMessage.message === "ACTION_INIT_MARINE_ONE_START") {
      actionInitMarineStart(1);
    }
    if (socketMessage.message === "ACTION_INIT_MARINE_TWO_START") {
      actionInitMarineStart(2);
    }
    if (socketMessage.message === "ACTION_INIT_MARINE_THREE_START") {
      actionInitMarineStart(3);
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

    // 해군의 이동 명령
    if (socketMessage.message === "ORDER_MOVE_MARINE_ONE") {
      orderMoveMarine(1);
    }
    if (socketMessage.message === "ORDER_MOVE_MARINE_TWO") {
      orderMoveMarine(2);
    }
    if (socketMessage.message === "ORDER_MOVE_MARINE_THREE") {
      orderMoveMarine(3);
    }

    // 해군의 이동 완료
    if (socketMessage.message === "ACTION_MOVE_MARINE_ONE") {
      actionMoveMarine(1);
    }
    if (socketMessage.message === "ACTION_MOVE_MARINE_TWO") {
      actionMoveMarine(2);
    }
    if (socketMessage.message === "ACTION_MOVE_MARINE_THREE") {
      actionMoveMarine(3);
    }

    // 해군의 행동 명령
    if (socketMessage.message === "ORDER_SELECT_WORK_MARINE_ONE") {
      orderSelectWorkMarine(1);
    }
    if (socketMessage.message === "ORDER_SELECT_WORK_MARINE_TWO") {
      orderSelectWorkMarine(2);
    }
    if (socketMessage.message === "ORDER_SELECT_WORK_MARINE_THREE") {
      orderSelectWorkMarine(3);
    }

    // 해군의 조사 행동 선택
    if (socketMessage.message === "ACTION_SELECT_WORK_MARINE_ONE_INVESTIGATE") {
      actionSelectWorkMarineInvestigate(1);
    }
    if (socketMessage.message === "ACTION_SELECT_WORK_MARINE_TWO_INVESTIGATE") {
      actionSelectWorkMarineInvestigate(2);
    }
    if (
      socketMessage.message === "ACTION_SELECT_WORK_MARINE_THREE_INVESTIGATE"
    ) {
      actionSelectWorkMarineInvestigate(3);
    }

    // 해군의 조사 행동 명령
    if (socketMessage.message === "ORDER_INVESTIGATE_MARINE_ONE") {
      orderInvestigateMarine(1);
    }
    if (socketMessage.message === "ORDER_INVESTIGATE_MARINE_TWO") {
      orderInvestigateMarine(2);
    }
    if (socketMessage.message === "ORDER_INVESTIGATE_MARINE_THREE") {
      orderInvestigateMarine(3);
    }

    // 해군의 조사 행동 성공
    if (socketMessage.message === "ACTION_INVESTIGATE_MARINE_ONE_SUCCESS") {
      actionInvestigateSuccess(1);
    }
    if (socketMessage.message === "ACTION_INVESTIGATE_MARINE_TWO_SUCCESS") {
      actionInvestigateSuccess(2);
    }
    if (socketMessage.message === "ACTION_INVESTIGATE_MARINE_THREE_SUCCESS") {
      actionInvestigateSuccess(3);
    }

    // 해군의 조사 행동 실패
    if (socketMessage.message === "ACTION_INVESTIGATE_MARINE_ONE_FAIL") {
      actionInvestigateFail(1);
    }
    if (socketMessage.message === "ACTION_INVESTIGATE_MARINE_TWO_FAIL") {
      actionInvestigateFail(2);
    }
    if (socketMessage.message === "ACTION_INVESTIGATE_MARINE_THREE_FAIL") {
      actionInvestigateFail(3);
    }

    // 해군의 조사 행동 모두 실패
    if (socketMessage.message === "ACTION_INVESTIGATE_MARINE_ONE_ALL_FAILED") {
      actionInvestigateAllFail(1);
    }
    if (socketMessage.message === "ACTION_INVESTIGATE_MARINE_TWO_ALL_FAILED") {
      actionInvestigateAllFail(2);
    }
    if (
      socketMessage.message === "ACTION_INVESTIGATE_MARINE_THREE_ALL_FAILED"
    ) {
      actionInvestigateAllFail(3);
    }

    // 해군의 체포 행동 선택
    if (socketMessage.message === "ACTION_SELECT_WORK_MARINE_ONE_ARREST") {
      actionSelectWorkMarineArrest(1);
    }
    if (socketMessage.message === "ACTION_SELECT_WORK_MARINE_TWO_ARREST") {
      actionSelectWorkMarineArrest(2);
    }
    if (socketMessage.message === "ACTION_SELECT_WORK_MARINE_THREE_ARREST") {
      actionSelectWorkMarineArrest(3);
    }

    // 해군의 체포 행동 명령
    if (socketMessage.message === "ORDER_ARREST_MARINE_ONE") {
      orderArrestMarine(1);
    }
    if (socketMessage.message === "ORDER_ARREST_MARINE_TWO") {
      orderArrestMarine(2);
    }
    if (socketMessage.message === "ORDER_ARREST_MARINE_THREE") {
      orderArrestMarine(3);
    }

    // 해군의 체포 행동 성공
    if (socketMessage.message === "ACTION_ARREST_MARINE_ONE_SUCCESS") {
      console.log("해군 1 체포 성공");
    }
    if (socketMessage.message === "ACTION_ARREST_MARINE_TWO_SUCCESS") {
      console.log("해군 2 체포 성공");
    }
    if (socketMessage.message === "ACTION_ARREST_MARINE_THREE_SUCCESS") {
      console.log("해군 3 체포 성공");
    }

    // 해군의 체포 행동 실패
    if (socketMessage.message === "ACTION_ARREST_MARINE_ONE_FAIL") {
      actionArrestMarineFail(1);
    }
    if (socketMessage.message === "ACTION_ARREST_MARINE_TWO_FAIL") {
      actionArrestMarineFail(2);
    }
    if (socketMessage.message === "ACTION_ARREST_MARINE_THREE_FAIL") {
      actionArrestMarineFail(3);
    }

    // 다음 보물 상자 도착
    if (socketMessage.message === "ROUND_OVER") {
      roundOver();
    }

    // 턴 종료
    if (socketMessage.message === "TURN_OVER") {
      turnOver();
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
      <Chat />
      <Docs />
      <OptionButton />
      <Timer />
      <Round topLeft={[200, 1]} />
      <Turn
        topLeft={[500, 1]}
        currentTurn={socketMessage.game ? socketMessage.game.turn : 0}
      />
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
