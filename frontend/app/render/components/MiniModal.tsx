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
        <Content>{children}</Content>
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
  font-size: 30px;
  bottom: ${({ isVisible }) => (isVisible ? "10%" : "-100%")};
  transform: translate(-50%);
  display: flex;
  flex-direction: column;
  min-width: 30rem;
  min-height: 20rem;
  padding: 1rem;
  background: url("/assets/modal-background.png") no-repeat center center;
  z-index: 999;
`;

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 30rem;
  padding: 5rem;
  align-items: center;
  z-index: 999;
`;
