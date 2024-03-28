import { useState } from "react";
import { gameSocket } from "~/sockets";
import useGameId from "~/store/gameId";
import useNickname from "~/store/nickname";

const { send } = gameSocket;

export default function Input() {
  const { nickname } = useNickname();
  const { gameId } = useGameId();

  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    send(`/pub/chat/${gameId}`, {
      message: message,
      sender: nickname,
      gameId,
    });
    setMessage("");
  };

  return (
    <div>
      <input
        type="text"
        name="chat"
        id="chat"
        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        placeholder="메세지를 입력하세요"
        value={message}
        onChange={e => setMessage(e.target.value)}
      />
      <button type="submit" onClick={handleSubmit}>
        전송
      </button>
    </div>
  );
}
