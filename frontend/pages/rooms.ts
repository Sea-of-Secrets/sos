import { client } from "./http";

type RoomData = {
  gameId: String;
  host: String;
  inRoomPlayers: string[];
  gameMode: String;
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
