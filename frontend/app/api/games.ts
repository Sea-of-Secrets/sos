import { getBaseServerUrl, request } from "../../_lib/http";

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
  const res = await request.post<string>(
    `${getBaseServerUrl()}/room/matching`,
    {
      nickname,
      gameId,
      gameMode,
    },
  );

  return res;
};

export const matchingCancel = async ({ nickname }: { nickname: string }) => {
  const res = await request.patch<string>(
    `${getBaseServerUrl()}/room/matching`,
    {
      nickname,
    },
  );
  return res;
};
