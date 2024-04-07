import { ButtonHTMLAttributes } from "react";
import styled from "@emotion/styled";
import Image from "next/image";

import { useCamera } from "../stores/useCamera";
import { useScreenControl } from "../stores/useScreenControl";
import { useAuth } from "~/app/auth/useAuth";

interface LoginButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export default function LoginButton({ children, ...props }: LoginButtonProps) {
  const { LoginScreen } = useCamera();
  const { setScreen } = useScreenControl();
  const { isLoggedIn } = useAuth();
  const handleClickButton = () => {
    LoginScreen();
    isLoggedIn ? setScreen("MYPAGE") : setScreen("LOGIN");
  };

  return (
    <Button onClick={() => handleClickButton()}>
      <Image
        width={100}
        height={100}
        src={"/assets/icon-user.png"}
        alt={"로그인 or 마이페이지"}
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
