import { client } from "../../_lib/http";

type User = {};

export const getUserInfo = async () => {
    const res = await client.get("/users");
    return res;
  };