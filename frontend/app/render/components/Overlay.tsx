import styled from "@emotion/styled";
import { PropsWithChildren } from "react";

export default function Overlay({ children }: PropsWithChildren) {
  return <ModalBackdrop>{children}</ModalBackdrop>;
}

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;

  display: flex;
  justify-content: center;
  align-items: center;
`;
