import { HTMLAttributes } from "react";
import styled from "@emotion/styled";

interface ModalProps extends HTMLAttributes<HTMLDivElement> {}

export default function Modal({ children, ...props }: ModalProps) {
  return (
    <>
      <ModalBackdrop />
      <ModalStyle {...props}>{children}</ModalStyle>
    </>
  );
}

const ModalStyle = styled.div`
  animation: slideIn 1.5s forwards;
  transition: bottom 1.5s ease;

  @keyframes slideIn {
    from {
      bottom: -100%; /* Start from outside the viewport */
    }
    to {
      bottom: 0%; /* Slide up to the center */
    }
  }

  position: fixed;
  left: 50%;
  transform: translateX(-50%); /* Center horizontally */

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
