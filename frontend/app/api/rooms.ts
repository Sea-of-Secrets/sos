import { client } from "../../_lib/http";

type RoomData = {
  gameId: string;
  host: string;
  inRoomPlayers: string[];
  gameMode: string;
  isRendered: number;
};

export const makeRoom = async ({
  nickname,
  gameMode,
}: {
  nickname: string;
  gameMode: string;
}) => {
  const res = await client.post<RoomData>("/rooms", {
    nickname,
    gameMode,
    type: "make",
  });

  return res;
};

export const enterRoom = async ({
  nickname,
  gameId,
}: {
  nickname: string;
  gameId: string;
}) => {
  const res = await client.post<RoomData | string>("/rooms", {
    nickname,
    gameId,
    type: "enter",
  });
  return res;
};
