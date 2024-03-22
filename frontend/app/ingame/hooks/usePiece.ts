import { useCallback, useEffect, useState } from "react";
import { ThreeEvent } from "@react-three/fiber";

export const usePiece = () => {
  const [hovered, setHover] = useState(false);

  const handleClickPiece = useCallback((e: ThreeEvent<MouseEvent>) => {
    console.log("******** Piece Click ********");
    console.log("이벤트", e);
    console.log("****************************");
  }, []);

  const handlePointerOver = useCallback(() => {
    setHover(true);
  }, []);

  const handlePointerOut = useCallback(() => {
    setHover(false);
  }, []);

  useEffect(() => {
    if (hovered) {
      document.querySelector("canvas")!.style.cursor = "pointer";
    } else {
      document.querySelector("canvas")!.style.cursor = "default";
    }
  }, [hovered]);

  return {
    hovered,
    handleClickPiece,
    handlePointerOut,
    handlePointerOver,
  };
};
