import styled from "@emotion/styled";
import { ActionIcon } from "~/assetPath";
import { gameSocket } from "~/sockets";
import useNickname from "~/store/nickname";
import useGameId from "~/store/gameId";
import { useSystemPrompt } from "../stores/useSystemPrompt";

const { send } = gameSocket;

export default function SelectMarineAction({ turn }: { turn: string }) {
  const { nickname } = useNickname();
  const { gameId } = useGameId();
  const { removeFooterMessage } = useSystemPrompt();

  const handleClickAction = (action: string) => {
    send("/pub/game", {
      message: `SELECT_WORK_MARINE_${turn}`,
      sender: nickname,
      gameId,
      action,
    });
    removeFooterMessage();
  };

  return (
    <Grid>
      <GridItem onClick={() => handleClickAction("INVESTIGATE")}>
        <Img src={ActionIcon.INVESTIGATE.src} />
        <p>조사</p>
      </GridItem>
      <GridItem onClick={() => handleClickAction("ARREST")}>
        <Img src={ActionIcon.ARREST.src} />
        <p>체포</p>
      </GridItem>
    </Grid>
  );
}

const Grid = styled.div`
  max-width: 300px;
  display: flex;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
`;

const GridItem = styled.div`
  width: 100%;
  height: 100%;
  padding: 10px;
  border-radius: 5px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.4s ease;
  &:hover {
    transform: scale(1.1);
  }
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
`;
