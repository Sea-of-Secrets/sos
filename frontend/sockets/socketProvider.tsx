"use client";

import { useEffect } from "react";
import { useGameLoading } from "~/app/room/[gameId]/ingame/stores/useGameLoading";
import { useSocketMessage } from "~/app/room/[gameId]/ingame/stores/useSocketMessage";
import { useRenderList } from "~/app/room/[gameId]/ingame/stores/useRenderList";
import { gameSocket } from "~/sockets";
import useGameId from "~/store/gameId";
import useNickname from "~/store/nickname";

const { connect, subscribe, send, disconnect } = gameSocket;

const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const { setSocketMessage, setChatMessage } = useSocketMessage();
  const { setLoading } = useGameLoading();
  const { renderList, setRenderList } = useRenderList();
  const { nickname } = useNickname();
  const { gameId } = useGameId();

  const onConnect = () => {
    console.log("공용 소켓 연결 성공");
    const gameIdFromLocalStorage = localStorage.getItem("gameId");
    if (gameIdFromLocalStorage) {
      const localGameId = JSON.parse(gameIdFromLocalStorage).state.gameId;

      subscribe(`/sub/${localGameId}`, message => {
        const data = JSON.parse(message.body);
        console.log("서 > 클", data);
        if (data.message === "ALL_RENDERED_COMPLETED") {
          setLoading(false);
        }
        if (data.message === "RENDER_COMPLETE_ACCEPTED") {
          setRenderList(data.sender);
        }
        if (data.message === "CHATTING") {
          setChatMessage(data);
        } else {
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
