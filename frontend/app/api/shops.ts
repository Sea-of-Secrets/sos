import { client } from "../../_lib/http";

type Product = {};

export const getProductList = async () => {
  const res = await client.get<Product[]>("/shops");
  return res;
};
