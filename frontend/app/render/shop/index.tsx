"use client";

import { useCallback } from "react";

import Button from "../components/Button";
import Container from "../components/Container";

import { useCamera } from "../stores/useCamera";
import { useGatcha } from "../stores/useGatch";
import Gatcha from "./Gatcha";

export default function Shop() {
  const { gatchaState, setGatchaState } = useGatcha();
  const { ShopGatchaScreen } = useCamera();

  const handleClickGatchaView = useCallback(() => {
    setGatchaState("GATCHA_READY");
    ShopGatchaScreen();
  }, [setGatchaState, ShopGatchaScreen]);

  if (gatchaState !== "GATCHA_PREV") {
    return <Gatcha />;
  }

  return (
    <Container position="right">
      <Button onClick={handleClickGatchaView}>700G</Button>
    </Container>
  );
}
