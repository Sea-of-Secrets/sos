import styled from "@emotion/styled";
import { useState, useEffect } from "react";

import { matching, matchingCancel } from "~/app/api/games";
import { gameSocket } from "~/sockets";

import { useCamera } from "../stores/useCamera";
import { useScreenControl } from "../stores/useScreenControl";
import useNickname from "~/store/nickname";
import useGameId from "~/store/gameId";

import Modal from "../components/Modal";
import ModalContent from "../components/ModalContent";
import Button from "../components/Button";

const { connect, subscribe, send, disconnect } = gameSocket;

export default function FastMatching() {
  const { mainScreen } = useCamera();
  const { setMainScreen } = useScreenControl();

  const { nickname, setNickname } = useNickname();
  const { gameId, setGameId } = useGameId();

  const [isHost, setIsHost] = useState(false);
  const [isStart, setIsStart] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isStart) {
      if (isHost) {
        send("/pub/room", {
          message: "START_BUTTON_CLICKED",
          sender: nickname,
          gameId,
        });
      }
      disconnect();
      window.location.href = `/room/${gameId}/ingame`;
    }
  }, [isHost, isStart, gameId, nickname]);

  const onConnect = () => {
    subscribe(`/sub/${nickname}`, message => {
      const data = JSON.parse(message.body);
      console.log(data);

      if (data.message === "MATCHING_SUCCESS") {
        setGameId(data.room.gameId);
        send("/pub/matching", {
          message: "ENTER_MATCHING_ROOM",
          sender: nickname,
          gameId: data.room.gameId,
        });
      } else if (
        data.message === "ENTER_SUCCESS" &&
        data.room.host.nickname === nickname
      ) {
        setIsHost(true);
      } else if (data.message === "PREPARE_GAME_START") {
        setIsStart(true);
      }
    });
  };

  const handleClickCheckButton = async () => {
    try {
      connect(onConnect);
      const { data } = await matching({
        nickname,
        gameId: "",
        gameMode: "ONE_VS_ONE",
      });

      if (data === "DUPLICATED_NICKNAME") {
        alert("사용할 수 없는 닉네임입니다.");
        disconnect();
      } else if (data === "OK") {
        setLoading(true);
      }
    } catch (e) {
      disconnect();
      alert("입장 실패");
    }
  };

  const handleClickCancelButton = async () => {
    try {
      const { data } = await matchingCancel({
        nickname,
      });

      if (data === "CANCEL_ACCEPTED") {
        setLoading(false);
        disconnect();
      }
    } catch (e) {
      alert("취소 실패");
    }
  };

  const handleClickBackButton = () => {
    mainScreen();
    setMainScreen();
  };

  return (
    <Modal>
      <ModalContent>
        {loading && (
          <>
            <Title>적절한 상대와 매치중입니다.</Title>
            <Loading>
              <div
                className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-primary motion-reduce:animate-[spin_1.5s_linear_infinite]"
                role="status"
              >
                <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                  Loading...
                </span>
              </div>
            </Loading>

            <ButtonContainer>
              <Button onClick={() => handleClickCancelButton()} size="sm">
                취소
              </Button>
            </ButtonContainer>
          </>
        )}
        {!loading && (
          <>
            <Title>닉네임을 입력하세요</Title>
            <Loading>
              <div className="flex items-center pb-3 gap-5 mt-5">
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={nickname}
                  onChange={e => setNickname(e.target.value)}
                  className="text-center block w-64 h-10 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="닉네임을 입력하세요."
                />
              </div>
            </Loading>
            <ButtonContainer>
              <Button onClick={() => handleClickCheckButton()} size="sm">
                확인
              </Button>
              <Button onClick={() => handleClickBackButton()} size="sm">
                취소
              </Button>
            </ButtonContainer>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

const Title = styled.span`
  padding-top: 3rem;
  font-size: 20px;
`;

const Loading = styled.div`
  display: flex;
  padding: 1rem;
  height: 20rem;
  justify-content: center;
  align-items: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
`;
