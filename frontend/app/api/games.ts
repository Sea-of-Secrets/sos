import { request, getBaseClientUrl } from "../../_lib/http";

// type MatchingData = {
//   nickname: string;
//   gameId: string;
//   gameMode: string;
// };

export const matching = async ({
  nickname,
  gameId,
  gameMode,
}: {
  nickname: string;
  gameId: string;
  gameMode: string;
}) => {
  const res = await request.post<string>(`${getBaseClientUrl()}/games`, {
    nickname,
    gameId,
    gameMode,
    type: "matching",
  });

  return res;
};

export const matchingCancel = async ({ nickname }: { nickname: string }) => {
  const res = await request.patch<string>(`${getBaseClientUrl()}/games`, {
    nickname,
    type: "matchingCancel",
  });

  return res;
};
