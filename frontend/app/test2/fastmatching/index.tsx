import styled from "@emotion/styled";
import { useState } from "react";

import { matching } from "~/app/api/games";

import { useCamera } from "../stores/useCamera";
import { useScreenControl } from "../stores/useScreenControl";
import useNickname from "~/store/nickname";
import useGameId from "~/store/gameId";

import Modal from "../components/Modal";
import ModalContent from "../components/ModalContent";
import Button from "../components/Button";

export default function FastMatching() {
  const { mainScreen } = useCamera();
  const { setMainScreen } = useScreenControl();

  const { nickname, setNickname } = useNickname();
  const { gameId, setGameId } = useGameId();

  const [loading, setLoading] = useState(false);

  const handleClickCheckButton = () => {
    setLoading(true);
    // TODO 게스트 여부 확인 유저 정보 조회 api 요청
    console.log("api 요청");
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
              <Button onClick={() => setLoading(false)} size="sm">
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
                  className="text-center block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
