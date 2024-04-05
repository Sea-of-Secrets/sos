import { useProgress } from "@react-three/drei";
import { gameSocket } from "~/sockets";
import { useSocketMessage } from "../stores/useSocketMessage";
import { useGameLoading } from "../stores/useGameLoading";
import { useRenderList } from "../stores/useRenderList";

const { send } = gameSocket;

export default function Loading() {
  const { progress } = useProgress();
  const { socketMessage } = useSocketMessage();
  const { myLoading } = useGameLoading();
  const { renderList } = useRenderList();

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "black",
        color: "white",
        zIndex: 999,
      }}
    >
      <div
        style={{
          justifyContent: "center",
          alignItems: "center",
          fontSize: "24px",
        }}
        className="flex flex-col"
      >
        <span>{!myLoading && `${Math.floor(progress)}%`}</span>
        <span>로딩 완료 유저 : [{renderList}]</span>
      </div>
    </div>
  );
}
