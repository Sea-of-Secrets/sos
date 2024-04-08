"use client";

import { useCallback } from "react";
import styled from "@emotion/styled";

import { useAuth } from "~/app/auth/useAuth";
import { useCamera } from "../stores/useCamera";
import { useGatcha } from "../stores/useGatch";
import { useScreenControl } from "../stores/useScreenControl";
import { ShopModalProvider, useShopModal } from "./useShopModal";

import Button from "../components/Button";
import Container from "../components/Container";
import Modal from "../components/Modal";
import ModalContent from "../components/ModalContent";
import Gatcha from "./Gatcha";
import LoggedView from "./LoggedView";

import { RANDOM_GATCHA_PRICE } from "~/_lib/constants";

export default function Shop() {
  return (
    <ShopModalProvider>
      <ShopWrapper />
    </ShopModalProvider>
  );
}

const ShopWrapper = () => {
  const { isOpenedModal, toggleModal } = useShopModal();
  const { user, isLoggedIn } = useAuth();
  const { gatchaState, setGatchaState } = useGatcha();
  const { setScreen } = useScreenControl();
  const { ShopGatchaScreen } = useCamera();

  const handleClickGatchaView = useCallback(() => {
    // 발표용 세팅
    const TEMP_KEY = window.localStorage.getItem("TEMP_KEY");
    if (TEMP_KEY !== "유일무이이주희") {
      window.alert("발표 시연을 위해 잠시 막아두었어요");
      return;
    }

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
              {user && user.gold && user.gold >= RANDOM_GATCHA_PRICE ? (
                <>
                  <Title>
                    <div>
                      {RANDOM_GATCHA_PRICE} 골드를 사용하여 NFT 배 획득하기
                    </div>
                  </Title>
                  <ButtonContainer>
                    <Button onClick={handleClickGatchaView} size="sm">
                      확인
                    </Button>
                    <Button onClick={toggleModal} size="sm">
                      취소
                    </Button>
                  </ButtonContainer>
                </>
              ) : (
                <>
                  <Title>
                    <div>골드가 부족해요</div>
                  </Title>
                  <ButtonContainer>
                    <Button onClick={toggleModal} size="sm">
                      확인
                    </Button>
                  </ButtonContainer>
                </>
              )}
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
