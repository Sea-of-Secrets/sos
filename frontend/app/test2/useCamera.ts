import { create } from "zustand";
import { CameraControls } from "@react-three/drei";
import { MutableRefObject } from "react";

interface CameraState {
  camera: MutableRefObject<CameraControls> | null;
  setCamera: (newCamera: MutableRefObject<CameraControls>) => void;
}

export const useCamera = create<CameraState>(set => ({
  camera: null,
  setCamera: newCamera => {
    set(state => {
      return { ...state, camera: newCamera };
    });
  },
}));
