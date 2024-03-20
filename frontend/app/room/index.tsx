"use client";

import React, { useEffect, useState } from "react";
import CreateRoom from "./createRoom";
import JoinRoom from "./joinRoom";

export default function Room() {
  const [createOpen, setCreateOpen] = useState(false);
  const [joinOpen, setJoinOpen] = useState(false);
  const [isGuest, setIsGuest] = useState(true);
  const [nickname, setNickname] = useState("");

  const createRoom = () => {
    setCreateOpen(true);
  };
  const joinRoom = () => {
    setJoinOpen(true);
  };

  useEffect(() => {
    // 게스트 여부 확인 api 요청
  }, []);

  return (
    <div className="flex flex-col items-center justify-between p-5 gap-10">
      <button onClick={createRoom}>방만들기</button>
      <button onClick={joinRoom}>입장하기</button>
      {createOpen && <CreateRoom setOpen={setCreateOpen} isGuest={isGuest} />}
      {joinOpen && <JoinRoom setOpen={setJoinOpen} isGuest={isGuest} />}
    </div>
  );
}
