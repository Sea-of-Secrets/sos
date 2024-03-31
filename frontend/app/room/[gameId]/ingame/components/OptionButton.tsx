import styles from "./OptionButton.module.scss";

import * as React from "react";
import { clsx } from "clsx";
import Image from "next/image";
import { matcher } from "~/_lib/utils";
import { useOption } from "../stores/useOption";
import { useCamera } from "../stores/useCamera";
import { getNode } from "~/_lib/data/data";
import { useSocketMessage } from "../stores/useSocketMessage";
import useNickname from "~/store/nickname";

const OptionImageSourceMatcher = matcher({
  CHAT: "/assets/icon-chat.png",
  ZOOM: "/assets/icon-zoom.png",
  DOCS: "/assets/icon-docs.png",
});

export default function OptionButton() {
  const { setIsChat, setIsDocs } = useOption();
  const { nickname } = useNickname();
  const { socketMessage } = useSocketMessage();
  const { zoom } = useCamera();

  const findNicknameNumber = (nickname: string) => {
    for (const key in socketMessage.game.players) {
      if (socketMessage.game.players[key].nickname === nickname) {
        return parseInt(key);
      }
    }
    return;
  };

  const handleClickButton = (button: string) => {
    if (button === "CHAT") {
      setIsChat();
    }
    if (button === "ZOOM") {
      const nicknameNumber = findNicknameNumber(nickname) as number;
      if (socketMessage.game.currentPosition[nicknameNumber] !== 0) {
        zoom(
          getNode(socketMessage.game.currentPosition[nicknameNumber]).position,
        );
      }
    }
    if (button === "DOCS") {
      setIsDocs();
    }
  };

  return (
    <div className={clsx(styles.container)}>
      <div
        onClick={() => {
          handleClickButton("CHAT");
        }}
      >
        <Image
          width={50}
          height={50}
          src={OptionImageSourceMatcher("CHAT")}
          alt={"CHAT"}
        />
        <span>채팅</span>
      </div>
      <div
        onClick={() => {
          handleClickButton("ZOOM");
        }}
      >
        <Image
          width={50}
          height={50}
          src={OptionImageSourceMatcher("ZOOM")}
          alt={"ZOOM"}
        />
        <span>내 위치</span>
      </div>
      <div
        onClick={() => {
          handleClickButton("DOCS");
        }}
      >
        <Image
          width={50}
          height={50}
          src={OptionImageSourceMatcher("DOCS")}
          alt={"DOCS"}
        />
        <span>게임 설명</span>
      </div>
    </div>
  );
}
