import { getAccessToken, getRefreshToken } from "~/store/auth";
import { request, getBaseClientUrl, getBaseServerUrl } from "../../_lib/http";

type Product = {};

export const getProductList = async () => {
  const res = await request.get<Product[]>(`${getBaseClientUrl()}/shops`);
  return res;
};

export const postGatcha = async () => {
  const access = getAccessToken();
  const refresh = getRefreshToken();

  const res = await request.post(`${getBaseServerUrl()}/products/random`, {
    headers: {
      //Cookie: `access=${access}; refresh=${refresh};`,
      Authorization: `Bearer ${access}`,
    },
  });
  return res;
};
