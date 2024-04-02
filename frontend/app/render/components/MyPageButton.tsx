import { ButtonHTMLAttributes } from "react";
import styled from "@emotion/styled";
import Image from "next/image";

import { useCamera } from "../stores/useCamera";
import { useScreenControl } from "../stores/useScreenControl";

import Modal from "./Modal";
import ModalContent from "./ModalContent";

interface MyPageButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export default function MyPageButton({ children, ...props }: MyPageButtonProps) {
  const { cameraRef, mainScreen, LoginScreen } = useCamera();
  const { screen, setScreen, setMainScreen } = useScreenControl();

  const handleClickButton = () => {
        LoginScreen();  
        setScreen("MYPAGE");

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

const Title = styled.span`
  padding-top: 3rem;
  font-size: 20px;
`;