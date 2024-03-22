import { Box, Edges } from "@react-three/drei";

import { MarineNodeProps } from "./types";
import { NODE_SCALE } from "./constants";
import { useNode } from "../../hooks/useNode";

export default function MarineNode({ node, ...props }: MarineNodeProps) {
  const {
    meshRef,
    position,
    handleClickPiece,
    handlePointerOut,
    handlePointerOver,
  } = useNode({ node });

  return (
    <mesh
      {...props}
      ref={meshRef}
      position={position}
      scale={NODE_SCALE}
      onClick={handleClickPiece}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      <Box args={[7, 2, 7]} material-color="blue">
        <Edges color="black" />
      </Box>
    </mesh>
  );
}
