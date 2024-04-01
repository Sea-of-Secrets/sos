import { useCamera } from "../stores/useCamera";
import { useScreenControl } from "../stores/useScreenControl";

import Button from "../components/Button";
import LeftContainer from "../components/LeftContainer";

export default function TestController() {
  const { ShopScreen, RoomScreen, myPageScreen, fastMatchingScreen } =
    useCamera();
  const { screen, setScreen, setMainScreen } = useScreenControl();
  const zoom = (name: string) => {
    if (name === "SHOP") {
      ShopScreen();
      setScreen("SHOP");
    } else if (name === "ROOM") {
      RoomScreen();
      setScreen("ROOM");
    } else if (name === "MYPAGE") {
      myPageScreen();
      setScreen("MYPAGE");
    } else if (name === "FASTMATCHING") {
      fastMatchingScreen();
      setScreen("FASTMATCHING");
    }
  };

  return (
    <LeftContainer>
      <Button onClick={() => zoom("FASTMATCHING")}>1:1 빠른 매칭</Button>
      <Button onClick={() => zoom("ROOM")}>사용자 게임</Button>
      <Button onClick={() => zoom("SHOP")}>상점</Button>
      <Button onClick={() => zoom("MYPAGE")}>마이페이지</Button>
    </LeftContainer>
  );
}
