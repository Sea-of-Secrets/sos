import { Html, useProgress } from "@react-three/drei";
import { useEffect } from "react";
import { gameSocket } from "~/sockets";
import { useSystemPrompt } from "../stores/useSystemPrompt";
import useNickname from "~/store/nickname";
import useGameId from "~/store/gameId";
import { useSocketMessage } from "../stores/useSocketMessage";
import { useGameLoading } from "../stores/useGameLoading";

const { send } = gameSocket;

export default function Loading() {
  const { nickname } = useNickname();
  const { gameId } = useGameId();
  const { active } = useProgress();
  const { setMyLoading } = useGameLoading();
  const { socketMessage } = useSocketMessage();

  useEffect(() => {
    if (!active && socketMessage.sender !== nickname) {
      setMyLoading(true);
      send("/pub/room", {
        message: "RENDERED_COMPLETE",
        sender: nickname,
        gameId,
      });
    }
  }, [active, nickname, gameId]);

  return null;
}
