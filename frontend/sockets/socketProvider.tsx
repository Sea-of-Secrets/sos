"use client";

import { useEffect } from "react";
import { useSocketMessage } from "~/app/room/[gameId]/ingame/stores/useSocketMessage";
import { gameSocket } from "~/sockets";
import useGameId from "~/store/gameId";
import useNickname from "~/store/nickname";

const { connect, subscribe, send, disconnect } = gameSocket;

const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const { setSocketMessage } = useSocketMessage();
  const { nickname } = useNickname();
  const { gameId } = useGameId();

  const onConnect = () => {
    console.log("공용 소켓 연결 성공");
    const gameIdFromLocalStorage = localStorage.getItem("gameId");
    if (gameIdFromLocalStorage) {
      const localGameId = JSON.parse(gameIdFromLocalStorage).state.gameId;
      subscribe(`/sub/${localGameId}`, message => {
        const data = JSON.parse(message.body);
        if (data) {
          console.log("서 > 클", data);
          setSocketMessage(data);
        }
      });
    }
    send("/pub/room", {
      message: "ENTER_ROOM",
      sender: nickname,
      gameId,
    });
  };

  useEffect(() => {
    connect(onConnect);
    return () => {
      disconnect();
    };
  }, []);

  return <>{children}</>;
};

export default SocketProvider;
