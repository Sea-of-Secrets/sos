import { useState, useEffect } from "react";
import useNickname from "~/store/nickname";
import { useSocketMessage } from "../../stores/useSocketMessage";

export default function Input() {
  const { chatMessage } = useSocketMessage();
  const { nickname } = useNickname();
  const [messages, setMessages] = useState<any>([]);

  useEffect(() => {
    if (chatMessage.message === "CHATTING") {
      // TODO : 닉네임이 나와 일치할 때 우측
      setMessages((prevMessages: any) => [
        ...prevMessages,
        chatMessage.chatMessage,
      ]);
    }
  }, [chatMessage]);
  return (
    <div>
      {messages.map(({ message, index }: any) => (
        <p key={index}>{message}</p>
      ))}
    </div>
  );
}
