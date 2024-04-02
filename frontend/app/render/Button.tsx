
import { useCamera } from "./stores/useCamera";
import { useScreenControl } from "./stores/useScreenControl";

import Room from "./room";
import Main from "./main";
import FastMatcing from "./fastmatching";
import Login from "./login";
import MyPage from "../users/MyPage";

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
    return <Login />;
  }
    else if (screen === "MYPAGE") {
      return (
      
            <MyPage/>
          
 )
  
  } else if (screen === "FASTMATCHING") {
    return <FastMatcing />;
  }
}

