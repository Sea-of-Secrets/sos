import { useEffect, useRef } from "react";
import { CameraControls } from "@react-three/drei";

import { useCamera } from "./stores/useCamera";
import { useScreenControl } from "./stores/useScreenControl";

export default function Camera() {
  const cameraRef = useRef<CameraControls>(null!);
  const { setCamera, mainScreen, introScreen } = useCamera();
  const { showIntro, setScreen, setMainScreen, setShowLogo } =
    useScreenControl();

  useEffect(() => {
    setCamera(cameraRef);
    if (showIntro) {
      mainScreen();
      setMainScreen();
    } else {
      introScreen();
      setScreen("START");
      setTimeout(() => {
        setShowLogo();
      }, 4000);
    }
  }, [
    showIntro,
    setMainScreen,
    setShowLogo,
    setScreen,
    setCamera,
    mainScreen,
    introScreen,
  ]);

  return (
    <>
      <CameraControls ref={cameraRef} />
    </>
  );
}
