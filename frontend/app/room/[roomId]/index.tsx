"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Dialog, Transition } from "@headlessui/react";
import { gameSocket } from "~/sockets";
import Image from "next/image";

const { connect, disconnect, subscribe, send } = gameSocket;

export default function Room() {
  const params = useParams() as { roomId: string };
  const router = useRouter();
  const { roomId } = params;
  const [isHost, setIsHost] = useState(true);
  const [isGuest, setIsGuest] = useState(true);
  const [nickname, setNickname] = useState("");
  // const [players, setPlayers] = useState([]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(roomId);
      alert("클립보드에 복사되었습니다.");
    } catch (err) {
      console.error("클립보드 복사 실패:", err);
    }
  };

  const handleConfirm = () => {
    setIsGuest(false);
    setIsHost(false);
  };

  const onConnect = () => {
    console.log("소켓 연결 완료");

    // TODO 유저 정보 받는 api
    const userData = { nickname: "비회원01" };

    // 해당 룸코드를 구독
    subscribe(`/sub/${roomId}`, message => {
      console.log(`메세지: ${message}`);

      const data = JSON.parse(message.body);
      if (data) {
        alert(`메세지가 옴 : ${data}`);
      }
    });

    // 입장 시 유저 정보를 전달한다.
    send("/pub/init", {
      gameId: roomId,
      sender: "zoohee",
      message: "INIT_PIRATE_START",
      node: 100,
    });
  };

  useEffect(() => {
    // TODO 먼저 회원인지 여부 판단 api
    // 회원이면 isGuest가 false로 변환 아니면 닉네임 직접 입력 후 변환

    if (!isGuest) {
      connect(onConnect);
      return () => {
        disconnect();
      };
    }
  }, [isGuest]);

  const players = [
    {
      name: "김해적1",
      role: "10전 10승 0패",
      imageUrl:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80",
    },
    {
      name: "김해적2",
      role: "10전 10승 0패",
      imageUrl:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80",
    },
    {
      name: "김해적3",
      role: "10전 10승 0패",
      imageUrl:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80",
    },
    {
      name: "김해적4",
      role: "10전 10승 0패",
      imageUrl:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80",
    },
  ];

  return (
    <>
      <div className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex max-w-2xl mx-0 gap-5">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              방 코드 : {roomId}
            </h2>
            <button
              type="button"
              className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              onClick={copyToClipboard}
            >
              복사
            </button>
          </div>
          <ul
            role="list"
            className={`mx-auto mt-20 grid grid-cols-${players.length / 2} md:grid-cols-${players.length} gap-x-8 gap-y-16`}
          >
            {players.map(player => (
              <li key={player.name} className="flex flex-col items-center">
                <Image
                  src="/pxfuel.jpg"
                  width={100}
                  height={100}
                  alt="기본 이미지"
                  className="mx-auto h-48 w-48 rounded-full"
                />
                <h3 className="mt-6 text-lg text-center font-semibold leading-8 tracking-tight text-gray-900">
                  {player.name}
                </h3>
                <p className="text-base text-center leading-7 text-gray-600">
                  {player.role}
                </p>
                <ul role="list" className="mt-6 flex gap-x-6"></ul>
              </li>
            ))}
          </ul>
          <div className="mt-5 flex justify-center mx-auto gap-5">
            {isHost && (
              <button
                type="button"
                className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                게임시작
              </button>
            )}
            <button
              type="button"
              className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              onClick={() => router.push("/")}
            >
              나가기
            </button>
          </div>
        </div>
      </div>
      <Transition.Root show={isGuest}>
        <Dialog as="div" className="relative z-10" onClose={() => {}}>
          <Transition.Child
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
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4"
                enterTo="opacity-100 translate-y-0"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 "
                leaveTo="opacity-0 translate-y-4"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all">
                  <div className="relative">
                    <label
                      htmlFor="name"
                      className="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900"
                    >
                      비회원 닉네임 설정
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={nickname}
                      onChange={e => setNickname(e.target.value)}
                      className="block w-full text-center rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                      placeholder="닉네임을 입력하세요."
                    />
                  </div>
                  <div className="mt-5">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      onClick={() => handleConfirm()}
                    >
                      확인
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
