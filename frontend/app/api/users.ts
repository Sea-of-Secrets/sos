import { request, getBaseClientUrl } from "../../_lib/http";

type User = {};

export const getUserInfo = async () => {
  const res = await request.get(`${getBaseClientUrl()}/users`);
  return res;
};

export const getWalletInfo = async () => {
  const res = await request.post(`${getBaseClientUrl()}/users`, {
    type: "get",
  });
  return res;
};

export const makeWallet = async () => {
  const res = await request.post(`${getBaseClientUrl()}/users`, {
    type: "post",
  });
  return res;
};
