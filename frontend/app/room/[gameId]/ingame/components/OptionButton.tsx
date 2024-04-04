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
  OFF: "/assets/icon-off.png",
  CAMERA: "/assets/icon-camera.png",
  MENU: "/assets/icon-menu.png",
});

export default function OptionButton() {
  const {
    isChat,
    isCamera,
    isMenu,
    setIsMenu,
    setIsChat,
    setIsDocs,
    setIsOff,
    setIsCamera,
  } = useOption();
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
    if (button === "MENU") {
      setIsMenu();
    }
    if (button === "OFF") {
      setIsOff();
    }
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
    if (button === "CAMERA") {
      setIsCamera();
    }
  };

  return (
    <div className={clsx(styles.container)}>
      <div
        onClick={() => {
          handleClickButton("MENU");
        }}
      >
        <Image
          width={50}
          height={50}
          src={OptionImageSourceMatcher("MENU")}
          alt={"MENU"}
        />
        <span>{isMenu ? "메뉴 닫기" : "메뉴 열기"}</span>
      </div>
      {isMenu && (
        <>
          <div
            onClick={() => {
              handleClickButton("OFF");
            }}
          >
            <Image
              width={50}
              height={50}
              src={OptionImageSourceMatcher("OFF")}
              alt={"OFF"}
            />
            <span>게임 종료</span>
          </div>
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
            <span>{isChat ? "채팅 끄기" : "채팅 켜기"}</span>
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
          <div
            onClick={() => {
              handleClickButton("CAMERA");
            }}
          >
            <Image
              width={50}
              height={50}
              src={OptionImageSourceMatcher("CAMERA")}
              alt={"CAMERA"}
            />
            <span>{isCamera ? "자유 캠" : "고정 캠"}</span>
          </div>
        </>
      )}
    </div>
  );
}
