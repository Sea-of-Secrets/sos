import { ThreeEvent } from "@react-three/fiber";
import { useCallback, useRef, useState } from "react";
import * as THREE from "three";

import { IngameGraphNode } from "~/_lib/data";

export const useNode = ({ node }: { node: IngameGraphNode }) => {
  const position: [number, number, number] = [
    node.position[0],
    node.position[2],
    node.position[1],
  ];
  const meshRef = useRef<THREE.Mesh>(null);
  const [isHover, setIsHover] = useState(false);

  const handleClickPiece = useCallback(
    (e: ThreeEvent<MouseEvent>) => {
      console.log(node);
    },
    [node],
  );

  const handlePointerOver = useCallback(() => {
    setIsHover(true);
  }, []);

  const handlePointerOut = useCallback(() => {
    setIsHover(false);
  }, []);

  return {
    position,
    meshRef,
    isHover,
    handleClickPiece,
    handlePointerOver,
    handlePointerOut,
  };
};
