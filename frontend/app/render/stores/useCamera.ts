import { MutableRefObject, useEffect, useRef } from "react";
import { useControls } from "leva";
import { create } from "zustand";
import { CameraControls } from "@react-three/drei";

export const DEFAULT_FAR = 1000000;
export const DEFAULT_FOV = 50;

interface CameraState {
  cameraRef: MutableRefObject<CameraControls> | null;
  setCamera: (newCameraRef: MutableRefObject<CameraControls>) => void;
  introScreen: () => void;
  mainScreen: () => void;
  ShopScreen: () => void;
  RoomScreen: () => void;
  LoginScreen: () => void;
  fastMatchingScreen: () => void;
  ShopGatchaScreen: () => void;
}

export const DEFAULT_CAMERA_POSITION = {
  x: 50000,
  y: 20000,
  z: -180000,
};

export const useCamera = create<CameraState>(set => ({
  cameraRef: null,
  setCamera: newCameraRef => {
    set(state => {
      return { ...state, cameraRef: newCameraRef };
    });
  },
  introScreen: () => {
    set(state => {
      if (state.cameraRef) {
        state.cameraRef.current.smoothTime = 2;
        state.cameraRef.current.setLookAt(
          35000,
          100000,
          -200000,
          -50000,
          60000,
          -30000,
          true,
        );
        state.cameraRef.current.zoomTo(1, true);
      } else {
        console.error(`Camera not initialized...`);
        //window.alert("카메라가 없다...");
      }
      return { ...state };
    });
  },
  mainScreen: () => {
    set(state => {
      if (state.cameraRef) {
        state.cameraRef.current.smoothTime = 0.25;
        state.cameraRef.current.setLookAt(
          -14863,
          100000,
          156881,
          -74590,
          33819,
          -101660,
          true,
        );
        state.cameraRef.current.zoomTo(1, true);
      } else {
        console.error(`Camera not initialized...`);
        //window.alert("카메라가 없다...");
      }
      return { ...state };
    });
  },
  ShopScreen: () => {
    set(state => {
      if (state.cameraRef) {
        state.cameraRef.current.setLookAt(
          16926,
          20000,
          -170000,
          -50000,
          30000,
          0,
          true,
        );
        state.cameraRef.current.zoomTo(1, true);
      } else {
        console.error(`Camera not initialized...`);
        //window.alert("카메라가 없다...");
      }
      return { ...state };
    });
  },
  RoomScreen: () => {
    set(state => {
      if (state.cameraRef?.current) {
        state.cameraRef.current.setLookAt(
          45708,
          48049,
          -15892,
          -100000,
          180000,
          120000,
          true,
        );
        state.cameraRef.current.zoomTo(1, true);
      } else {
        console.error(`Camera not initialized...`);
        //window.alert("카메라가 없다...");
      }
      return { ...state };
    });
  },
  LoginScreen: () => {
    set(state => {
      if (state.cameraRef?.current) {
        state.cameraRef.current.setLookAt(
          26037,
          15979,
          176843,
          60000,
          30000,
          0,
          true,
        );
        state.cameraRef.current.zoomTo(1, true);
      } else {
        console.error(`Camera not initialized...`);
        //window.alert("카메라가 없다...");
      }
      return { ...state };
    });
  },
  fastMatchingScreen: () => {
    set(state => {
      if (state.cameraRef?.current) {
        state.cameraRef.current.setLookAt(
          -62799,
          -559,
          -107983,
          -30000,
          0,
          0,
          true,
        );
        state.cameraRef.current.zoomTo(1, true);
      } else {
        console.error(`Camera not initialized...`);
        //window.alert("카메라가 없다...");
      }
      return { ...state };
    });
  },
  ShopGatchaScreen: () => {
    set(state => {
      if (state.cameraRef) {
        state.cameraRef.current.setLookAt(
          -50000,
          120000,
          -170000,
          -50000,
          130000,
          0,
          true,
        );
        state.cameraRef.current.zoomTo(1, true);
      } else {
        console.error(`Camera not initialized...`);
        //window.alert("카메라가 없다...");
      }
      return { ...state };
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

let prevX = 0;
let prevY = 0;
let prevZ = 0;

export const useCameraTest = () => {
  const { cameraRef } = useCamera();

  useControls({
    positionX: {
      value: DEFAULT_CAMERA_POSITION.x,
      min: -400000,
      max: 400000,
      step: 10000,
      onChange: nextX => {
        if (cameraRef) {
          const { x, y, z } = cameraRef.current.camera.position;
          cameraRef.current.setPosition(nextX, y, z);
          // console.log(nextX, y, z);
        }
      },
    },
    positionY: {
      value: DEFAULT_CAMERA_POSITION.y,
      min: -400000,
      max: 400000,
      step: 10000,
      onChange: nextY => {
        if (cameraRef) {
          const { x, y, z } = cameraRef.current.camera.position;
          cameraRef.current.setPosition(x, nextY, z);
          // console.log(x, nextY, z);
        }
      },
    },
    positionZ: {
      value: DEFAULT_CAMERA_POSITION.z,
      min: -400000,
      max: 400000,
      step: 10000,
      onChange: nextZ => {
        if (cameraRef) {
          const { x, y, z } = cameraRef.current.camera.position;
          cameraRef.current.setPosition(x, y, nextZ);
          // console.log(x, y, nextZ);
        }
      },
    },
    targetX: {
      value: prevX,
      min: -400000,
      max: 400000,
      step: 10000,
      onChange: nextX => {
        if (cameraRef) {
          prevX = nextX;
          cameraRef.current.setLookAt(
            DEFAULT_CAMERA_POSITION.x,
            DEFAULT_CAMERA_POSITION.y,
            DEFAULT_CAMERA_POSITION.z,
            prevX,
            prevY,
            prevZ,
            true,
          );

          // console.log(prevX, prevY, prevZ);
        }
      },
    },
    targetY: {
      value: prevY,
      min: -400000,
      max: 400000,
      step: 10000,
      onChange: nextY => {
        if (cameraRef) {
          prevY = nextY;
          cameraRef.current.setLookAt(
            DEFAULT_CAMERA_POSITION.x,
            DEFAULT_CAMERA_POSITION.y,
            DEFAULT_CAMERA_POSITION.z,
            prevX,
            prevY,
            prevZ,
            true,
          );

          // console.log(prevX, prevY, prevZ);
        }
      },
    },
    targetZ: {
      value: prevZ,
      min: -400000,
      max: 400000,
      step: 10000,
      onChange: nextZ => {
        if (cameraRef) {
          prevZ = nextZ;
          cameraRef.current.setLookAt(
            DEFAULT_CAMERA_POSITION.x,
            DEFAULT_CAMERA_POSITION.y,
            DEFAULT_CAMERA_POSITION.z,
            prevX,
            prevY,
            prevZ,
            true,
          );

          // console.log(prevX, prevY, prevZ);
        }
      },
    },
  });
};
