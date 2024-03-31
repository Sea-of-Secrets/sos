import { create } from "zustand";
import { CameraControls } from "@react-three/drei";
import { MutableRefObject } from "react";

export const DEFAULT_POSITION: [number, number, number] = [
  -14863, 100000, 156881,
];
export const DEFAULT_FAR = 1000000;
export const DEFAULT_FOV = 50;

interface CameraState {
  cameraRef: MutableRefObject<CameraControls> | null;
  initialize: (cameraRef: MutableRefObject<CameraControls>) => void;
  mainScreen: () => void;
  ShopScreen: () => void;
}

export const useCamera = create<CameraState>(set => ({
  cameraRef: null,
  initialize: cameraRef => {
    set(state => {
      if (state.cameraRef) {
        return state;
      }
      return { ...state, cameraRef };
    });
  },
  mainScreen: () => {
    set(state => {
      if (state.cameraRef?.current) {
        state.cameraRef.current.setLookAt(
          ...DEFAULT_POSITION,
          -74590,
          33819,
          -101660,
          true,
        );
        state.cameraRef.current.zoomTo(1, true);
      } else {
        console.error(`Camera not initialized...`);
        window.alert("카메라가 없다...");
      }
      return { ...state };
    });
  },
  ShopScreen: () => {
    set(state => {
      if (state.cameraRef?.current) {
        state.cameraRef.current.setLookAt(
          23029,
          -2276,
          -103889,
          15000,
          30000,
          0,
          true,
        );
        state.cameraRef.current.zoomTo(1, true);
      } else {
        console.error(`Camera not initialized...`);
        window.alert("카메라가 없다...");
      }
      return { ...state };
    });
  },
}));
