"use client";

import styled from "@emotion/styled";
import Button from "../components/Button";
import { useAuth } from "~/app/auth/useAuth";
import { useShopModal } from "./useShopModal";
import { AssetPath } from "~/assetPath";

export default function LoggedView() {
  const { toggleModal } = useShopModal();

  const { user } = useAuth();

  return (
    <Container>
      <StyledDiv>
        보유 골드 :{" "}
        {user && user.gold && !Number.isNaN(user.gold)
          ? Math.max(user.gold, 0)
          : 0}{" "}
        G
      </StyledDiv>
      <Button onClick={toggleModal}>
        <GatchaButtonWrapper>
          <div>
            <img src={AssetPath["GATCHA_BUTTON_LEFT_NFT"]} alt="" />
          </div>
          <div>1개 뽑기</div>
        </GatchaButtonWrapper>
      </Button>
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

const GatchaButtonWrapper = styled.div`
  position: relative;
  padding-top: 0.1rem;
  padding-left: 1.2rem;
  display: flex;
  justify-content: center;
  align-items: center;

  > div:first-of-type {
    position: absolute;
    top: 0.6rem;
    left: 2.2rem;
    display: block;
    width: 45px;
  }
`;
