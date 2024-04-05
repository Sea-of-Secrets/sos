"use client";

import React from "react";
import Image from "next/image";
import styled from "@emotion/styled";

export default function Client() {
  const handleClickNaverLogin = () => {
    const teamPassword = window.prompt(
      "개발중인 기능입니다. 비밀번호를 입력해주세요",
    );
    if (teamPassword === "유일무이이주희") {
      window.location.href = "http://localhost:8080/oauth2/authorization/naver";
    }
  };

  return (
    <Button onClick={handleClickNaverLogin}>
      <Image
        src="/images/btnG_완성형.png"
        alt="Naver login"
        width={350}
        height={200}
      />
    </Button>
  );
}

const Button = styled.button`
  transition: transform 0.4s ease;
  &:hover {
    transform: scale(1.1);
  }
`;
