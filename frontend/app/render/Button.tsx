import styled from "@emotion/styled";

import { useCamera } from "./stores/useCamera";
import { useScreenControl } from "./stores/useScreenControl";

import Room from "./room";
import Main from "./main";
import FastMatcing from "./fastmatching";
import Login from "./login";
import MyPage from "../users/MyPage";
import Modal from "./components/Modal";
import Container from "./components/Container";

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
      <Container position="right">
        <ModalStyle>
          <ModalContent>
            <MyPage/>
          </ModalContent>
        </ModalStyle>
      </Container>
 )
  
  } else if (screen === "FASTMATCHING") {
    return <FastMatcing />;
  }
}

const ModalStyle = styled.div`
  display: flex;
  flex-direction: column;
  width: 30rem;
  height: 40rem;
  padding: 1rem;
  background: url("/assets/modal-background.png") no-repeat center center;
  background-size: cover;
  z-index: 999;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5rem;
`;