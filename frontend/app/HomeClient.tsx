"use client";

import * as ShopApi from "~/pages/shops";

export default function HomeClient() {
  const handler = async () => {
    try {
      const res = await ShopApi.getProductList();
      console.log(res);
    } catch (e) {
      console.log("getProductList fetch error");
    }
  };

  return <button onClick={handler}>모든 상품 목록 가져오기</button>;
}
