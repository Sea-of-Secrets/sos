import { HTMLAttributes, useEffect, useState } from "react";
import styled from "@emotion/styled";

interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  isVisible?: boolean;
}

export default function Modal({ children, ...props }: ModalProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);
  return (
    <>
      <MiniModalBackdrop />
      <MiniModal isVisible={isVisible} {...props}>
        <MiniModalContent>{children}</MiniModalContent>
      </MiniModal>
    </>
  );
}

const MiniModal = styled.div<{
  isVisible?: boolean;
}>`
  transition: bottom 1.5s ease;
  position: fixed;
  left: 50%;
  font-size: 20px;
  bottom: ${({ isVisible }) => (isVisible ? "50%" : "-100%")};
  justify-content: center;
  align-items: center;
  transform: translate(-50%, 50%);
  display: flex;
  flex-direction: column;
  width: 25rem;
  height: 33rem;
  padding: 1rem;
  background: url("/assets/modal-background.png") no-repeat center center;
  z-index: 999;
`;

const MiniModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

const MiniModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 23rem;
  height: 30rem;
  padding: 4rem;
  align-items: center;
  z-index: 999;
`;
