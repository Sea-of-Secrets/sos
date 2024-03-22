import { PieceProps } from "./types";
import { useGLTF } from "../../hooks/useGLTF";
import { PiecePathMap } from "~/assetPath";
import { usePiece } from "../../hooks/usePiece";
import PieceEffect from "./PieceEffect";

const Z_AXIS_AJ_VALUE = 20;

export default function Piece({ position, pieceName, ...props }: PieceProps) {
  const { meshRef, gltf } = useGLTF({
    src: PiecePathMap[pieceName].src,
  });

  const { handleClickPiece, handlePointerOut, handlePointerOver } = usePiece();

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
