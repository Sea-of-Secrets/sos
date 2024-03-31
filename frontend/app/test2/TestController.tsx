import styled from "@emotion/styled";
import { useCamera } from "./stores/useCamera";

export default function TestController() {
  const { cameraRef, mainScreen, shopScreen } = useCamera();
  const getPosition = () => {
    console.log(cameraRef?.current.camera.position);
  };
  const getRotation = () => {
    console.log(cameraRef?.current.camera.rotation);
  };
  const zoomMain = () => {
    mainScreen();
  };
  const zoomShop = () => {
    shopScreen();
  };
  return (
    <ContainerStyle>
      <Button onClick={() => getPosition()}>현재 위치 반환</Button>
      <Button onClick={() => getRotation()}>현재 방향 반환</Button>
      <Button onClick={() => zoomMain()}>메인 화면</Button>
      <Button onClick={() => zoomShop()}>상점</Button>
    </ContainerStyle>
  );
}

const ContainerStyle = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 999;
  padding: 3px;

  display: flex;
  gap: 3px;
  flex-direction: column;
`;

const Button = styled.button`
  background-color: black;
  color: white;
  font-size: smaller;

  &:hover {
    background-color: skyblue;
  }

  cursor: pointer;
`;
