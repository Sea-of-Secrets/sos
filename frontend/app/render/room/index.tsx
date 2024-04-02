"use client";

import React, { useEffect, useState } from "react";

import useNickname from "~/store/nickname";
import useGameId from "~/store/gameId";

import CreateRoom from "./createRoom";
import JoinRoom from "./joinRoom";

import Button from "../components/Button";
import Container from "../components/Container";

export default function Room() {
  const [createOpen, setCreateOpen] = useState(false);
  const [joinOpen, setJoinOpen] = useState(false);
  const { nickname, setNickname } = useNickname();
  const { gameId, setGameId } = useGameId();

  const createRoom = () => {
    setNickname("");
    setCreateOpen(true);
  };
  const joinRoom = () => {
    setNickname("");
    setGameId("");
    setJoinOpen(true);
  };

  return (
    <>
      <Container position="left">
        <Button onClick={createRoom}>방만들기</Button>
        <Button onClick={joinRoom}>입장하기</Button>
      </Container>
      {createOpen && <CreateRoom setOpen={setCreateOpen} />}
      {joinOpen && <JoinRoom setOpen={setJoinOpen} />}
    </>
  );
}
