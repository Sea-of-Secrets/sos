import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { useRandomGatcha } from "../stores/useRandomGatcha";
import HologramCard2 from "../components/HologramCard2";

export default function GatchaCard() {
  const { randomGatcha } = useRandomGatcha();

  if (!randomGatcha) {
    return null;
  }

  return (
    <Wrapper>
      <CenterBox>
        <FadeInUpDiv>
          <HologramCard2
            name={randomGatcha.name}
            grade={randomGatcha.grade}
            src={randomGatcha.imgUrl}
          />
        </FadeInUpDiv>
      </CenterBox>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CenterBox = styled.div`
  width: 240px;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    scale: 1.2;
    transition: all 0.1s;
  }
`;

const fadeInAndUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(2rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const FadeInUpDiv = styled.div`
  animation: ${fadeInAndUp} 1s ease-in-out; /* 1초 동안 천천히 나타나며 위로 조금 뜸 */
`;
