import React, { Fragment, useEffect, useRef, useState } from "react";

import { useRouter } from "next/navigation";
import { Dialog, Transition } from "@headlessui/react";
import { makeRoom } from "~/app/api/rooms";
import useNickname from "~/store/nickname";
import useGameId from "~/store/gameId";

import Modal from "../components/Modal";
import ModalContent from "../components/ModalContent";
import Button from "../components/Button";

interface CreateRoomProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CreateRoom({ setOpen }: CreateRoomProps) {
  const router = useRouter();
  const cancelButtonRef = useRef(null);
  const { nickname, setNickname } = useNickname();
  const { setGameId } = useGameId();
  const [gameMode, setGameMode] = useState("ONE_VS_ONE");
  const notificationMethods = [
    { id: "ONE_VS_ONE", title: "2인 (1:1)" },
    { id: "ONE_VS_THREE", title: "4인 (1:3)" },
  ];

  const handleOptionChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setGameMode(event.target.value);
  };

  const handleConfirm = async () => {
    try {
      if (nickname === "") {
        alert("닉네임을 입력하세요");
        return;
      }
      const { data } = await makeRoom({ nickname, gameMode });
      setGameId(data.gameId);
      router.push(`/room/${data.gameId}`);
    } catch (e) {
      alert("방 만들기 실패");
    }
  };

  // useEffect(() => {
  //   // 게스트인 경우 닉네임 초기화
  //   if (isGuest) {
  //     setNickname("");
  //   }
  // }, []);

  return (
    <Modal>
      <ModalContent>
        <div className="flex flex-col min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative overflow-hidden rounded-lg px-4 pb-4 pt-5 text-left transition-all w-full sm:max-w-md sm:p-6">
            <div className="mt-3 text-center sm:mt-5">
              <p className="min-w-[20rem] text-2xl font-medium leading-6 text-gray-900 p-8">
                방 만들기
              </p>
              <fieldset className="flex items-center justify-start mt-3 gap-5">
                <span className="text-md font-medium leading-6 text-gray-900">
                  인원 :
                </span>
                <div className="m-5 flex justify-center space-x-10 space-y-0">
                  {notificationMethods.map(notificationMethod => (
                    <div
                      key={notificationMethod.id}
                      className="flex items-center"
                    >
                      <input
                        id={notificationMethod.id}
                        name="notification-method"
                        type="radio"
                        defaultChecked={notificationMethod.id === "ONE_VS_ONE"}
                        value={notificationMethod.id}
                        onChange={handleOptionChange}
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                      <label
                        htmlFor={notificationMethod.id}
                        className="ml-3 block text-md font-medium leading-6 text-gray-900"
                      >
                        {notificationMethod.title}
                      </label>
                    </div>
                  ))}
                </div>
              </fieldset>
              <div className="flex items-center mt-3 pb-3 gap-5">
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
