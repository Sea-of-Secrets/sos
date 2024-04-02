import { useEffect, useRef } from "react";
import { CameraControls } from "@react-three/drei";

import { useCamera } from "./stores/useCamera";

export default function Camera() {
  const cameraRef = useRef(null!);
  const { mainScreen, setCamera } = useCamera();

  useEffect(() => {
    setCamera(cameraRef);
    mainScreen();
  }, []);

  return (
    <>
      <CameraControls ref={cameraRef} />
    </>
  );
}
