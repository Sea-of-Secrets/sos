import { useCamera } from "./stores/useCamera";
import { useScreenControl } from "./stores/useScreenControl";

import Room from "./room";
import Main from "./main";
import FastMatcing from "./fastmatching";
import Login from "./login";

export default function Button() {
  const { cameraRef, mainScreen } = useCamera();
  const { screen, setScreen, setMainScreen } = useScreenControl();

  if (screen === "MAIN") {
    return <Main />;
  } else if (screen === "ROOM") {
    return <Room />;
  } else if (screen === "SHOP") {
    return <Room />;
  } else if (screen === "LOGIN") {
    // if (로그인이 안되어 있다면) {
    return <Login />;
    // } else {
    //     return <MyPage />
    //   }
  } else if (screen === "FASTMATCHING") {
    return <FastMatcing />;
  }
}
