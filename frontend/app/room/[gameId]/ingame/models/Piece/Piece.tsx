import { useCallback, useEffect, useState } from "react";
import { ThreeEvent } from "@react-three/fiber";

import { useGLTF } from "../../hooks/useGLTF";
import { PiecePathMap } from "~/assetPath";
import { PieceProps } from "./types";
import PieceEffect from "./PieceEffect";
import { Vector3, Euler } from "three";

// const Z_AXIS_AJ_VALUE = 0;

export default function Piece({
  position,
  pieceName,
  set,
  ...props
}: PieceProps) {
  const { meshRef, gltf } = useGLTF(PiecePathMap[pieceName].src);

  // TODO: 이동중이면 이펙트를 없애고 이동완료되면 다시 소환

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
    if (set) {
      set(meshRef.current);
    }
  }, [meshRef, set]);

  useEffect(() => {
    if (hovered) {
      document.querySelector("canvas")!.style.cursor = "pointer";
    } else {
      document.querySelector("canvas")!.style.cursor = "default";
    }
  }, [hovered]);

  let piecePosition;
  if (pieceName === "PIRATE") {
    piecePosition = position
      ? new Vector3(position.x, position.z, position.y + 10)
      : undefined;
  } else if (pieceName === "MARINE1") {
    piecePosition = position
      ? new Vector3(position.x, position.z + 6, position.y)
      : undefined;
  } else if (pieceName === "MARINE2") {
    piecePosition = position
      ? new Vector3(position.x, position.z + 6, position.y)
      : undefined;
  } else if (pieceName === "MARINE3") {
    piecePosition = position
      ? new Vector3(position.x, position.z + 6, position.y)
      : undefined;
  }

  let pieceRotation;
  if (pieceName === "PIRATE") {
    pieceRotation = new Euler(0, Math.PI, 0);
  } else if (pieceName === "MARINE1") {
    pieceRotation = new Euler(0, Math.PI, 0);
  } else if (pieceName === "MARINE2") {
    pieceRotation = new Euler(0, Math.PI, 0);
  } else if (pieceName === "MARINE3") {
    pieceRotation = new Euler(0, Math.PI, 0);
  }

  return (
    <>
      <mesh
        {...props}
        ref={meshRef}
        position={piecePosition}
        rotation={pieceRotation}
        scale={PiecePathMap[pieceName].size}
        onClick={handleClickPiece}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        <primitive object={gltf.scene} />
      </mesh>
      <PieceEffect effectName="FOOTHOLD_LIGHT_BEAM" position={position} />
    </>
  );
}
