"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { gameSocket } from "~/sockets";
import Image from "next/image";
const { connect, disconnect, subscribe, send } = gameSocket;

export default function Room() {
  const params = useParams() as { roomId: string };
  const { roomId } = params;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(roomId);
      alert("클립보드에 복사되었습니다.");
    } catch (err) {
      console.error("클립보드 복사 실패:", err);
    }
  };

  // TODO 연결 될 때 내 정보 서버 전달, 서버에서 전달받아서 people 정보 갱신
  // 방장이면 게임 시작 기능도 넣기
  useEffect(() => {
    const onConnect = () => {
      console.log("소켓 연결 완료");
    };

    connect(onConnect);

    return () => {
      disconnect();
    };
  }, []);

  const people = [
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

  const numColumns = Math.min(people.length, 4);

  return (
    <>
      <div className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex mx-auto max-w-2xl lg:mx-0 gap-5">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
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
            className={`mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-${numColumns} lg:mx-0 lg:max-w-none lg:grid-cols-${numColumns}`}
          >
            {people.map(person => (
              <li key={person.name}>
                <Image
                  src="/pxfuel.jpg"
                  width={100}
                  height={100}
                  alt="기본 이미지"
                  className="mx-auto h-48 w-48 rounded-full md:h-56 md:w-56"
                />
                <h3 className="mt-6 text-lg text-center font-semibold leading-8 tracking-tight text-gray-900">
                  {person.name}
                </h3>
                <p className="text-base text-center leading-7 text-gray-600">
                  {person.role}
                </p>
                <ul role="list" className="mt-6 flex gap-x-6"></ul>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
