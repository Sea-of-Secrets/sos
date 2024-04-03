import styled from "@emotion/styled";
import Overlay from "../components/Overlay";
import { useCallback, useEffect, useState } from "react";
import { useGatcha } from "../stores/useGatch";
import { useCamera } from "../stores/useCamera";
import Button from "../components/BackButton";
import * as ShopsApi from "~/app/api/shops";
import * as UsersApi from "~/app/api/users";
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

    try {
      //mockGatcha().then(data => setRandomGatchaData(data)); // 돈 계속 빠져나가서 만든 테스트용 함수

      // TODO: 배포시에는 이걸 사용해주세용
      const gatchaData = await fetchGatcha();
      console.log("당신의 NFT ! : ", gatchaData);
      setRandomGatchaData(gatchaData);
      try {
        UsersApi.getUserInfo().then(res => setUser(res.data as User));
      } catch (e) {
        UsersApi.getUserInfo().then(res => setUser(res.data as User));
      }
    } catch (e) {
    } finally {
      setLoading(false);
    }
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

const MOCK_DATA: GatchaResponse = {
  name: "zuhee",
  grade: "LEGENDARY",
  hasItemAlready: false,
  imgUrl:
    "https://a710choi.s3.ap-northeast-2.amazonaws.com/f150b925-5f5c-4fe3-9676-3b6c9e41b536.png",
};

const mockGatcha = async (): Promise<GatchaResponse> => {
  console.log("두근두근 가챠 타임 (테스트용)");
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(MOCK_DATA);
      console.log(MOCK_DATA);
    }, 4000);
  });
};

const fetchGatcha: () => Promise<GatchaResponse> = async () => {
  console.log("두근두근 가챠 타임 (확률 조작 없는 진짜!)");
  const response = await ShopsApi.postGatcha();
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(response.data as GatchaResponse);
    }, 3000);
  });
};
