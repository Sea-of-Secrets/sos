import { HTMLAttributes, useEffect, useState } from "react";
import styled from "@emotion/styled";

import { useCamera } from "../stores/useCamera";
import { useScreenControl } from "../stores/useScreenControl";

interface LeftContainerProps extends HTMLAttributes<HTMLDivElement> {}

export default function LeftContainer({
  children,
  ...props
}: LeftContainerProps) {
  const { screen } = useScreenControl();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, [screen]);

  return (
    <LeftContainerStyle isVisible={isVisible} {...props}>
      {children}
    </LeftContainerStyle>
  );
}

const LeftContainerStyle = styled.div<{ isVisible: boolean }>`
  position: absolute;
  top: 20%;
  left: ${({ isVisible }) => (isVisible ? "10%" : "-1000%")};
  transition: left 1.5s ease;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  animation: ${({ isVisible }) =>
    isVisible ? "slideIn 1.5s forwards" : "none"};

  @keyframes slideIn {
    from {
      left: -1000%;
    }
    to {
      left: 10%;
    }
  }
`;
