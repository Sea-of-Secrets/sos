import { useCallback, useEffect, useState } from "react";
import { ThreeEvent } from "@react-three/fiber";
import { Vector3, Euler } from "three";

import { useGLTF } from "../../hooks/useGLTF";
import { PiecePathMap } from "~/assetPath";
import { PieceProps } from "./types";

import { useSocketMessage } from "../../stores/useSocketMessage";
import useNickname from "~/store/nickname";

export default function Piece({
  name,
  position,
  pieceName,
  set,
  ...props
}: PieceProps) {
  const { meshRef, gltf } = useGLTF(PiecePathMap[pieceName].src);
  const { socketMessage } = useSocketMessage();
  const { nickname } = useNickname();

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
  let pieceRotation;
  let visible;

  if (name === "PIRATE") {
    visible =
      socketMessage?.game?.currentPosition[0] !== 0 &&
      socketMessage?.game?.players[0]?.nickname === nickname;
    piecePosition = position
      ? new Vector3(position.x, position.z, position.y)
      : undefined;
  } else if (name === "MARINE1") {
    piecePosition = position
      ? new Vector3(position.x, position.z + 6, position.y)
      : undefined;
    visible = socketMessage?.game?.currentPosition[1] !== 0;
  } else if (name === "MARINE2") {
    visible = socketMessage?.game?.currentPosition[2] !== 0;
    piecePosition = position
      ? new Vector3(position.x, position.z + 6, position.y)
      : undefined;
  } else if (name === "MARINE3") {
    visible = socketMessage?.game?.currentPosition[3] !== 0;
    piecePosition = position
      ? new Vector3(position.x, position.z + 6, position.y)
      : undefined;
  }

  if (pieceName === "legendary1") {
    piecePosition = position
      ? new Vector3(position.x, position.z, position.y + 10)
      : undefined;
  }

  if (pieceName === "PIRATE") {
    pieceRotation = new Euler(0, Math.PI, 0);
    piecePosition = position
      ? new Vector3(position.x, position.z, position.y + 10)
      : undefined;
  }

  if (pieceName === "MARINE1") {
    pieceRotation = new Euler(0, Math.PI, 0);
  }

  if (pieceName === "MARINE2") {
    pieceRotation = new Euler(0, Math.PI, 0);
  }

  if (pieceName === "MARINE3") {
    pieceRotation = new Euler(0, Math.PI, 0);
  }

  if (pieceName === "Zuhee") {
    pieceRotation = new Euler(0, Math.PI, 0);
    piecePosition = new Vector3(position.x - 10, position.z + 30, position.y);
  }

  if (pieceName === "common1") {
    pieceRotation = new Euler(0, -Math.PI / 2, 0);
    piecePosition = new Vector3(position.x, position.z + 15, position.y);
  }

  if (pieceName === "common2") {
    pieceRotation = new Euler(0, 0, 0);
    piecePosition = new Vector3(position.x, position.z + 10, position.y);
  }

  if (pieceName === "common3") {
    pieceRotation = new Euler(0, Math.PI, 0);
    piecePosition = new Vector3(position.x, position.z + 5, position.y);
  }

  return (
    <>
      <mesh
        {...props}
        ref={meshRef}
        position={piecePosition}
        rotation={pieceRotation}
        visible={visible}
        scale={PiecePathMap[pieceName].size}
        onClick={handleClickPiece}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        <primitive object={gltf.scene} />
      </mesh>
    </>
  );
}
