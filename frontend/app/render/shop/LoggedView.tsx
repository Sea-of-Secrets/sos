"use client";

import { useCallback, useState } from "react";
import styled from "@emotion/styled";
import Button from "../components/Button";
import { useAuth } from "~/store/auth";
import { useGatcha } from "../stores/useGatch";
import { useCamera } from "../stores/useCamera";
import Modal from "../components/Modal";
import ModalContent from "../components/ModalContent";
import * as ShopApi from "~/app/api/shops";
import { useShopModal } from "./useShopModal";

export default function LoggedView() {
  const { toggleModal } = useShopModal();

  const { user } = useAuth();

  // const fetchGatcha = async () => {
  //   const response = await ShopApi.postGatcha();
  //   console.log(response);
  // };

  return (
    <Container>
      <StyledDiv>보유 골드 : {user ? user.gold : 0} G</StyledDiv>
      <Button onClick={toggleModal}>150 G</Button>
      {/* <Button onClick={() => setIsOpenedModal(true)}>150 G</Button> */}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 3rem;
  height: 100vh;
  gap: 8rem;
`;

const StyledDiv = styled.div<{ size?: "xs" | "md" | "sm" }>`
  /* position: absolute;
  top: 0;
  right: 0; */

  padding: 1rem;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: ${({ size }) => {
    switch (size) {
      case "xs":
        return "10px";
      case "sm":
        return "20px";
      default:
        return "40px";
    }
  }};

  /* transition: transform 0.4s ease;
  &:hover {
    transform: scale(1.1);
  } */

  ${({ size }) => {
    switch (size) {
      case "xs":
        return `
          min-width: 5rem;
          min-height: 2rem;
        `;
      case "sm":
        return `
          min-width: 8rem;
          min-height: 3rem;
        `;
      default:
        return `
          min-width: 22rem;
          min-height: 8rem;
        `;
    }
  }}
`;
