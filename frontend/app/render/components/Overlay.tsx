import styled from "@emotion/styled";
import { PropsWithChildren } from "react";

interface OverlayProps extends PropsWithChildren {
  sens?: "LOW" | "MIDDLE" | "HIGH";
}

export default function Overlay({ children, sens }: OverlayProps) {
  return <ModalBackdrop sens={sens}>{children}</ModalBackdrop>;
}

const ModalBackdrop = styled.div<{ sens?: "LOW" | "MIDDLE" | "HIGH" }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: ${({ sens }) => `rgba(0, 0, 0, ${getSens(sens)})`};
  z-index: 999;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const getSens = (sens?: "LOW" | "MIDDLE" | "HIGH") => {
  if (sens === "LOW") {
    return 0;
  }

  if (sens === "MIDDLE") {
    return 0.4;
  }

  return 0.7;
};
