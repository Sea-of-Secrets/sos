import { useEffect, useRef } from "react";
import { CameraControls } from "@react-three/drei";

import { useCamera } from "./stores/useCamera";

export default function Camera() {
  const cameraRef = useRef<CameraControls>(null!);
  const { mainScreen } = useCamera();

  useEffect(() => {
    mainScreen();
  }, []);

  return <CameraControls ref={cameraRef} />;
}
