import { useEffect, useRef } from "react";
import { CameraControls } from "@react-three/drei";

import { useCamera } from "../stores/useCamera";

export default function Camera() {
  const cameraRef = useRef<CameraControls>(null!);
  const { initialize } = useCamera();

  useEffect(() => {
    initialize(cameraRef);
  }, [initialize]);

  return <CameraControls ref={cameraRef} />;
}
