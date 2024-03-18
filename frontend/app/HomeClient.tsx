"use client";

import * as shopApi from "~/apis/shop";

export default function HomeClient() {
  const handler = async () => {
    try {
      const res = await shopApi.getProductList();
      console.log(res);
    } catch (e) {
      console.log("getProductList fetch error");
    }
  };

  return <button onClick={handler}>모든 상품 목록 가져오기</button>;
}
