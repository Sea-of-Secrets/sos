import { Box, Edges } from "@react-three/drei";

import { MarineNodeProps } from "./types";
import { NODE_SCALE } from "./constants";
import { useNode } from "../../hooks/useNode";
import { usePirateGraph } from "../../stores/graph";
import { useWhenMarineStartGame } from "../../stores/useWhenMarineStartGame";

const ON_COLOR = "#03fc39";
const DEFAULT_COLOR = "blue";

export default function MarineNode({ node, ...props }: MarineNodeProps) {
  const {
    meshRef,
    position,
    handleClickPiece,
    handlePointerOut,
    handlePointerOver,
  } = useNode({ node });

  const { movableNodeIdList } = usePirateGraph();

  const { isMarineStartGameTurn, selectableStartNodeList } =
    useWhenMarineStartGame();

  const getColor = () => {
    if (
      isMarineStartGameTurn &&
      selectableStartNodeList
        .map(selectableNode => selectableNode.nodeId)
        .includes(node.nodeId)
    ) {
      return ON_COLOR;
    }
    if (movableNodeIdList.includes(node.nodeId)) {
      return ON_COLOR;
    }
    return DEFAULT_COLOR;
  };

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
      <Box args={[7, 2, 7]} material-color={getColor()}>
        <Edges color="black" />
      </Box>
    </mesh>
  );
}
