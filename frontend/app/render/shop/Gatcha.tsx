import { useCallback, useEffect } from "react";
import styled from "@emotion/styled";

import Button from "../components/BackButton";
import Overlay from "../components/Overlay";
import { useRandomGatcha } from "../stores/useRandomGatcha";
import GatchaCard from "./GatchaCard";

export default function Gatcha() {
  const { loading, fetchRandomGatcha } = useRandomGatcha();

  const handleClickBackButton = useCallback(() => {
    window.location.href = "/";
  }, []);

  useEffect(() => {
    fetchRandomGatcha();
  }, [fetchRandomGatcha]);

  return (
    <Overlay sens="LOW">
      <Container>
        {!loading && <Button onClick={handleClickBackButton} />}
        <GatchaCard />
      </Container>
    </Overlay>
  );
}

const Container = styled.div`
  min-width: 800px;
  height: 100%;
`;
