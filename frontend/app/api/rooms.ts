import { request, getBaseClientUrl, getBaseServerUrl } from "../../_lib/http";
import { getAccessToken, getRefreshToken, removeToken } from "~/store/auth";

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
  const access = getAccessToken();
  const refresh = getRefreshToken();
  const res = await request.post<RoomData>(
    `${getBaseServerUrl()}/room/make`,
    {
      nickname,
      gameMode,
      type: "make",
    },
    {
      headers: {
        Cookie: `access=${access}; refresh=${refresh};`,
        Authorization: `${access},${refresh}`,
      },
    },
  );

  return res;
};

export const enterRoom = async ({
  nickname,
  gameId,
}: {
  nickname: string;
  gameId: string;
}) => {
  const access = getAccessToken();
  const refresh = getRefreshToken();
  const res = await request.post<RoomData | string>(
    `${getBaseServerUrl()}/room/enter`,
    {
      nickname,
      gameId,
      type: "enter",
    },
    {
      headers: {
        Cookie: `access=${access}; refresh=${refresh};`,
        Authorization: `${access},${refresh}`,
      },
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
