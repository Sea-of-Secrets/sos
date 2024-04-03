"use client";

import styled from "@emotion/styled";
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
  const [roomCode, setRoomCode] = useState("방 코드");
  const [players, setPlayers] = useState([]);
  const { socketMessage } = useSocketMessage();

  // const gridColumns: { [key: number]: string } = {
  //   0: "grid-cols-0",
  //   1: "grid-cols-1 sm-grid-cols-2",
  //   2: "grid-cols-2 sm-grid-cols-2",
  //   3: "grid-cols-3 sm-grid-cols-2",
  //   4: "grid-cols-4 sm-grid-cols-2",
  // };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(gameId);
      setRoomCode("복사됨");
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
    if (socketMessage.message == "ENTER_SUCCESS") {
      // 방 인원 새로고침
      setPlayers(socketMessage.room.inRoomPlayers);

      // 방장 여부 확인
      if (socketMessage.room.host.nickname == nickname) {
        setIsHost(true);
      }
    }

    if (socketMessage.message == "PLAYER_LEAVED") {
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
    <div className="py-8 px-8 ">
      <Button onClick={copyToClipboard} size="sm">
        {roomCode} : {gameId}
      </Button>
      <Container>
        {players.map(player => (
          <UserContainer key={player["nickname"]}>
            <UserInfo>
              <p className="mb-1">닉네임 : {player["nickname"]}</p>
              <p className="mb-5">
                설정한 배 :{" "}
                {player["userInfo"]?.["productName"]
                  ? player["userInfo"]["productName"]
                  : "기본"}
              </p>
              {player["userInfo"] && player["userInfo"]["productName"] ? (
                <Image
                  src={`/ship_images/${player["userInfo"]["productName"]}.png`}
                  width={100}
                  height={100}
                  alt="유저 기본 배 이미지"
                  className="mx-auto h-48 w-48 rounded-full "
                />
              ) : (
                <Image
                  src={"/pxfuel.jpg"}
                  width={100}
                  height={100}
                  alt="게스트 기본 배 이미지"
                  className="mx-auto h-48 w-48 rounded-full "
                />
              )}
            </UserInfo>
          </UserContainer>
        ))}
      </Container>
      <div className="mt-5 flex justify-center mx-auto gap-5">
        {isHost && (
          <Button
            size="sm"
            className={`${!isFull ? "opacity-50 cursor-not-allowed" : ""}`}
            onClick={handleConfirm}
            disabled={!isFull}
          >
            게임시작
          </Button>
        )}
        <Button size="sm" onClick={() => (window.location.href = "/")}>
          나가기
        </Button>
      </div>
    </div>
  );
}

const Button = styled.button<{ size?: "xs" | "md" | "sm" }>`
  position: relative;
  padding: 0.5rem 1.5rem;
  background: url("/assets/text-background.png") no-repeat center center;
  background-size: cover;
  font-size: ${({ size }) => {
    switch (size) {
      case "xs":
        return "8px";
      case "sm":
        return "20px";
      default:
        return "40px";
    }
  }};
  color: #fff;
  transition: transform 0.4s ease;
  &:hover {
    transform: scale(1.1);
  }

  ${({ size }) => {
    switch (size) {
      case "xs":
        return `
          min-width: 5rem;
          min-height: 2rem;
        `;
      case "sm":
        return `
          min-width: 8rem;
          min-height: 5rem;
        `;
      default:
        return `
          min-width: 22rem;
          min-height: 8rem;
        `;
    }
  }}
`;

const UserContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 25rem;
  height: 25rem;
  padding: 1rem;
  background: url("/assets/modal-background.png") no-repeat center center;
  background-size: cover;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 15rem;
  height: 20rem;
  padding: 1rem;
`;

const Container = styled.div`
  display: flex;
  min-height: 30rem;
  padding: 2rem;
  align-items: center;
  justify-content: space-around;
  gap: 1rem;
`;
