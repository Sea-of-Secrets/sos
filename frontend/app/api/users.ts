import { client } from "../../_lib/http";

type User = {};

export const getUserInfo = async () => {
  const res = await client.get("/users");
  return res;
};

export const getWalletInfo = async () => {
  const res = await client.post("/users", {
    type: "get",
  });
  return res;
};

export const makeWallet = async () => {
  const res = await client.post("/users", {
    type: "post",
  });
  return res;
};
