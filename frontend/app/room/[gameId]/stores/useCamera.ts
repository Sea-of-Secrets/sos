import { MutableRefObject } from "react";
import { create } from "zustand";
import { CameraControls } from "@react-three/drei";

interface CameraState {
  cameraRef: MutableRefObject<CameraControls> | null;
  setCamera: (newCameraRef: MutableRefObject<CameraControls>) => void;
  mainScreen: () => void;
}

export const useCamera = create<CameraState>(set => ({
  cameraRef: null,
  setCamera: newCameraRef => {
    set(state => {
      return { ...state, cameraRef: newCameraRef };
    });
  },
  mainScreen: () => {
    set(state => {
      if (state.cameraRef) {
        state.cameraRef.current.setLookAt(0, 5, 7, 0, -1, 0, false);
        state.cameraRef.current.zoomTo(1.5, false);
      } else {
        console.error(`Camera not initialized...`);
        window.alert("카메라가 없다...");
      }
      return { ...state };
    });
  },
}));
