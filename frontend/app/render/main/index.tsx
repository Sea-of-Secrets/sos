import { useCamera } from "../stores/useCamera";
import { useScreenControl } from "../stores/useScreenControl";

import Button from "../components/Button";
import Container from "../components/Container";

export default function TestController() {
  const { ShopScreen, RoomScreen, LoginScreen, fastMatchingScreen } =
    useCamera();
  const { screen, setScreen, setMainScreen } = useScreenControl();
  const zoom = (name: string) => {
    if (name === "FASTMATCHING") {
      fastMatchingScreen();
      setScreen("FASTMATCHING");
    } else if (name === "ROOM") {
      RoomScreen();
      setScreen("ROOM");
    } else if (name === "SHOP") {
      ShopScreen();
      setScreen("SHOP");
    } else if (name === "MYPAGE") {
      LoginScreen();
      setScreen("LOGIN");
    }
  };

  return (
    <Container position="left">
      <Button onClick={() => zoom("FASTMATCHING")}>1:1 빠른 매칭</Button>
      <Button onClick={() => zoom("ROOM")}>사용자 게임</Button>
      <Button onClick={() => zoom("SHOP")}>상점</Button>
      {/* <Button onClick={() => zoom("MYPAGE")}>마이페이지</Button> */}
    </Container>
  );
}
