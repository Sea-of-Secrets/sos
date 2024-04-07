import { useCallback, useEffect } from "react";
import styled from "@emotion/styled";

import { useRandomGatcha } from "./useFetchGatcha";

import { useGatcha } from "../stores/useGatch";
import { useCamera } from "../stores/useCamera";

import Button from "../components/BackButton";
import Overlay from "../components/Overlay";

export default function Gatcha() {
  const { setGatchaState } = useGatcha();
  const { ShopScreen } = useCamera();
  const { loading, randomGatcha, fetchRandomGatcha } = useRandomGatcha();

  const handleClickBackButton = useCallback(() => {
    setGatchaState("GATCHA_PREV");
    ShopScreen();
  }, [ShopScreen, setGatchaState]);

  useEffect(() => {
    fetchRandomGatcha();
  }, [fetchRandomGatcha]);

  if (loading || !randomGatcha) {
    return (
      <Overlay sens="LOW">
        <Container></Container>
      </Overlay>
    );
  }

  return (
    <Overlay sens="LOW">
      <Container>
        <Button onClick={handleClickBackButton} />
        <Wrapper>
          <CenterBox>
            <NftCard
              className={randomGatcha ? "animated" : ""}
              style={{
                width: "30rem",
                height: "28rem",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                border: "none",
                borderRadius: "10px",
                padding: "10px",
              }}
            >
              <h2
                style={{
                  fontSize: "3rem",
                  color: `${getColorToGrade(randomGatcha.grade)}`,
                }}
              >
                {randomGatcha.grade}
              </h2>
              <img
                src={randomGatcha.imgUrl || ""}
                alt=""
                style={{
                  maxWidth: "300px",
                  maxHeight: "300px",
                }}
              />
              <p
                style={{
                  fontSize: "2rem",
                  color: "#b2adad",
                }}
                className="mt-2"
              >
                {randomGatcha.name || ""}
              </p>
              {randomGatcha.hasItemAlready && (
                <h3
                  style={{
                    color: "#b2adad",
                  }}
                >
                  이미 가지고 있는 상품이에요
                </h3>
              )}
            </NftCard>
          </CenterBox>
        </Wrapper>
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
`;

const CenterBox = styled.div`
  width: 400px;
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NftCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
  transition: transform 1s ease-in-out; // 애니메이션 효과 적용
`;

const getColorToGrade = (grade: string) => {
  grade = grade.toLowerCase();
  if (grade === "legendary") {
    return "#ffc800";
  }

  if (grade === "rare") {
    return "#73e337";
  }

  if (grade === "common") {
    return "#b2adad";
  }

  return "white";
};
