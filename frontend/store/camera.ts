import { create } from "zustand";
import { CameraControls } from "@react-three/drei";

interface CameraState {
  camera: CameraControls | null;
  setCamera: (value: CameraControls | null) => void;
  pieceCamera: (position: number[]) => void;
  mapCamera: () => void;
}

const useCamera = create<CameraState>(set => ({
  camera: null,
  setCamera: value => set({ camera: value }),
  pieceCamera: position => {
    set(state => {
      if (state.camera) {
        state.camera.setLookAt(
          position[0],
          250,
          position[1] + 200,
          position[0],
          0,
          position[1],
          true,
        );
        state.camera.zoomTo(1.5, true);
      }
      return state;
    });
  },
  mapCamera: () => {
    set(state => {
      if (state.camera) {
        state.camera.setLookAt(0, 700, 600, 0, 0, 100, true);
        state.camera.zoomTo(1, true);
      }
      return state;
    });
  },
}));

export default useCamera;
