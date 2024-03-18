import { http } from "./http";

export const getProductList = () => {
  return http.get("/shops");
};
