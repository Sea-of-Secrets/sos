import { create } from "zustand";
import { CameraControls } from "@react-three/drei";
import { MutableRefObject } from "react";

export const DEFAULT_FAR = 1000000;
export const DEFAULT_FOV = 50;

interface CameraState {
  cameraRef: MutableRefObject<CameraControls> | null;
  initialize: (cameraRef: MutableRefObject<CameraControls>) => void;
  mainScreen: () => void;
  ShopScreen: () => void;
  RoomScreen: () => void;
  aScreen: () => void;
  bScreen: () => void;
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
        window.alert("카메라가 없다...");
      }
      return { ...state };
    });
  },
  ShopScreen: () => {
    set(state => {
      if (state.cameraRef?.current) {
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
        window.alert("카메라가 없다...");
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
        window.alert("카메라가 없다...");
      }
      return { ...state };
    });
  },
  aScreen: () => {
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
        window.alert("카메라가 없다...");
      }
      return { ...state };
    });
  },
  bScreen: () => {
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
        window.alert("카메라가 없다...");
      }
      return { ...state };
    });
  },
}));
