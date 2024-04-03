"use client";

import { useCallback } from "react";
import styled from "@emotion/styled";

import Button from "../components/Button";
import Container from "../components/Container";

import { useAuth } from "~/store/auth";
import { useGatcha } from "../stores/useGatch";
import { useScreenControl } from "../stores/useScreenControl";

import Gatcha from "./Gatcha";
import LoggedView from "./LoggedView";
import { ShopModalProvier, useShopModal } from "./useShopModal";
import Modal from "../components/Modal";
import ModalContent from "../components/ModalContent";
import { useCamera } from "../stores/useCamera";

export default function Shop() {
  return (
    <ShopModalProvier>
      <ShopWrapper />
    </ShopModalProvier>
  );
}

const ShopWrapper = () => {
  const { isOpenedModal, toggleModal } = useShopModal();
  const { isLoggedIn } = useAuth();
  const { gatchaState, setGatchaState } = useGatcha();
  const { setScreen } = useScreenControl();
  const { ShopGatchaScreen } = useCamera();

  const handleClickGatchaView = useCallback(() => {
    toggleModal();
    setGatchaState("GATCHA_READY");
    ShopGatchaScreen();
  }, [setGatchaState, ShopGatchaScreen, toggleModal]);

  const handleClickLogin = useCallback(() => {
    setGatchaState("GATCHA_PREV");
    setScreen("LOGIN");
  }, [setGatchaState, setScreen]);

  if (gatchaState !== "GATCHA_PREV") {
    return <Gatcha />;
  }

  return (
    <>
      {isOpenedModal && (
        <Modal>
          <ModalContent>
            <FlexDirectionColumn>
              <Title>
                <div>150 골드를 사용하여 랜덤 가챠!</div>
              </Title>
              <ButtonContainer>
                <Button onClick={handleClickGatchaView} size="sm">
                  확인
                </Button>
                <Button onClick={toggleModal} size="sm">
                  취소
                </Button>
              </ButtonContainer>
            </FlexDirectionColumn>
          </ModalContent>
        </Modal>
      )}
      <Container position="right">
        {isLoggedIn ? (
          <LoggedView />
        ) : (
          <Button onClick={handleClickLogin}>로그인</Button>
        )}
      </Container>
    </>
  );
};

const Title = styled.span`
  padding-top: 3rem;
  font-size: 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

const FlexDirectionColumn = styled.div`
  height: 350px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3rem;
`;
