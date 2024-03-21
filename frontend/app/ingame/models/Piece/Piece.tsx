import * as THREE from "three";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useFrame, ThreeEvent } from "@react-three/fiber";

import { PieceProps } from "./types";
import { PIECE_SIZE } from "./constants";

export default function Piece({ position, ...props }: PieceProps) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  const handleClickPiece = useCallback((e: ThreeEvent<MouseEvent>) => {
    setActive(prev => !prev);
  }, []);

  const handlePointerOver = useCallback(() => {
    setHover(true);
  }, []);

  const handlePointerOut = useCallback(() => {
    setHover(false);
  }, []);

  useFrame((state, delta) => (meshRef.current.rotation.x += delta));

  useEffect(() => {
    if (hovered) {
      document.querySelector("canvas")!.style.cursor = "pointer";
    } else {
      document.querySelector("canvas")!.style.cursor = "default";
    }
  }, [hovered]);

  if (!position) {
    return null;
  }

  return (
    <mesh
      {...props}
      ref={meshRef}
      scale={active ? 1.5 : 1}
      onClick={handleClickPiece}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      <boxGeometry args={[PIECE_SIZE, PIECE_SIZE, PIECE_SIZE]} />
      <meshStandardMaterial
        metalness={0}
        roughness={1}
        color={hovered ? "tomato" : "orange"}
      />
    </mesh>
  );
}
