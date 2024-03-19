import { client } from "./http";

type Product = {};

export const getProductList = async () => {
  const res = await client.get<Promise<Product[]>>("/shops");
  return res;
};
