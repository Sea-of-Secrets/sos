import { ButtonHTMLAttributes } from "react";
import styled from "@emotion/styled";
import Image from "next/image";

import { useCamera } from "../stores/useCamera";
import { useScreenControl } from "../stores/useScreenControl";

interface LoginButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export default function LoginButton({ children, ...props }: LoginButtonProps) {
  const { cameraRef, mainScreen, LoginScreen } = useCamera();
  const { screen, setScreen, setMainScreen } = useScreenControl();
  const handleClickButton = () => {
    LoginScreen();
    setScreen("LOGIN");
  };

  return (
    <Button onClick={() => handleClickButton()}>
      <Image
        width={100}
        height={100}
        src={"/assets/icon-user.png"}
        alt={"로그인 버튼"}
      />
    </Button>
  );
}

const Button = styled.button`
  position: fixed;
  top: 0;
  left: 0;
  padding: 1rem;
  transition: transform 0.4s ease;
  &:hover {
    transform: scale(1.1);
  }
`;
