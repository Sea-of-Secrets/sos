"use client";

import styled from "@emotion/styled";
import Image from "next/image";
import React, { useState } from "react";
import { useProgress } from "@react-three/drei";
import { useGameLoading } from "../stores/useGameLoading";
import { useRenderList } from "../stores/useRenderList";

export default function Loading() {
  const { progress } = useProgress();
  const { myLoading } = useGameLoading();
  const { renderList } = useRenderList();
  const completedUsers = renderList.join(", ");

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: "url(/assets/game_rule_background.png)",
        backgroundSize: "cover",
        zIndex: 999,
      }}
    >
      <div
        style={{
          position: "fixed",
          width: "60rem",
          height: "40rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundImage: "url(/assets/game_rule_contents.png)",
          backgroundSize: "cover",
        }}
      >
        <div
          style={{
            width: "40rem",
            height: "25rem",
            fontSize: "24px",
          }}
          className="flex flex-col mt-24"
        >
          <Docs />
        </div>
      </div>
      <div
        style={{
          position: "fixed",
          right: "2rem",
          top: "2rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <Image
          width={100}
          height={100}
          src={"/assets/loading-icon.png"}
          alt={"로딩 이미지"}
        />
        <span className="text-xl">
          {!myLoading ? `${Math.floor(progress)}%` : "상대방 대기중"}
        </span>
        {/* <span>로딩 완료 유저 : [{completedUsers}]</span> */}
      </div>
    </div>
  );
}

const Title = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const ContentContainer = styled.div`
  display: flex;
  padding-top: 0.2rem;
  flex-direction: column;
  gap: 0.5rem;
`;
const Content = styled.span`
  font-size: 1rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 1rem;
`;

const Button = styled.button`
  cursor: pointer;
  padding: 0.1rem 0.3rem;
  font-size: smaller;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const Docs = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const titles = [
    "게임 목표",
    "출발지 지정",
    "이동",
    "행동",
    "턴과 라운드",
    "팁",
  ];
  const contents = [
    <>
      <div className="flex justify-center">
        <Image
          width={300}
          height={300}
          src={"/assets/docs1.png"}
          alt={"게임 목표"}
        />
      </div>
      <Content className="text-center text-sm mb-2">
        총 4개의 보물이 각 구역에 1개씩 숨겨져 있으며, <br />
        해군은 보물과 해적의 위치가 보이지 않습니다
      </Content>
      <Content>
        해적 : 해군에게 잡히지 않고, 4개의 구역의 모든 보물을 획득하세요
      </Content>
      <Content>
        해군 : 해적이 라운드당 15턴 내에 보물을 획득하지 못하게 방해하거나,
        해적을 체포하세요
      </Content>
    </>,
    <>
      <div className="flex gap-5 justify-center text-lg">
        <div className="flex flex-col text-center gap-3 w-72">
          <Image
            width={300}
            height={300}
            src={"/assets/docs1.png"}
            alt={"게임 목표"}
          />
          <span>
            <span className="text-xl text-red-600">해적</span>은 4개의 각
            구역에서 무작위로 한 곳 씩 생성되는 보물 위치 중 출발 지점을
            선택합니다.
          </span>
        </div>
        <div className="flex flex-col  text-center gap-3 w-72">
          <Image
            width={300}
            height={300}
            src={"/assets/docs2.png"}
            alt={"게임 목표"}
          />
          <span>
            <span className="text-xl text-blue-600">해군</span>은 지정된 위치 중
            세 곳의 출발 지점을 선택합니다.
          </span>
        </div>
      </div>
    </>,
    <>
      <div className="flex gap-5 justify-center text-base">
        <div className="flex flex-col text-center gap-3 w-72">
          <Image
            width={300}
            height={300}
            src={"/assets/docs3-1.png"}
            alt={"게임 목표"}
          />
          <span>
            <span className="text-xl text-red-600">해적</span>은 현재 위치 기준
            1칸의 해적 발판으로 이동이 가능합니다. <br />
            해군이 서있는 길은 지나갈 수 없으며, 다음 보물을 찾기 전까지 해적의
            위치는 공개되지 않습니다.
          </span>
        </div>
        <div className="flex flex-col  text-center gap-3 w-72">
          <Image
            width={300}
            height={300}
            src={"/assets/docs3-2.png"}
            alt={"게임 목표"}
          />
          <span>
            <span className="text-xl text-blue-600">해군</span>은 현재 위치 기준
            0 ~ 2칸의 해군 발판으로 이동이 가능합니다. <br />
            해군끼리는 지나갈 수 있으나 같은곳에 서 있을 수는 없습니다
          </span>
        </div>
      </div>
    </>,
    <>
      <div className="flex gap-5 justify-center">
        <div className="flex flex-col gap-3 w-72">
          <Image
            width={300}
            height={100}
            src={"/assets/docs4-1.png"}
            alt={"게임 목표"}
          />
        </div>
        <div className="flex flex-col gap-3 w-40">
          <Image
            width={150}
            height={200}
            src={"/assets/docs4-2.png"}
            alt={"게임 목표"}
          />
        </div>
      </div>
      <Content className="text-center">
        <span className="text-xl text-blue-600">해군</span>은 이동이 끝난 후,
        조사 or 체포를 선택하여 행동 할 수 있습니다.
      </Content>
      <Content>
        <span className="text-xl text-red-700">조사</span> : 주변 1칸을 선택하여
        이번 라운드에 해적이 지나갔는지 확인할 수 있습니다. 해군이 지나가지
        않았다면 인접한 다른 칸을 추가로 조사할 수 있습니다
      </Content>
      <Content>
        <span className="text-xl text-red-700">체포</span> : 주변 1칸을 선택하여
        체포를 시도하며, 선택한 칸에 해적이 서있다면 해군의 승리로 게임이
        종료됩니다. 해적이 서있지 않았다면 지나갔는지의 대한 여부는 알 수 없고
        차례가 종료됩니다.
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

  const handleButtonClick = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <>
      <ButtonContainer>
        {titles.map((title, index) => (
          <Button key={index} onClick={() => handleButtonClick(index)}>
            {title}
          </Button>
        ))}
      </ButtonContainer>
      <Title>{titles[currentIndex]}</Title>
      <ContentContainer>{contents[currentIndex]}</ContentContainer>
    </>
  );
};
