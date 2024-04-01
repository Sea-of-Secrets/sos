"use client";

import React from "react";
import Image from "next/image";
import styled from "@emotion/styled";

import Container from "../components/Container";

export default function Login() {
  return (
    <Container position="right">
      <a href="https://j10a710.p.ssafy.io/spring/api/oauth2/authorization/kakao">
        <Button>
          <Image
            src="/images/kakao_login_large_narrow.png"
            alt="Kakao login"
            width={350}
            height={100}
          />
        </Button>
      </a>
      <a href="https://j10a710.p.ssafy.io/spring/api/oauth2/authorization/google">
        <Button>
          <Image
            src="/images/web_light_sq_ctn@4x.png"
            alt="Google login"
            width={350}
            height={200}
          />
        </Button>
      </a>
      <a href="http://localhost:8080/oauth2/authorization/naver">
        <Button>
          <Image
            src="/images/btnG_완성형.png"
            alt="Naver login"
            width={350}
            height={200}
          />
        </Button>
      </a>
    </Container>
  );
}

const Button = styled.button`
  transition: transform 0.4s ease;
  &:hover {
    transform: scale(1.1);
  }
`;
