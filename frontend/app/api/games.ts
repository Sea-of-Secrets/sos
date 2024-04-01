import { request, getBaseClientUrl } from "../../_lib/http";

type RoomData = {
  nickname: string;
  gameId: string;
  gameMode: string;
};

export const matching = async ({
  nickname,
  gameId,
  gameMode,
}: {
  nickname: string;
  gameId: string;
  gameMode: string;
}) => {
  const res = await request.post<RoomData>("/games", {
    nickname,
    gameId,
    gameMode,
    type: "matching",
  });

  return res;
};
