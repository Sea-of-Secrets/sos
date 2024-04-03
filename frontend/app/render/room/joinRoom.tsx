import React from "react";
import { useRouter } from "next/navigation";

import * as RoomsApi from "~/app/api/rooms";

import useNickname from "~/store/nickname";
import useGameId from "~/store/gameId";

import Modal from "../components/Modal";
import ModalContent from "../components/ModalContent";
import Button from "../components/Button";

interface JoinRoomProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function JoinRoom({ setOpen }: JoinRoomProps) {
  const router = useRouter();
  const { nickname, setNickname } = useNickname();
  const { gameId, setGameId } = useGameId();

  const handleConfirm = async () => {
    try {
      const { data: enterRoomData } = await RoomsApi.enterRoom({
        nickname,
        gameId,
      });
      if (enterRoomData === "ROOM_NOT_EXIST") {
        window.alert("유효하지 않은 방 코드입니다.");
        return;
      }
      if (enterRoomData === "ALREADY_FULLED") {
        window.alert("정원이 초과된 방입니다.");
        return;
      }
      if (enterRoomData === "DUPLICATED_NICKNAME") {
        window.alert("다른 닉네임을 사용해주세요");
        return;
      }
      router.push(`/room/${gameId}`);
    } catch (e) {
      console.error(e);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleConfirm();
    }
  };

  return (
    <Modal>
      <ModalContent>
        <div className="flex flex-col min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative overflow-hidden rounded-lg px-4 pb-4 pt-5 text-left transition-all w-full sm:max-w-md sm:p-6">
            <div className="mt-3 text-center sm:mt-5">
              <p className="min-w-[20rem] text-2xl font-medium leading-6 text-gray-900 p-8">
                입장하기
              </p>
              <div className="flex items-center pb-3 gap-5 mt-5">
                <span className="text-md font-medium leading-6 text-gray-900 flex-none">
                  닉네임 :
                </span>
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
              <div className="flex items-center pb-3 gap-4 mt-3">
                <span className="text-md font-medium leading-6 text-gray-900 flex-none">
                  방 코드 :
                </span>
                <input
                  type="text"
                  name="roomCode"
                  id="roomCode"
                  value={gameId}
                  onChange={e => setGameId(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="text-center block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="방 코드를 입력해주세요"
                />
              </div>
            </div>
          </div>
          <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
            <Button size="sm" onClick={() => handleConfirm()}>
              확인
            </Button>
            <Button
              size="sm"
              onClick={() => {
                setOpen(false);
                setNickname("");
                setGameId("");
              }}
            >
              취소
            </Button>
          </div>
        </div>
      </ModalContent>
    </Modal>
  );
}
