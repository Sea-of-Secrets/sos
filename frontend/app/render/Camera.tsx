import { useEffect, useRef } from "react";
import { CameraControls } from "@react-three/drei";

import { useCamera } from "./stores/useCamera";
import { useScreenControl } from "./stores/useScreenControl";

export default function Camera() {
  const cameraRef = useRef<CameraControls>(null!);
  const { setCamera, mainScreen, introScreen } = useCamera();
  const {
    startIntro,
    setStartIntroScreen,
    setScreen,
    setMainScreen,
    setShowLogo,
  } = useScreenControl();

  useEffect(() => {
    setCamera(cameraRef);
    // if (startIntro) {
    mainScreen();
    setMainScreen();
    //   mainScreen();
    //   setMainScreen();
    // } else {
    //   introScreen();
    //   setScreen("START");
    //   setStartIntroScreen();
    //   setTimeout(() => {
    //     setShowLogo();
    //   }, 4000);
    // }
  }, [
    startIntro,
    setMainScreen,
    setShowLogo,
    setScreen,
    setCamera,
    mainScreen,
    introScreen,
    setStartIntroScreen,
  ]);

  return (
    <>
      <CameraControls ref={cameraRef} />
    </>
  );
}
