import { request, getBaseClientUrl } from "../../_lib/http";

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
  const res = await request.post<RoomData>(`${getBaseClientUrl()}/rooms`, {
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
  const res = await request.post<RoomData | string>(
    `${getBaseClientUrl()}/rooms`,
    {
      nickname,
      gameId,
      type: "enter",
    },
  );
  return res;
};

export const duplicateNickname = async ({ nickname }: { nickname: string }) => {
  const res = await request.post<RoomData | string>(
    `${getBaseClientUrl()}/rooms`,
    {
      nickname,
      type: "duplicateNickname",
    },
  );
  return res;
};
