import styled from "@emotion/styled";
import Overlay from "../components/Overlay";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useCallback, useEffect, useState } from "react";
import { useGatcha } from "../stores/useGatch";
import { useCamera } from "../stores/useCamera";
import Button from "../components/BackButton";

export default function Gatcha() {
  const [isAnimationing, setIsAnimationing] = useState(true);

  const { setGatchaState } = useGatcha();
  const { ShopScreen } = useCamera();

  const handleClickBackButton = useCallback(() => {
    setGatchaState("GATCHA_PREV");
    ShopScreen();
  }, [setGatchaState, ShopScreen]);

  // 3초동안 애니메이션?
  useEffect(() => {
    setTimeout(() => {
      setIsAnimationing(false);
    }, 3000);
  }, []);

  return (
    <Overlay>
      <Container>
        {!isAnimationing && <Button onClick={handleClickBackButton} />}
      </Container>
    </Overlay>
  );
}

const Container = styled.div`
  min-width: 800px;
  height: 100%;
`;
