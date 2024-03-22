import styles from "./Ejj.module.scss";
import { useState } from "react";

import usePiece from "~/store/piece";
import { useCamera } from "../stores/useCamera";
import { getNode } from "~/_lib/data/data";

export default function EjjTestController({
  newMoveableNodes,
  setNextMoveableNodes,
  newNodeEdge,
  setNextNodeEdge,
}: any) {
  const { movePirate } = usePiece();
  const { zoom, zoomFullScreen } = useCamera();
  const [isNextMoveableNodes, setIsNextMoveableNodes] = useState(true);
  const [isNewNodeEdge, setIsNewNodeEdge] = useState(true);
  const [isFocused, setIsFocused] = useState(false);
  const [isMoved, setIsMoved] = useState(false);

  // 이동 가능 노드 표시
  const handleNextMoveableNodes = () => {
    setIsNextMoveableNodes(!isNextMoveableNodes);
    setNextMoveableNodes(isNextMoveableNodes ? newMoveableNodes : []);
  };

  // 다음 노드 경로 표시
  const handleNextNodeEdge = () => {
    setIsNewNodeEdge(!isNewNodeEdge);
    setNextNodeEdge(isNewNodeEdge ? newNodeEdge : []);
  };

  // 말 포커싱
  const handleFocusPiece = () => {
    if (!isFocused) {
      zoom(getNode(107).position);
      setIsFocused(true);
    } else {
      zoomFullScreen();
      setIsFocused(false);
    }
  };

  // 말 이동
  const handleMovePiece = () => {
    setIsMoved(!isMoved);
    movePirate(
      isMoved ? [getNode(107).position.x, getNode(107).position.y] : [-30, 100],
    );
  };

  return (
    <div className={styles.box}>
      <button className={styles.greenbutton} onClick={handleNextMoveableNodes}>
        {isNextMoveableNodes ? "이동 가능 노드 표시" : "이동 가능 노드 미표시"}
      </button>
      <button className={styles.greenbutton} onClick={handleNextNodeEdge}>
        {isNewNodeEdge ? "다음 경로 표시" : "다음 경로 미표시"}
      </button>
      <button className={styles.greenbutton} onClick={handleFocusPiece}>
        {isFocused ? "전체 포커싱" : "말 포커싱"}
      </button>
      <button className={styles.greenbutton} onClick={handleMovePiece}>
        말 이동
      </button>
    </div>
  );
}
