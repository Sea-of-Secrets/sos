import { getAccessToken, getRefreshToken } from "~/store/auth";
import { request, getBaseServerUrl } from "../../_lib/http";

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

const getBaseClientUrl = () => {
  if (process.env.NODE_ENV === "development") {
    return "http://localhost:3000/api";
  }
  return process.env.NEXT_PUBLIC_CLIENT_API_END_POINT;
};
