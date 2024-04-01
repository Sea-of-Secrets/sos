import { request, getBaseClientUrl } from "../../_lib/http";

type Product = {};

export const getProductList = async () => {
  const res = await request.get<Product[]>(`${getBaseClientUrl()}/shops`);
  return res;
};
