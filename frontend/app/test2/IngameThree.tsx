import { PerspectiveCamera, CameraControls } from "@react-three/drei";
import Model from "./Model";
import { useThree } from "@react-three/fiber";
import { useControls } from "leva";
import { useCamera } from "./useCamera";
import { useRef, useEffect } from "react";

export default function IngameThree() {
  const { camera } = useCamera();

  useControls({
    positionX: {
      value: 0,
      min: -200000,
      max: 200000,
      step: 10000,
      onChange: nextX => {
        if (camera) {
          const { x, y, z } = camera.current.camera.position;
          camera.current.setPosition(nextX, y, z);
        }
      },
    },
    positionY: {
      value: 0,
      min: -200000,
      max: 200000,
      step: 10000,
      onChange: y => {
        //camera.position.y = y;
      },
    },
    positionZ: {
      value: 0,
      min: -200000,
      max: 200000,
      step: 10000,
      onChange: z => {
        //camera.position.z = z;
      },
    },
  });

  return (
    <>
      <Model />
    </>
  );
}
