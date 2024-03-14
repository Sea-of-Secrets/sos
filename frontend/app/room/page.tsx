"use client";

export default function Room() {
  const createRoom = () => {
    console.log(1);
  };
  const joinRoom = () => {
    console.log(1);
  };
  return (
    <div className="flex flex-col items-center justify-between p-5 gap-10">
      <button onClick={createRoom}>방만들기</button>
      <button onClick={joinRoom}>입장하기</button>
    </div>
  );
}
