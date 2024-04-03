import styled from "@emotion/styled";
import Overlay from "../components/Overlay";
import { useCallback, useEffect, useState } from "react";
import { useGatcha } from "../stores/useGatch";
import { useCamera } from "../stores/useCamera";
import Button from "../components/BackButton";
import { useFetch } from "~/_lib/hooks/useFetch";
import * as ShopApi from "~/app/api/shops";
import { getUserInfo2 } from "~/app/api/users";
import { User, useAuth } from "~/store/auth";

export default function Gatcha() {
  const [loading, setLoading] = useState(false);
  const [randomGatchaData, setRandomGatchaData] =
    useState<GatchaResponse | null>(null);
  const { setGatchaState } = useGatcha();
  const { ShopScreen } = useCamera();
  const { setUser } = useAuth();

  const fetchGatchData = useCallback(async () => {
    if (loading || randomGatchaData) {
      return;
    }
    setLoading(true);
    mockGatcha().then(data => setRandomGatchaData(data));
    getUserInfo2().then(res => setUser(res.data as User));
    setLoading(false);
  }, []);

  const handleClickBackButton = useCallback(() => {
    setGatchaState("GATCHA_PREV");
    ShopScreen();
  }, []);

  useEffect(() => {
    fetchGatchData();
  }, []);

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
  console.log("fetch!");
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
