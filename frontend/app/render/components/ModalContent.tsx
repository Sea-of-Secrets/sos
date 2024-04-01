import { HTMLAttributes } from "react";
import styled from "@emotion/styled";

interface ModalContentProps extends HTMLAttributes<HTMLDivElement> {}

export default function ModalContent({
  children,
  ...props
}: ModalContentProps) {
  return (
    <>
      <Content {...props}>{children}</Content>
    </>
  );
}

const Content = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 30rem;
  min-height: 40rem;
  padding: 5rem;
  align-items: center;
  z-index: 999;
`;
