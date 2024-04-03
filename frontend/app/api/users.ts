import { getAccessToken, getRefreshToken, removeToken } from "~/store/auth";
import { request, getBaseServerUrl } from "../../_lib/http";

export const getUserInfo = async () => {
  const res = await request.get(`${getBaseServerUrl()}/users`);
  return res;
};

export const getWalletInfo = async () => {
  const res = await request.get(`${getBaseServerUrl()}/nft/wallet/info`);
  return res;
};

export const makeWallet = async () => {
  const res = await request.post(`${getBaseServerUrl()}/nft/wallet`);
  return res;
};

export const getWallet = async () => {
  const res = await request.get(`${getBaseServerUrl()}/nft/wallet`);
  return res;
};

export const saveDefaultPiece = async (productName: string) => {
  const access = getAccessToken();
  const refresh = getRefreshToken();

  const res = await request.post(
    `${getBaseServerUrl()}/users/piece`,
    {
      productName: productName,
    },
    {
      headers: {
        // Cookie: `access=${access}; refresh=${refresh};`,
        Authorization: `Bearer ${access}`,
      },
    },
  );
  return res;
};

export const logout = async () => {
  removeToken();
  const res = await request.post(`${getBaseServerUrl()}/logout`);
  return res;
};

export const addWallet = async (address: string) => {
  const access = getAccessToken();
  const refresh = getRefreshToken();
  removeToken();

  const res = await request.patch(
    `${getBaseServerUrl()}/nft/wallet`,
    {
      walletAddress: address,
    },
    {
      headers: {
        //Cookie: `access=${access}; refresh=${refresh};`,
        Authorization: `Bearer ${access}`,
      },
    },
  );
  return res;
};
