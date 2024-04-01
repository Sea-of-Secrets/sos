import React, { Fragment, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Dialog, Transition } from "@headlessui/react";
import { enterRoom } from "~/app/api/rooms";
import { duplicateNickname } from "~/app/api/rooms";
import useNickname from "~/store/nickname";
import useGameId from "~/store/gameId";

interface CreateRoomProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isGuest: boolean;
}

export default function CreateRoom({ setOpen, isGuest }: CreateRoomProps) {
  const router = useRouter();
  const cancelButtonRef = useRef(null);
  const { nickname, setNickname } = useNickname();
  const { gameId, setGameId } = useGameId();

  const handleConfirm = async () => {
    try {
      const { data: enterData } = await enterRoom({ nickname, gameId });
      const { data: duplicateNicknameDate } = await duplicateNickname({
        nickname,
      });
      console.log(duplicateNicknameDate);

      if (enterData === "ROOM_NOT_EXIST") {
        alert("유효하지 않은 방 코드입니다.");
      } else if (enterData === "ALREADY_FULLED") {
        alert("정원이 초과된 방입니다.");
      } else {
        router.push(`/room/${gameId}`);
      }
    } catch (e) {
      alert("입장 실패");
    }
  };

  useEffect(() => {
    // 게임 아이디 초기화
    setGameId("");
    // 게스트인 경우 닉네임 초기화
    if (isGuest) {
      setNickname("");
    }
  }, []);

  return (
    <Transition.Root show={true} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-md sm:p-6">
                <div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-2xl font-medium leading-6 text-gray-900"
                    >
                      입장하기
                    </Dialog.Title>
                    {isGuest && (
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
                    )}
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
                        className="text-center block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder="방 코드를 입력해주세요"
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
                    onClick={() => handleConfirm()}
                  >
                    확인
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                    onClick={() => setOpen(false)}
                    ref={cancelButtonRef}
                  >
                    취소
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
