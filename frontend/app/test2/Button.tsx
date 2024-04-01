import { useCamera } from "./stores/useCamera";
import { useScreenControl } from "./stores/useScreenControl";

import Room from "./room";
import Main from "./main";
import FastMatcing from "./fastmatching";

export default function Button() {
  const { cameraRef, mainScreen } = useCamera();
  const { screen, setScreen, setMainScreen } = useScreenControl();
  console.log(screen);

  if (screen === "MAIN") {
    return <Main />;
  } else if (screen === "ROOM") {
    return <Room />;
  } else if (screen === "SHOP") {
    return <Room />;
  } else if (screen === "MYPAGE") {
    return <Room />;
  } else if (screen === "FASTMATCHING") {
    return <FastMatcing />;
  }
}
