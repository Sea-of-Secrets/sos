import { ButtonHTMLAttributes } from "react";
import styled from "@emotion/styled";
import Image from "next/image";

import { useCamera } from "../stores/useCamera";
import { useScreenControl } from "../stores/useScreenControl";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export default function Button({ children, ...props }: ButtonProps) {
  const { cameraRef, mainScreen } = useCamera();
  const { screen, setScreen, setMainScreen } = useScreenControl();
  const handleClickBackButton = () => {
    mainScreen();
    setMainScreen();
  };

  return (
    <BackButton onClick={() => handleClickBackButton()} {...props}>
      <Image
        width={100}
        height={100}
        src={"/assets/back-button.png"}
        alt={"뒤로가기 버튼"}
      />
    </BackButton>
  );
}

const BackButton = styled.button`
  position: absolute;
  top: 0;
  left: 0;
  padding: 1rem;
`;
