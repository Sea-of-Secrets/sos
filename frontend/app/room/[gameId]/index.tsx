"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { gameSocket } from "~/sockets";
import useNickname from "~/store/nickname";
import Image from "next/image";
import { useSocketMessage } from "./ingame/stores/useSocketMessage";

const { send } = gameSocket;

export default function Room() {
  const params = useParams() as { gameId: string };
  const router = useRouter();
  const { gameId } = params;
  const { nickname } = useNickname();
  const [isHost, setIsHost] = useState(false);
  const [isFull, setIsFull] = useState(false);
  const [players, setPlayers] = useState([]);
  const { socketMessage } = useSocketMessage();

  const gridColumns: { [key: number]: string } = {
    0: "grid-cols-0",
    1: "grid-cols-1",
    2: "grid-cols-2",
    3: "grid-cols-3 sm-grid-cols-2",
    4: "grid-cols-4 sm-grid-cols-2",
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(gameId);
      alert("클립보드에 복사되었습니다.");
    } catch (err) {
      console.error("클립보드 복사 실패:", err);
    }
  };

  const handleConfirm = () => {
    // 게임 시작 버튼 클릭
    send("/pub/room", {
      message: "START_BUTTON_CLICKED",
      sender: nickname,
      gameId,
    });
  };

  useEffect(() => {
    // 플레이어 입장 OR 퇴장
    if (
      socketMessage.message == "ENTER_SUCCESS" ||
      socketMessage.message == "PLAYER_LEAVED"
    ) {
      // 방 인원 새로고침
      setPlayers(socketMessage.room.inRoomPlayers);

      // 풀방 아님
      setIsFull(false);

      // 방장 여부 확인
      if (socketMessage.room.host.nickname == nickname) {
        setIsHost(true);
      }
    }

    // 방 최대 인원 입장
    if (socketMessage.message == "PREPARE_GAME_START") {
      // 시작하기 버튼 활성화
      setIsFull(true);
    }

    // 시작 버튼 클릭
    if (socketMessage.message == "START_BUTTON_CLICKED") {
      // 인게임 이동
      router.push(`/room/${gameId}/ingame`);
    }

    // 방장이 아닌데 게임 시작한 경우
    if (socketMessage.message == "ONLY_HOST_CAN_START") {
      // 인게임 이동
      alert("게임시작은 방장만 가능합니다.");
    }
    // });

    // 입장 시, 알림
  }, [socketMessage]);

  return (
    <>
      <div className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex max-w-2xl mx-0 gap-5">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              방 코드 : {gameId}
            </h2>
            <button
              type="button"
              className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              onClick={copyToClipboard}
            >
              복사
            </button>
          </div>
          <ul
            role="list"
            className={`mx-auto mt-20 grid ${gridColumns[players.length]} gap-x-8 gap-y-16`}
          >
            {players.map(player => (
              <li
                key={player["nickname"]}
                className="flex flex-col items-center"
              >
                <Image
                  src="/pxfuel.jpg"
                  width={100}
                  height={100}
                  alt="기본 이미지"
                  className="mx-auto h-48 w-48 rounded-full"
                />
                <h3 className="mt-6 text-lg text-center font-semibold leading-8 tracking-tight text-gray-900">
                  {player["nickname"]}
                </h3>
              </li>
            ))}
          </ul>
          <div className="mt-5 flex justify-center mx-auto gap-5">
            {isHost && (
              <button
                type="button"
                className={`rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 ${
                  !isFull ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-50"
                }`}
                onClick={handleConfirm}
                disabled={!isFull}
              >
                게임시작
              </button>
            )}
            <button
              type="button"
              className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              onClick={() => (window.location.href = "/")}
            >
              나가기
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
