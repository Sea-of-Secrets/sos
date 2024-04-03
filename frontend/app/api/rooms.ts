import { request, getBaseServerUrl } from "../../_lib/http";

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
  const res = await request.post<RoomData>(`${getBaseServerUrl()}/room/make`, {
    nickname,
    gameMode,
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
    `${getBaseServerUrl()}/room/enter`,
    {
      nickname,
      gameId,
    },
  );
  return res;
};

export const duplicateNickname = async ({ nickname }: { nickname: string }) => {
  const res = await request.get(
    `${getBaseServerUrl()}/users/name?name=${nickname}`,
  );
  return res;
};
