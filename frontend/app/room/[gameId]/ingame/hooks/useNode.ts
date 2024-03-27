import { ThreeEvent } from "@react-three/fiber";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

import { IngameGraphNode } from "~/_lib/data/types";

export const useNode = ({ node }: { node: IngameGraphNode }) => {
  const position: [number, number, number] = useMemo(
    () => [node.position.x, node.position.z, node.position.y],
    [node],
  );
  const meshRef = useRef<THREE.Mesh>(null);
  const [isHover, setIsHover] = useState(false);

  const handleClickPiece = useCallback(
    (e: ThreeEvent<MouseEvent>) => {
      console.log("******** Node Click ********");
      console.log("노드 정보", node);
      console.log("이벤트", e);
      console.log("****************************");
    },
    [node],
  );

  const handlePointerOver = useCallback(() => {
    setIsHover(true);
  }, []);

  const handlePointerOut = useCallback(() => {
    setIsHover(false);
  }, []);

  useEffect(() => {
    if (isHover) {
      document.querySelector("canvas")!.style.cursor = "pointer";
    } else {
      document.querySelector("canvas")!.style.cursor = "default";
    }
  }, [isHover]);

  return {
    position,
    meshRef,
    isHover,
    handleClickPiece,
    handlePointerOver,
    handlePointerOut,
  };
};
