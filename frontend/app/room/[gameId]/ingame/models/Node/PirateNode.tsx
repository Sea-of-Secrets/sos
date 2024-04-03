import { Cylinder, useGLTF, Text3D } from "@react-three/drei";

import { PirateNodeProps } from "./types";
import { useNode } from "../../hooks/useNode";

export default function PirateNode({ node, ...props }: PirateNodeProps) {
  const {
    meshRef,
    position,
    handleClickNode,
    handlePointerOut,
    handlePointerOver,
  } = useNode({ node });

  const { scene } = useGLTF("/pirate_mark/scene.gltf");
  const clonedScene = scene.clone();

  return (
    <>
      <mesh
        {...props}
        ref={meshRef}
        position={position}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        <primitive scale={15} object={clonedScene} />
        <Cylinder args={[13, 13, 0.1]} onClick={handleClickNode}>
          <meshStandardMaterial transparent opacity={0} />
        </Cylinder>
      </mesh>
      <Text3D
        material-color={"black"} // 색상 변경용
        position={[position[0] - 11, -48, position[2] - 15]}
        rotation={[-Math.PI / 6, 0, 0]}
        font={"/fonts/Bold_font.json"}
        scale={[10, 10, 5]}
      >
        {node.nodeId}
      </Text3D>
    </>
  );
}
