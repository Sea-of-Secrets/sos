import { useState, useEffect } from "react";
import Image from "next/image";
import styled from "@emotion/styled";
import { useScreenControl } from "../stores/useScreenControl";

export default function Logo() {
  const { setShowIntro } = useScreenControl();
  const [isMounted, setIsMounted] = useState(false);
  const [showButton, setShowButtond] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    setTimeout(() => {
      setShowButtond(true);
    }, 1000);
  }, []);

  return (
    <Container>
      <LogoContainer show={isMounted}>
        <Image src="/logo.png" alt="logo" width={350} height={100} />
      </LogoContainer>
      {showButton && (
        <Button onClick={() => setShowIntro()} show={showButton}>
          START
        </Button>
      )}
    </Container>
  );
}

const Container = styled.div`
  position: absolute;
  top: 20%;
  right: 10%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const LogoContainer = styled.div<{ show: boolean }>`
  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @-webkit-keyframes fadein {
    /* Safari and Chrome */
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  animation: fadein 5s ease 3s;
  -webkit-animation: fadein 3s;
  margin-bottom: 2rem;
`;

const Button = styled.button<{ show: boolean }>`
  padding: 1rem;
  background: url("/assets/text-background.png") no-repeat center center;
  background-size: cover;
  font-size: 2rem;
  color: #fff;
  transition: transform 0.4s ease;
  &:hover {
    transform: scale(1.1);
  }
  width: 12rem;

  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @-webkit-keyframes fadein {
    /* Safari and Chrome */
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  animation: fadein 5s ease 2s;
  -webkit-animation: fadein 2s;
`;
