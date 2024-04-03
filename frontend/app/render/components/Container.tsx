import { HTMLAttributes, useEffect, useState } from "react";
import styled from "@emotion/styled";

import { useScreenControl } from "../stores/useScreenControl";

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  position: string;
}

export default function Container({ children, position }: ContainerProps) {
  const { screen } = useScreenControl();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, [screen]);

  return (
    <ContainerStyle isVisible={isVisible} position={position}>
      {children}
    </ContainerStyle>
  );
}

const ContainerStyle = styled.div<{ isVisible: boolean; position: string }>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${({ position }) => (position === "left" ? "left" : "right")}: ${({
    isVisible,
  }) => (isVisible ? "10%" : "-1000%")};
  transition: ${({ position }) => (position === "left" ? "left" : "right")} 1s
    ease;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  animation: ${({ isVisible }) => (isVisible ? "slideIn 1s forwards" : "none")};

  @keyframes slideIn {
    from {
      transform: translateX(
        ${({ position }) => (position === "left" ? "-1000%" : "1000%")}
      );
    to {
      transform: translateX(10%);
    }
  }
  align-items: center;
  justify-content: center;
`;
