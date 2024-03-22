import { client } from "../../_lib/http";

type Product = {};

export const getProductList = async () => {
  const res = await client.get<Promise<Product[]>>("/shops");
  return res;
};
