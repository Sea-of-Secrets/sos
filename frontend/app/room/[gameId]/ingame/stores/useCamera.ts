import { create } from "zustand";
import { CameraControls } from "@react-three/drei";
import { MutableRefObject } from "react";
import { NodePosition } from "~/_lib/data/types";

export const DEFAULT_POSITION: [number, number, number] = [0, 800, 500];
export const DEFAULT_FAR = 10000;
export const DEFAULT_FOV = 50;

interface CameraState {
  cameraRef: MutableRefObject<CameraControls> | null;
  initialize: (cameraRef: MutableRefObject<CameraControls>) => void;
  zoom: (
    position: NodePosition,
    options?: {
      x?: number;
      y?: number;
      z?: number;
      level?: number;
    },
  ) => void;
  zoomFullScreen: () => void;
  zoomMarineStart: () => void;
  gameStartAnimation: () => void;
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
  zoom: (position, options) => {
    set(state => {
      const { x, y, z } = position;
      if (state.cameraRef) {
        state.cameraRef.current.setLookAt(
          x,
          300 * (options?.level ?? 1),
          y + 400,
          options?.x ?? x,
          options?.z ?? 0,
          options?.y ?? y,
          true,
        );
        state.cameraRef.current.zoomTo(1.5, true);
      } else {
        console.error(`Camera not initialized...`);
        window.alert("카메라가 없다...");
      }
      return { ...state };
    });
  },
  zoomFullScreen: () => {
    set(state => {
      if (state.cameraRef?.current) {
        state.cameraRef.current.setLookAt(...DEFAULT_POSITION, 0, 0, 100, true);
        state.cameraRef.current.zoomTo(1, true);
      } else {
        console.error(`Camera not initialized...`);
        window.alert("카메라가 없다...");
      }
      return { ...state };
    });
  },
  zoomMarineStart: () => {
    set(state => {
      if (state.cameraRef?.current) {
        state.cameraRef.current.setLookAt(...DEFAULT_POSITION, 0, 0, 0, true);
        state.cameraRef.current.zoomTo(2, true);
      } else {
        console.error(`Camera not initialized...`);
        window.alert("카메라가 없다...");
      }
      return { ...state };
    });
  },
  gameStartAnimation: () => {
    set(state => {
      if (state.cameraRef) {
        state.cameraRef.current.setLookAt(...DEFAULT_POSITION, 0, 0, 100, true);
        state.cameraRef.current.zoomTo(1, true);
      } else {
        console.error(`Camera not initialized...`);
        window.alert("카메라가 없다...");
      }
      return { ...state };
    });
  },
}));
