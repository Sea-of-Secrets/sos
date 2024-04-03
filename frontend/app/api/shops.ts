import { request, getBaseServerUrl } from "../../_lib/http";

type Product = {};

export const getProductList = async () => {
  const res = await request.get<Product[]>(`${getBaseServerUrl()}/products`);
  return res;
};

export const postGatcha = async () => {
  const res = await request.post(`${getBaseServerUrl()}/products/random`);
  return res;
};
