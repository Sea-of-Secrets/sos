import { useCallback, useEffect, useState } from "react";
import { ThreeEvent } from "@react-three/fiber";

import { PiecePathMap } from "~/assetPath";
import { PieceProps } from "./types";
import { useGLTF } from "../../hooks/useGLTF";

import PieceEffect from "./PieceEffect";

const Z_AXIS_AJ_VALUE = 20;

export default function Piece({ position, pieceName, ...props }: PieceProps) {
  const { meshRef, gltf } = useGLTF({
    src: PiecePathMap[pieceName].src,
  });

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

  return (
    <>
      <mesh
        {...props}
        ref={meshRef}
        position={[position.x, position.z + Z_AXIS_AJ_VALUE, position.y]}
        scale={15}
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
