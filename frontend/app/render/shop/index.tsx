"use client";

import { useCallback } from "react";

import Button from "../components/Button";
import Container from "../components/Container";

import { useCamera } from "../stores/useCamera";
import { useGatcha } from "../stores/useGatch";
import Gatcha from "./Gatcha";
import { useScreenControl } from "../stores/useScreenControl";
import { useAuth } from "~/store/auth";

export default function Shop() {
  const { isLoggedIn } = useAuth();
  const { gatchaState, setGatchaState } = useGatcha();
  const { ShopGatchaScreen, LoginScreen } = useCamera();
  const { screen, setScreen, setMainScreen } = useScreenControl();

  const handleClickGatchaView = useCallback(() => {
    setGatchaState("GATCHA_READY");
    ShopGatchaScreen();
  }, [setGatchaState, ShopGatchaScreen]);

  const handleClickLogin = useCallback(() => {
    setGatchaState("GATCHA_PREV");
    setScreen("LOGIN");
  }, [setGatchaState, setScreen]);

  if (gatchaState !== "GATCHA_PREV") {
    return <Gatcha />;
  }

  return (
    <Container position="right">
      {isLoggedIn ? (
        <Button onClick={handleClickGatchaView}>700G</Button>
      ) : (
        <Button onClick={handleClickLogin}>로그인</Button>
      )}
    </Container>
  );
}