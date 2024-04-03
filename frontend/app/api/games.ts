import { request } from "../../_lib/http";

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

const getBaseClientUrl = () => {
  if (process.env.NODE_ENV === "development") {
    return "http://localhost:3000/api";
  }
  return process.env.NEXT_PUBLIC_CLIENT_API_END_POINT;
};
