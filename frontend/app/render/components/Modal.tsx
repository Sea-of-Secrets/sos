import { HTMLAttributes, useEffect, useState } from "react";
import styled from "@emotion/styled";

interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  isVisible?: boolean;
}

export default function Modal({ children, ...props }: ModalProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, [screen]);
  return (
    <>
      <ModalBackdrop />
      <ModalStyle isVisible={isVisible} {...props}>
        {children}
      </ModalStyle>
    </>
  );
}

const ModalStyle = styled.div<{
  isVisible?: boolean;
}>`
  transition: bottom 1.5s ease;
  position: fixed;
  left: 50%;
  bottom: ${({ isVisible }) => (isVisible ? "5%" : "-100%")};
  transform: translate(-50%);
  display: flex;
  flex-direction: column;
  min-width: 30rem;
  min-height: 40rem;
  padding: 1rem;
  background: url("/assets/modal-background.png") no-repeat center center;
  background-size: cover;
  z-index: 50;
`;

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 49;
`;
