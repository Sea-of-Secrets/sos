import { create } from "zustand";
import { CameraControls } from "@react-three/drei";
import { MutableRefObject } from "react";

interface CameraState {
  cameraRef: MutableRefObject<CameraControls> | null;
  initialize: (cameraRef: MutableRefObject<CameraControls>) => void;
  pieceCamera: (position: number[]) => void;
  mapCamera: () => void;
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
  pieceCamera: position => {
    set(state => {
      if (state.cameraRef) {
        state.cameraRef.current.setLookAt(
          position[0],
          250,
          position[1] + 200,
          position[0],
          0,
          position[1],
          true,
        );
        state.cameraRef.current.zoomTo(1.5, true);
      }
      return state;
    });
  },
  mapCamera: () => {
    set(state => {
      if (state.cameraRef) {
        state.cameraRef.current.setLookAt(0, 700, 600, 0, 0, 100, true);
        state.cameraRef.current.zoomTo(1, true);
      }
      return state;
    });
  },
}));
