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
    <Container>
      <CenterBox>
        <FadeInUpDiv>
          {/* {randomGatcha.hasItemAlready ? (
            <Message>이미 가지고 있는 NFT 에요</Message>
          ) : (
            <Message>새로운 NFT를 획득했어요!</Message>
          )} */}
          <Message>새로운 NFT를 획득했어요!</Message>
          <Card>
            <HologramCard2
              name={randomGatcha.name}
              grade={randomGatcha.grade}
              src={randomGatcha.imgUrl}
            />
          </Card>
        </FadeInUpDiv>
      </CenterBox>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Message = styled.div`
  position: absolute;
  top: 10%;
  left: 35%;
  background-color: rgba(0, 0, 0, 0.6);
  padding: 1rem 2rem;
  color: white;
  border-radius: 0.5rem;

  box-shadow:
    rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
`;

const CenterBox = styled.div`
  width: 240px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Card = styled.div`
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
