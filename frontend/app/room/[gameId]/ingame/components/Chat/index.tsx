import styled from "@emotion/styled";
import React from "react";

import { useState, useEffect } from "react";
import { gameSocket } from "~/sockets";
import useGameId from "~/store/gameId";
import useNickname from "~/store/nickname";
import { useSocketMessage } from "../../stores/useSocketMessage";

const { send } = gameSocket;

const Main = styled.div`
  position: absolute;
  bottom: 0.5rem;
  right: 0.5rem;
  z-index: 999;
  display: flex;
  flex-direction: column;
  max-height: 25rem;
  border: 1px solid #ccc;
  border-radius: 0.375rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Container = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column-reverse;
  overflow-y: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const MainBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;
  flex-grow: 1;
  min-height: 20rem;
`;

const MainBodySingleChat = styled.div`
  display: flex;
  padding: 0.75rem;
  border-radius: 0.375rem;
  max-width: 20rem;
`;

const MainBodyChatContext = styled.div`
  min-width: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Bubble = styled.div`
  display: flex;
  align-items: center;
  margin: 0rem 0.5rem;
  padding: 0rem 0.5rem;
  border-radius: 0.375rem;
`;

const MainFeature = styled.div`
  display: flex;
  align-items: center;
  height: 60px;
  border: 1px solid #ccc;
  border-radius: 0.375rem;
  padding: 0.875rem;
  margin: 0.625rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const MainFeatureInput = styled.input`
  flex-grow: 1;
  border: none;
  border-radius: 0.375rem;
`;

const MainFeatureSendButton = styled.button`
  cursor: pointer;
  background-color: #f39c12;
  padding: 0.5rem;
  margin-left: 0.625rem;
  border-radius: 0.375rem;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #e67e22;
  }
`;

export default function Chat() {
  const { nickname } = useNickname();
  const { chatMessage } = useSocketMessage();
  const { gameId } = useGameId();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<any>([]);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    send(`/pub/chat/${gameId}`, {
      message: message,
      sender: nickname,
      gameId,
    });
    setMessage("");
  };

  useEffect(() => {
    if (chatMessage.message === "CHATTING") {
      setMessages((prevMessages: any) => [...prevMessages, chatMessage]);
    }
  }, [chatMessage]);

  return (
    <Main className="bg-opacity-75 bg-white">
      <Container>
        <MainBody>
          {messages.map((message: any, index: any) => (
            <MainBodySingleChat
              key={index}
              style={{
                alignSelf:
                  message.sender === nickname ? "flex-end" : "flex-start",
              }}
            >
              <MainBodyChatContext>
                {message.sender !== nickname && (
                  <span className="text-sm font-semibold text-gray-900">
                    [{message.role ? `해군${message.role}` : "해적"}]
                  </span>
                )}
                {message.sender !== nickname && (
                  <span className="text-sm font-semibold text-gray-900">
                    {message.sender}
                  </span>
                )}
              </MainBodyChatContext>
              <Bubble className="bg-opacity-70 bg-white">
                <span className="text-sm font-normal py-2.5 text-gray-900">
                  {message.chatMessage}
                </span>
              </Bubble>
            </MainBodySingleChat>
          ))}
        </MainBody>
      </Container>
      <MainFeature>
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexGrow: 1,
          }}
        >
          {/* 텍스트 입력창 */}
          <MainFeatureInput
            className="bg-opacity-0 bg-white"
            type="text"
            placeholder="메세지를 입력하세요"
            value={message}
            onChange={e => setMessage(e.target.value)}
          />
          {/* 전송 버튼 */}
          <MainFeatureSendButton type="submit">
            <svg
              className="w-6 h-6 text-white transform rotate-90"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="m12 18-7 3 7-18 7 18-7-3Zm0 0v-5"
              />
            </svg>
          </MainFeatureSendButton>
        </form>
      </MainFeature>
    </Main>
  );
}
