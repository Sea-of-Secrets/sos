import { useGameLoading } from "../stores/useGameLoading";
import { useRenderList } from "~/app/room/[gameId]/ingame/stores/useRenderList";

export default function Loading() {
  const { loading } = useGameLoading();
  const { renderList } = useRenderList();

  if (!loading) {
    return null;
  }

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
        fontSize: "24px",
        zIndex: 999,
      }}
    >
      <p>Loading...</p>
      {/* <div>
        {renderList.map((item, index) => (
          <p key={index}>{item}</p>
        ))}
      </div> */}
    </div>
  );
}
