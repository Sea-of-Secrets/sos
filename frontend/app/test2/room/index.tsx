"use client";

import React, { useEffect, useState } from "react";

import { useScreenControl } from "../stores/useScreenControl";

import CreateRoom from "./createRoom";
import JoinRoom from "./joinRoom";

import Button from "../components/Button";
import LeftContainer from "../components/LeftContainer";

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
    // TODO 게스트 여부 확인 유저 정보 조회 api 요청
    console.log("api 요청");
  });

  return (
    <LeftContainer>
      <Button onClick={createRoom}>방만들기</Button>
      <Button onClick={joinRoom}>입장하기</Button>
      {createOpen && <CreateRoom setOpen={setCreateOpen} isGuest={isGuest} />}
      {joinOpen && <JoinRoom setOpen={setJoinOpen} isGuest={isGuest} />}
    </LeftContainer>
  );
}
