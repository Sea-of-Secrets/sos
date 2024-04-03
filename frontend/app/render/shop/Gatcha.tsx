import styled from "@emotion/styled";
import Overlay from "../components/Overlay";
import { useCallback } from "react";
import { useGatcha } from "../stores/useGatch";
import { useCamera } from "../stores/useCamera";
import Button from "../components/BackButton";
import { useFetch } from "~/_lib/hooks/useFetch";
import * as ShopApi from "~/app/api/shops";

export default function Gatcha() {
  // const { loading, data: randomGatchaData } = useFetch(mockGatcha);
  const { loading, data: randomGatchaData } = useFetch(fetchGatcha);

  const { setGatchaState } = useGatcha();
  const { ShopScreen } = useCamera();

  const handleClickBackButton = useCallback(() => {
    setGatchaState("GATCHA_PREV");
    ShopScreen();
  }, [setGatchaState, ShopScreen]);

  if (loading || !randomGatchaData) {
    return (
      <Overlay>
        <Container></Container>
      </Overlay>
    );
  }

  return (
    <Overlay>
      <Container>
        <Button onClick={handleClickBackButton} />
        <Wrapper></Wrapper>
      </Container>
    </Overlay>
  );
}

const Container = styled.div`
  min-width: 800px;
  height: 100%;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid white;
`;

type GatchaResponse = {
  name: string;
  grade: string;
  hasItemAlready: boolean;
  imgUrl: string;
};

const mockGatcha = async (): Promise<GatchaResponse> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        name: "가챠 name",
        grade: "가챠 grade",
        hasItemAlready: false,
        imgUrl: "",
      });
    }, 4000);
  });
};

const fetchGatcha = async () => {
  const response = await ShopApi.postGatcha();
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(response.data as GatchaResponse);
    }, 3000);
  });
};
