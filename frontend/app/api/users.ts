import { request, getBaseServerUrl } from "../../_lib/http";
import { deleteAuthCookie } from "../auth/cookie";

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
  const res = await request.post(`${getBaseServerUrl()}/users/piece`, {
    productName,
  });
  return res;
};

export const logout = async () => {
  deleteAuthCookie();
  const res = await request.post(`${getBaseServerUrl()}/logout`);
  return res;
};

export const addWallet = async (walletAddress: string) => {
  const res = await request.patch(`${getBaseServerUrl()}/nft/wallet`, {
    walletAddress,
  });
  return res;
};
