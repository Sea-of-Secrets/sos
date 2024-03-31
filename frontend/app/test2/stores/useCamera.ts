import { MutableRefObject, useEffect, useRef } from "react";
import { useControls } from "leva";
import { create } from "zustand";
import { CameraControls } from "@react-three/drei";

interface CameraState {
  camera: MutableRefObject<CameraControls> | null;
  setCamera: (newCamera: MutableRefObject<CameraControls>) => void;
}

export const DEFAULT_CAMERA_POSITION = {
  x: 50000,
  y: 20000,
  z: -180000,
};

export const useCamera = create<CameraState>(set => ({
  camera: null,
  setCamera: newCamera => {
    set(state => {
      return { ...state, camera: newCamera };
    });
  },
}));

export const useCameraInit = () => {
  const cameraRef = useRef<CameraControls>(null!);
  const { setCamera } = useCamera();
  useEffect(() => {
    setCamera(cameraRef);
  }, [setCamera]);
  return { cameraRef };
};

export const useCameraTest = () => {
  const { camera } = useCamera();

  useControls({
    positionX: {
      value: DEFAULT_CAMERA_POSITION.x,
      min: -400000,
      max: 400000,
      step: 10000,
      onChange: nextX => {
        if (camera) {
          const { x, y, z } = camera.current.camera.position;
          camera.current.setPosition(nextX, y, z);
          console.log(nextX, y, z);
        }
      },
    },
    positionY: {
      value: DEFAULT_CAMERA_POSITION.y,
      min: -400000,
      max: 400000,
      step: 10000,
      onChange: nextY => {
        if (camera) {
          const { x, y, z } = camera.current.camera.position;
          camera.current.setPosition(x, nextY, z);
          console.log(x, nextY, z);
        }
      },
    },
    positionZ: {
      value: DEFAULT_CAMERA_POSITION.z,
      min: -400000,
      max: 400000,
      step: 10000,
      onChange: nextZ => {
        if (camera) {
          const { x, y, z } = camera.current.camera.position;
          camera.current.setPosition(x, y, nextZ);
          console.log(x, y, nextZ);
        }
      },
    },
  });
};
