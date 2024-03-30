import styled from "@emotion/styled";
import React, { useState } from "react";
import { useOption } from "../stores/useOption";

const Main = styled.div`
  position: absolute;
  bottom: 25.7rem;
  right: 0.5rem;
  width: 20rem;
  height: 12rem;
  z-index: 998;
  display: flex;
  padding: 1rem;
  flex-direction: column;
  border: 1px solid #ccc;
  border-radius: 0.375rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Title = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: medium;
  font-weight: 600;
`;

const ContentContainer = styled.div`
  display: flex;
  padding-top: 0.2rem;
  flex-direction: column;
  gap: 0.5rem;
  overflow-y: auto;
`;
const Content = styled.span`
  font-size: small;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.3rem;
  margin-bottom: 0.5rem;
`;

const Button = styled.button`
  cursor: pointer;
  padding: 0.1rem 0.3rem;
  border-radius: 0.375rem;
  border: none;
  font-size: smaller;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

export default function Docs() {
  const { isDocs } = useOption();
  const [currentIndex, setCurrentIndex] = useState(0);

  const titles = ["게임 목표", "이동", "행동", "턴과 라운드", "팁"];
  const contents = [
    <>
      <Content>해적 : 해군에게 잡히지 않고 모든 보물을 획득하세요</Content>
      <Content>
        해군 : 해적이 라운드당 15턴 내에 보물을 획득하지 못하게 방해하거나,
        해적을 체포하세요
      </Content>
    </>,
    <>
      <Content>
        해적 : 숫자가 적힌 칸으로 1칸 이동이 가능합니다. 해군이 서있는 길은
        지나갈 수 없습니다
      </Content>
      <Content>
        해군 : 숫자가 적히지 않은 칸으로 0 ~ 2칸 이동이 가능합니다. 해군끼리는
        지나갈 수 있으나 같은곳에 서 있을 수는 없습니다
      </Content>
    </>,
    <>
      <Content>
        해군은 이동이 끝난 후, 조사 or 체포를 선택하여 행동 할 수 있습니다.
      </Content>
      <Content>
        조사 : 주변 1칸을 선택하여 이번 라운드에 해적이 지나갔는지 확인할 수
        있습니다. 해군이 지나가지 않았다면 인접한 다른 칸을 추가로 조사할 수
        있습니다
      </Content>
      <Content>
        체포 : 주변 1칸을 선택하여 체포를 시도하며, 선택한 칸에 해적이 서있다면
        해군의 승리로 게임이 종료됩니다. 해적이 서있지 않았다면 지나갔는지의
        대한 여부는 알 수 없고 차례가 종료됩니다.
      </Content>
    </>,
    <>
      <Content>
        라운드 : 총 3개의 라운드로 구성되며, 해적이 15턴 내에 다음 보물에
        도착하면 라운드가 종료됩니다.
      </Content>
      <Content>
        턴 : 해적의 이동, 해군1,2,3의 각각 이동과 행동이 모두 종료되면 하나의
        턴이 종료됩니다.
      </Content>
    </>,
    <>
      <Content>
        해적 : 해적은 해군들의 눈에 직접적으로 보이지 않습니다. 목적지와 다른
        방향으로 이동하는 단서를 남겨 해군을 혼란스럽게 할 수 있습니다
      </Content>
      <Content>
        해군 : 해적은 무조건 1칸만 이동할 수 있기 때문에 턴마다 갈 수 있는 최대
        경로가 한정되어 있습니다.
      </Content>
    </>,
  ];

  if (!isDocs) {
    return null;
  }

  const handleButtonClick = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <Main className="bg-opacity-90 bg-white">
      <ButtonContainer>
        {titles.map((title, index) => (
          <Button key={index} onClick={() => handleButtonClick(index)}>
            {title}
          </Button>
        ))}
      </ButtonContainer>
      <Title>{titles[currentIndex]}</Title>
      <ContentContainer>{contents[currentIndex]}</ContentContainer>
    </Main>
  );
}
